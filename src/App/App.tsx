import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  AssistantAppState,
  AssistantCharacterType,
  createAssistant,
  createSmartappDebugger,
} from '@sberdevices/assistant-client';
import { Headline1 } from '@sberdevices/plasma-ui';
import Box from '../components/Box';
import Control from '../components/Control/Control';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import useGameBoard from '../hooks/useGameBoard';
import useGameScore from '../hooks/useGameScore';
import useGameState, { GameStatus } from '../hooks/useGameState';
import useScaleControl from '../hooks/useScaleControl';
import { DIRECTION_MAP, GRID_SIZE, MIN_SCALE, SPACING } from '../utils/constants';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeName } from '../themes/types';
import GlobalStyle from '../components/GlobalStyle';
import darkTheme from '../themes/dark';
import { DirectionType } from '../utils/types';
import { HelpModal } from '../components/HelpModal';

export type Configuration = {
  theme: ThemeName;
  bestScore: number;
  rows: number;
  cols: number;
};

const APP_NAME = 'salute-2048';

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }

  return createAssistant({ getState });
};

type NavigationCommandType = 'LEFT' | 'UP' | 'RIGHT' | 'DOWN';
  const mapNavCommandToDirection: Record<NavigationCommandType, DirectionType> = {
    LEFT: 'Left',
    UP: 'Up',
    RIGHT: 'Right',
    DOWN: 'Down',
  }

const App: FC = () => {
  const assistantStateRef = useRef<AssistantAppState>({});
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
  const [selectedCharacter, setCharacter] = useState('sber' as AssistantCharacterType);
  const [isShown, setIsShown] = useState<boolean>(true);

  const [{ status: gameStatus, pause }, setGameStatus] = useGameState({
    status: 'running',
    pause: false,
  });

  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    theme: 'dark',
    bestScore: 0,
    rows: MIN_SCALE,
    cols: MIN_SCALE,
  });

  const [rows, setRows] = useScaleControl(config.rows);
  const [cols, setCols] = useScaleControl(config.cols);

  const { total, best, addScore, setTotal } = useGameScore(config.bestScore);

  const { tiles, onMove, onMovePending } = useGameBoard({
    rows,
    cols,
    pause,
    gameStatus,
    setGameStatus,
    addScore,
  });

  const onResetGame = useCallback(() => {
    setGameStatus('restart');
  }, [setGameStatus]);

  const onCloseNotification = useCallback(
    (currentStatus: GameStatus) => {
      setGameStatus(currentStatus === 'win' ? 'continue' : 'restart');
    },
    [setGameStatus],
  );

  const onOpenHelp = () => {
    assistantRef.current?.sendData({ action: { action_id: 'openInfo' }});
    setIsShown(true);
  }
  const onCloseHelp = () => {
    assistantRef.current?.sendData({ action: { action_id: 'closeInfo' }});
    setIsShown(false);
  }

  useEffect(() => {
    if (gameStatus === 'win') {
      assistantRef.current?.sendData({ action: { action_id: 'gameWin' }});
    }
    if (gameStatus === 'lost') {
      assistantRef.current?.sendData({ action: { action_id: 'gameLost' }})
    }
  }, [gameStatus])

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on('data', ({ type, interaction, system, navigation, character }: any) => {
      if (type === 'character') {
        setCharacter(character.id);
      }
      if (navigation && navigation?.command) {
        const { command }: { command: NavigationCommandType } = navigation;
        const mappedDirection = mapNavCommandToDirection[command];
        if (DIRECTION_MAP[mappedDirection]) {
          onMove(DIRECTION_MAP[mappedDirection]);
        }
      }
      if (system?.command === 'BACK') {
        onCloseHelp();
        return;
      }
      if (system?.command === 'HOME') {
        onOpenHelp();
        return;
      }
      if (interaction) {
        if (interaction.type === 'playAgain') {
          onResetGame();
        }
        if (interaction.type === 'toggleInfo') {
          setIsShown(interaction.payload);
        }
        if (interaction.type === 'continuePlay') {
          setGameStatus('continue');
        }
      }
    });
  }, []);

  useEffect(() => {
    if (gameStatus === 'restart') setTotal(0);
  }, [gameStatus, setTotal]);

  useEffect(() => {
    setConfig({ rows, cols, bestScore: best, theme: 'dark' });
  }, [rows, cols, best, setConfig]);

  const gridSize = window.innerWidth > 600 ? 550 : GRID_SIZE;

  return (
    <>
      <GlobalStyle character={selectedCharacter} />
      <ThemeProvider theme={darkTheme}>
        <HelpModal isShown={isShown} setIsShown={onCloseHelp} />
        <Box
          justifyContent="center"
          inlineSize="100%"
          blockSize="100%"
          alignItems="start"
          borderRadius={0}
          background="transparent"
        >
          <Box
            justifyContent="center"
            flexDirection="column"
            inlineSize={`${gridSize}px`}
          >
            <Box inlineSize="100%" justifyContent="space-between">
              <Box>
                <Headline1>
                  Степень двойки
                </Headline1>
              </Box>
            </Box>
            <Box marginBlockStart="s3" marginBlockEnd="s6" inlineSize="100%">
              <Box justifyContent="center">
                <ScoreBoard total={total} title="Очки" />
              </Box>
              <Control
                rows={rows}
                cols={cols}
                onReset={onResetGame}
                onChangeRow={setRows}
                onChangeCol={setCols}
                setIsShown={onOpenHelp}
              />
            </Box>
            <GameBoard
              tiles={tiles}
              boardSize={gridSize}
              rows={rows}
              cols={cols}
              spacing={SPACING}
              gameStatus={gameStatus}
              onMove={onMove}
              onMovePending={onMovePending}
              onCloseNotification={onCloseNotification}
              character={selectedCharacter}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
