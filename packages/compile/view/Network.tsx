import { RowItem, RowItemAddition, useRedspot } from '@carpo/react-components';
import { Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';

const NetworkView: FC = () => {
  const { config } = useRedspot();

  const [networks, setNetworks] = useState(config?.networks);

  useEffect(() => {
    setNetworks(config?.networks);
  }, [config]);

  return networks ? (
    <>
      {Object.keys(networks).map((type, index) => (
        <div key={index}>
          <span>{type}</span>
          <RowItem label='Gas Limit'>
            <Input
              defaultValue={`${config?.networks[type].gasLimit}`}
              key={index}
              onChange={(e) => {
                networks[type].gasLimit = `${e.target.value}`;

                setNetworks(Object.assign({}, config?.networks));
              }}
            />
          </RowItem>
          <RowItemAddition
            buttonTxt='Add Accounts'
            data={networks[type].accounts || []}
            handleChange={(data) => {
              networks[type].accounts = data;
              setNetworks(Object.assign({}, config?.networks));
            }}
            label='Sources'
          />
          <RowItem label='EndPoint'>
            <Input
              defaultValue={`${config?.networks[type].endpoint}`}
              key={index}
              onChange={(e) => {
                if (networks[type]) {
                  networks[type].endpoint = `${e.target.value}`;
                }

                setNetworks(Object.assign({}, config?.networks));
              }}
            />
          </RowItem>
        </div>
      ))}
    </>
  ) : null;
};

export default React.memo(NetworkView);
