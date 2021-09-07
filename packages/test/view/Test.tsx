import type { Uri } from '@carpo/common/types';

import { RowItem, useRedspot } from '@carpo/react-components';
import { Button, Select, Switch } from 'antd';
import React, { useState } from 'react';

const Test: React.FC = () => {
  const { workspacePath } = useRedspot();

  const [noCompile, setNoCompile] = useState(false);
  const [testFiles] = useState<Uri[]>([]);
  const [selectFile, setSelectFile] = useState<string>();
  const [running, setRunning] = useState(false);

  return (
    <>
      <RowItem label='Select file'>
        <Select<string> onChange={setSelectFile} placeholder='Select test file'>
          {testFiles.map((file) => (
            <Select.Option key={file.path} value={file.path}>
              {file.path.replace(workspacePath || '', '').replace(/^\//, '')}
            </Select.Option>
          ))}
        </Select>
      </RowItem>
      <RowItem label='no-compile'>
        <Switch checked={noCompile} onChange={setNoCompile} />
      </RowItem>
      <Button.Group style={{ marginTop: 8, width: '100%' }}>
        <Button loading={running} style={{ width: '100%' }}>
          {running ? 'Testing' : 'Test all'}
        </Button>
        <Button disabled={!selectFile} loading={running} style={{ width: '100%' }} type='primary'>
          {running ? `${selectFile?.replace(workspacePath || '', '').replace(/^\//, '')} ...` : 'Test one'}
        </Button>
      </Button.Group>
    </>
  );
};

export default React.memo(Test);
