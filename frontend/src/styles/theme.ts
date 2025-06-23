"use client";

import { createTheme, MantineColorsTuple, MantineTheme } from '@mantine/core';

// Custom color for your brand
const brandColor: MantineColorsTuple = [
  '#eef6ff',
  '#d9e9fe',
  '#b2d2fd',
  '#89bbfa',
  '#68a7f8',
  '#539bf7',
  '#4794f7',
  '#3981db',
  '#2d72c4',
  '#1b62ad'
];

export const theme = createTheme({
  // --- FONTS ---
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
  },

  // --- COLORS ---
  colors: {
    brand: brandColor,
    dark: [
      '#C1C2C5', // 0: light text
      '#A6A7AB', // 1
      '#909296', // 2
      '#5c5f66', // 3
      '#373A40', // 4: borders
      '#2C2E33', // 5: hover background
      '#25262b', // 6: card/paper background
      '#1A1B1E', // 7: body background
      '#141517', // 8
      '#101113'  // 9
    ],
  },
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 8 },

  // --- SIZING ---
  radius: {
    xs: '0.125rem', // 2px
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '1rem',     // 16px
    xl: '2rem',     // 32px
  },

  // --- SHADOWS ---
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // --- COMPONENT OVERRIDES ---
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
    },
    ActionIcon: {
        defaultProps: {
            radius: 'md',
        }
    },
    Pagination: {
        styles: (theme: MantineTheme) => ({
            control: {
                '&[data-active]': {
                    backgroundImage: 'linear-gradient(90deg, var(--mantine-color-brand-6), var(--mantine-color-brand-8))',
                    border: 0,
                },
            },
        }),
    },
  },
});