import { RowItem, RowItemAddition, useRedspot } from '@carpo/react-components';
import { Input } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';

const NetworkView: React.FC = () => {
  const { config } = useRedspot();

  const [networks, setNetworks] = useState(config?.networks);

  useEffect(() => {
    console.log('network');

    setNetworks(config?.networks);
  }, [config]);

  const renderNetworkView = (): ReactNode => {
    if (networks)
      return Object.keys(networks).map((type, index) => (
        <div key={index}>
          <span>{type}</span>
          <RowItem label='Gas Limit'>
            <Input
              key={index}
              onChange={(e) => {
                if (networks[type]) {
                  networks[type].gasLimit = `${e.target.value}`;
                }

                setNetworks(Object.assign({}, config?.networks));
              }}
              value={`${config?.networks[type].gasLimit}`}
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
              key={index}
              onChange={(e) => {
                if (networks[type]) {
                  networks[type].endpoint = `${e.target.value}`;
                }

                setNetworks(Object.assign({}, config?.networks));
              }}
              value={`${config?.networks[type].endpoint}`}
            />
          </RowItem>
        </div>
      ));

    return null;
  };

  return <div>{renderNetworkView()}</div>;
};

export default React.memo(NetworkView);
