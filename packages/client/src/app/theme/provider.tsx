import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import {
  ThemeProvider as BaseThemeProvider,
  ThemeProviderProps,
} from 'next-themes';

export const ColorModeProvider = (props: ThemeProviderProps) => (
  <BaseThemeProvider attribute="class" disableTransitionOnChange {...props} />
);

const customSystem = createSystem(defaultConfig, {
  globalCss: {
    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent',
    },
    html: {
      overflow: 'hidden',
    },
    body: {
      height: '100vh',
      overflow: 'hidden',
    },
    '#root': {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  },
});

export const ThemeProvider = (props: ThemeProviderProps) => (
  <ChakraProvider value={customSystem}>
    <ColorModeProvider {...props} />
  </ChakraProvider>
);
