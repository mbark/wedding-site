import * as Color from 'color';

const base = {
  colors: {
    white: Color('#FFF'),
    black: Color('#000'),
    red: Color('#700F00'),
    lightRed: Color('#B55B4B'),
    peach: Color('#F2D6CC'),
    darkGreen: Color('#2F4F07'),
    lightGreen: Color('#89A673'),
  },
  media: {
    phone: 768,
    tablet: 1024,
  },
  fonts: {
    mont: 'Mont',
    openSans: 'Open Sans',
  }
};

const tints = {
  colors: {
    peachRed: base.colors.red
      .mix(base.colors.peach, 0.8),
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
