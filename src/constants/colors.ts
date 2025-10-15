const colors = {
    white: '#FFFFFF',
    black: '#000000',
    turquoise: '#3e9697',
    lightGray: '#DCCEA8',
    darkGray: '#222226',
    blue: '#0000a3',
    darkBlue: '#0000aa',
    red: '#ff0000',
    headerGray: '#1C1C20',
    background: '#222226',
    background2: '#28282C',
    textColor: '#DCCEA8',
} as const;

export type ColorName = keyof typeof colors;
export type ThemeColor = typeof colors[ColorName];

export default colors;