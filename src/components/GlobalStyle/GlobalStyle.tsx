import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { darkJoy, darkEva, darkSber } from '@sberdevices/plasma-tokens/themes';

import {
  text, // Цвет текста
  background, // Цвет подложки
  gradient, // Градиент
} from '@sberdevices/plasma-tokens';


const DocumentStyle = createGlobalStyle`
  ${normalize};
  html:root {
    min-height: 100vh;
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};
  }
  body {
    /** Disable eslastic scrolling on mobile */
    overflow: hidden;
    overscroll-behavior: none;
    .sphere {
      flex-shrink: 0;
      background-repeat: no-repeat;
    }
  }
  #game {
    width: 100vw;
    height: 100vh;
  }
`;

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

export const GlobalStyle = ({ character }: { character: string; }) => (
  <>
    <DocumentStyle />
    {(() => {
        switch (character) {
            case 'sber':
                return <ThemeBackgroundSber />;
            case 'eva':
                return <ThemeBackgroundEva />;
            case 'joy':
                return <ThemeBackgroundJoy />;
            default:
                return <ThemeBackgroundSber />;
        }
    })()}
  </>
);

export default GlobalStyle;