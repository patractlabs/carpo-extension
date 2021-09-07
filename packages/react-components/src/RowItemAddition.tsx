import PlusOutlined from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { FC, useCallback, useState } from 'react';

import RowItem from './RowItem';

const RowItemAdditon: FC<{ label: string; buttonTxt: string; data: string[]; handleChange: (data: string[]) => void }> =
  (props) => {
    const { buttonTxt, data, handleChange, label } = props;
    const [sourceData, setSourceData] = useState(data);

    const handleChangeSourceData = useCallback(
      (newSourceData: string[]) => {
        setSourceData(newSourceData);
        handleChange(newSourceData);
      },
      [handleChange]
    );

    const changeItem = useCallback(
      (value: string, index: number) => {
        const newSourceData = sourceData.map((source, i) => (i === index ? value : source));

        handleChangeSourceData(newSourceData);
      },
      [handleChangeSourceData, sourceData]
    );

    return (
      <RowItem label={label}>
        {sourceData.map((source, index) => (
          <Input
            key={index}
            onChange={(e) => {
              changeItem(e.target.value, index);
            }}
            value={source}
          />
        ))}
        <Button
          block
          icon={<PlusOutlined />}
          onClick={() => {
            const newSourceData = [...sourceData, ''];

            handleChangeSourceData(newSourceData);
          }}
          type='dashed'
        >
          {buttonTxt}
        </Button>
      </RowItem>
    );
  };

export default RowItemAdditon;
