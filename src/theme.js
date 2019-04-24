import * as Color from 'color';

const base = {
  colors: {
    white: '#FFF',
    black: '#000',
    red: '#700F00',
    lightRed: '#B55B4B',
    peach: '#F2D6CC',
    darkGreen: '#2F4F07',
    lightGreen: '#89A673',
  },
  media: {
    phone: 768,
    tablet: 1024,
  },
};

const tints = {
  colors: {
    peachRed: Color(base.colors.red)
      .mix(Color(base.colors.peach), 0.8)
      .hex(),
  },
};

const theme = {
  ...base,
  colors: {
    ...base.colors,
    ...tints.colors,
  },
};

export default theme;
