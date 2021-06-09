import React from 'react';
import { Headline2, ParagraphText1, MarkedList, MarkedItem, ParagraphText2, Button } from '@sberdevices/plasma-ui';
import StyledModal from '../Notification/StyledModal';
import Box from '../Box/StyledBox';
import StyledBackdrop from '../Notification/StyledBackdrop';

export type HelpModalProps = Readonly<{
  isShown: boolean;
  setIsShown: () => void;
}>;

const HelpModal = (props: HelpModalProps) => {
  const { isShown, setIsShown } = props;
  if (!isShown) {
    return <></>;
  }
  return (
    <StyledModal justifyContent="flex-start">
      <StyledBackdrop />
      <Box padding="s5" flexDirection="column">
        <Box paddingBlock="s5" background="transparent" justifyContent="space-between" alignItems="start" inlineSize="100%">
          <Headline2 style={{ textAlign: 'center' }}>
            Добро пожаловать!
          </Headline2>
          <Button size="s" view="primary" pin="circle-circle" onClick={setIsShown}>
            Понятно!
          </Button>
        </Box>
        <Box paddingBlock="s5" background="transparent" justifyContent="start" alignItems="start" inlineSize="100%">
          <ParagraphText1>
            Это игра для сжигания времени.
          </ParagraphText1>
        </Box>
        <Box paddingBlock="s5" background="transparent" justifyContent="start" inlineSize="100%">
          <ParagraphText1>
            Как играть:
            <MarkedList>
              <MarkedItem>Для управления использовать стрелки, свайпы или голосовые
                команды &quot;вверх&quot;, &quot;вниз&quot;, &quot;вправо&quot;, &quot;влево&quot;</MarkedItem>
              <MarkedItem>Одинаковые числа складываются при пересечении</MarkedItem>
              <MarkedItem>Для победы необходимо достичь числа 2048</MarkedItem>
              <MarkedItem>Если не останется свободных клеток, то последует поражение</MarkedItem>
            </MarkedList>
          </ParagraphText1>
        </Box>

        <Box paddingBlock="s5" background="transparent" justifyContent="start" inlineSize="100%">
          <ParagraphText2>
            Обратная связь: <a href="mailto:volodyathehurricane@gmail.com">volodyathehurricane@gmail.com</a>
            <br />
            <ParagraphText1>
              Среднее время ответа: 3 дня.
            </ParagraphText1>
          </ParagraphText2>
        </Box>
      </Box>
    </StyledModal>
  );
};

HelpModal.defaultProps = {};

export default HelpModal;