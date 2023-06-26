import LinkIntegration from "@/components/elements/LinkIntegration";
import { createTheme, LinkProps as MuiLinkProps } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  palette: {
    primary: {
      main: '#7D2EF7',
    },
    secondary: {
      light: '#42a5f5',
      main: '#1976d2',
      dark: '#1565c0',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 3
      }
    },
    MuiLink: {
      defaultProps: {
        component: LinkIntegration
      } as MuiLinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkIntegration
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled'
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'filled'
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiFilledInput-root:not(.Mui-disabled)': {
            backgroundColor: 'rgba(255,255,255,0.8)',
          },
          
          "&.MuiFilledInput-root.Mui-disabled": {
            backgroundColor: 'transparent',
          },
        },
      }
    },
  },
})

export default theme;