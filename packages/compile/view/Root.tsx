import { RedspotProvider } from '@carpo/react-components';
import React from 'react';

import Compile from './Compile';
import Network from './Network';

const Root: React.FC = () => {
  return (
    <RedspotProvider>
      <Network />
      <Compile />
    </RedspotProvider>
  );
};

export default Root;
