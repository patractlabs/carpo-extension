import type { Uri } from '@carpo/common/types';

import { sendMessage } from '@carpo/common/sendMessage';
import { RowItem, useRedspot } from '@carpo/react-components';
import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const Run: React.FC = () => {
  const [scripts, setScripts] = useState<Uri[]>([]);
  const { workspacePath } = useRedspot();
  const [selectFile, setSelectFile] = useState<string>();

  useEffect(() => {
    sendMessage('redspot.subScripts', null, setScripts).then(setScripts).catch(console.error);
  }, []);

  return (
    <>
      <RowItem label='Select'>
        <Select<string> onChange={setSelectFile} placeholder='Select script to run' style={{ width: '100%' }}>
          {scripts.map((script) => (
            <Select.Option key={script.path} value={script.path}>
              {script.path.replace(workspacePath || '', '').replace(/^\//, '')}
            </Select.Option>
          ))}
        </Select>
      </RowItem>
      <Button disabled={!selectFile} type='primary'>
        Run
      </Button>
    </>
  );
};

export default React.memo(Run);
