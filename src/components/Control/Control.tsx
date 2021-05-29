import React, { FC } from 'react';

import Box from '../Box';
// import Button from '../Button';
import Text from '../Text';
import { Button } from '@sberdevices/plasma-ui';

export interface ControlProps {
  rows: number;
  cols: number;
  onReset: () => void;
  onChangeRow: (newRow: number) => void;
  onChangeCol: (newCol: number) => void;
}

const Control: FC<ControlProps> = ({
  onReset,
}) => (
  <Box inlineSize="100%" justifyContent="end">
    <Button size="s" onClick={onReset}>
      <Text fontSize={16} textTransform="capitalize">
        Новая игра
      </Text>
    </Button>
    {/*<Box>*/}
    {/*  <Box marginInlineEnd="s5" flexDirection="column">*/}
    {/*    <Text textTransform="uppercase" fontSize={13} color="primary">*/}
    {/*      rows*/}
    {/*    </Text>*/}
    {/*    <Box padding="s2">*/}
    {/*      <Button*/}
    {/*        mini*/}
    {/*        onClick={() => onChangeRow(-1)}*/}
    {/*        disable={rows === MIN_SCALE}*/}
    {/*      >*/}
    {/*        -*/}
    {/*      </Button>*/}
    {/*      <Box marginInline="s2">*/}
    {/*        <Text fontSize={16} color="primary">*/}
    {/*          {rows}*/}
    {/*        </Text>*/}
    {/*      </Box>*/}
    {/*      <Button*/}
    {/*        mini*/}
    {/*        onClick={() => onChangeRow(1)}*/}
    {/*        disable={rows === MAX_SCALE}*/}
    {/*      >*/}
    {/*        +*/}
    {/*      </Button>*/}
    {/*    </Box>*/}
    {/*  </Box>*/}
    {/*  <Box flexDirection="column">*/}
    {/*    <Text textTransform="uppercase" fontSize={13} color="primary">*/}
    {/*      cols*/}
    {/*    </Text>*/}
    {/*    <Box padding="s2">*/}
    {/*      <Button*/}
    {/*        mini*/}
    {/*        onClick={() => onChangeCol(-1)}*/}
    {/*        disable={cols === MIN_SCALE}*/}
    {/*      >*/}
    {/*        -*/}
    {/*      </Button>*/}
    {/*      <Box marginInline="s2">*/}
    {/*        <Text fontSize={16} color="primary">*/}
    {/*          {cols}*/}
    {/*        </Text>*/}
    {/*      </Box>*/}
    {/*      <Button*/}
    {/*        mini*/}
    {/*        onClick={() => onChangeCol(1)}*/}
    {/*        disable={cols === MAX_SCALE}*/}
    {/*      >*/}
    {/*        +*/}
    {/*      </Button>*/}
    {/*    </Box>*/}
    {/*  </Box>*/}
    {/*</Box>*/}
  </Box>
);

export default React.memo(Control);
