import React, { FC } from 'react';
import { Button } from '@sberdevices/plasma-ui';

import Box from '../Box';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

// import Text from '../Text';

export interface ControlProps {
  rows: number;
  cols: number;
  onReset: () => void;
  onChangeRow: (newRow: number) => void;
  onChangeCol: (newCol: number) => void;
  setIsShown: () => void;
}

const Control: FC<ControlProps> = ({ onReset, setIsShown }) => {
  const device = detectDevice();
  const isMobile = device === 'mobile';
  if (isMobile) {
    return (
      <Box inlineSize="100%" justifyContent="end">
        <Button view="primary" pin="circle-circle" size="s" onClick={onReset}>
          Новая игра
        </Button>
        <Button view="primary" pin="circle-circle" size="s" onClick={setIsShown} style={{ marginLeft: '15px' }}>
          Помощь
        </Button>
      </Box>
    );
  }

  return <></>;
};
export default React.memo(Control);
