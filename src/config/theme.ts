import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#555'
    },
    secondary: {
      main: '#1dd1a1',
      contrastText: '#fefefe'
    },
    info: {
      main: '#1289A7'
    },
    background: {
      default: '#fffafa'
    }
  },
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Lato',
      '游ゴシック Medium',
      '游ゴシック体',
      'Yu Gothic Medium',
      'YuGothic',
      'ヒラギノ角ゴ ProN',
      'Hiragino Kaku Gothic ProN',
      'メイリオ',
      'Meiryo',
      'ＭＳ Ｐゴシック',
      'MS PGothic',
      'sans-serif'
    ].join(',')
    /* fontSize: 16,
        h1: {
          fontSize: '1.75rem',
        },
        h2: {
          fontSize: '1.5rem',
        },
        h3: {
          fontSize: '1.25rem',
        },
        h4: {
          fontSize: '1.125rem',
        },
        h5: {
          fontSize: '1rem',
        },
        h6: {
          fontSize: '1rem',
        }, */
  }
});
