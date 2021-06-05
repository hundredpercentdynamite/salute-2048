import React, { FC } from 'react';
import { Button, Headline2 } from '@sberdevices/plasma-ui';
import StyledBackdrop from './StyledBackdrop';
import StyledModal from './StyledModal';
import Box from '../Box';

export interface NotificationProps {
  win: boolean;
  onClose: () => void;
  character: string;
}

const Notification: FC<NotificationProps> = ({ win, onClose, character }) => {
  const isJoy = character === 'joy';
  const winingText = isJoy ? 'Ты победил!' : 'Вы победили';
  const looseText = isJoy ? 'Ты проиграл!' : 'Вы проиграли';
  return (
    <StyledModal>
      <StyledBackdrop />
      <Box paddingBlock="s5" background="transparent" justifyContent="center">
        <Headline2 style={{ textAlign: 'center' }}>
          {win ? `${winingText} Играть дальше?` : `Упс...${looseText}`}
        </Headline2>
      </Box>
      <Button onClick={onClose}>{win ? 'Продолжить' : 'Заново'}</Button>
    </StyledModal>
  );
};

export default Notification;
