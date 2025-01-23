import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import {
  ThemeProvider as BaseThemeProvider,
  ThemeProviderProps,
} from 'next-themes';

export const ColorModeProvider = (props: ThemeProviderProps) => (
  <BaseThemeProvider attribute="class" disableTransitionOnChange {...props} />
);

export const ThemeProvider = (props: ThemeProviderProps) => (
  <ChakraProvider value={defaultSystem}>
    <ColorModeProvider {...props} />
  </ChakraProvider>
);
