import React, { FC } from 'react';
import { Button } from '@sberdevices/plasma-ui';

import Box from '../Box';
import Text from '../Text';

export interface ControlProps {
  rows: number;
  cols: number;
  onReset: () => void;
  onChangeRow: (newRow: number) => void;
  onChangeCol: (newCol: number) => void;
  setIsShown: () => void;
}

const Control: FC<ControlProps> = ({
  onReset,
  setIsShown,
}) => (
  <Box inlineSize="100%" justifyContent="end" flexWrap="wrap-reverse">
    <Button view="primary" pin="circle-circle" size="s" onClick={onReset}>
      <Text fontSize={16} textTransform="capitalize">
        Новая игра
      </Text>
    </Button>
    <Button view="secondary" pin="square-square" size="s" onClick={setIsShown} style={{ marginLeft: '15px' }}>
      <Text fontSize={16} textTransform="capitalize">
        Помощь
      </Text>
    </Button>
  </Box>
);

export default React.memo(Control);
