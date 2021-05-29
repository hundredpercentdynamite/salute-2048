import React, { FC } from 'react';
import { Button, Headline2 } from '@sberdevices/plasma-ui';
import StyledBackdrop from './StyledBackdrop';
import StyledModal from './StyledModal';
import Box from '../Box';

export interface NotificationProps {
  win: boolean;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ win, onClose }) => (
  <StyledModal>
    <StyledBackdrop />
    <Box paddingBlock="s5" background="transparent" justifyContent="center">
      <Headline2 style={{ textAlign: 'center' }}>
        {win ? 'Вы победили! Играть дальше?' : 'Упс...Вы проиграли!'}
      </Headline2>
    </Box>
    <Button onClick={onClose}>{win ? 'Продолжить' : 'Заново'}</Button>
  </StyledModal>
);

export default Notification;
