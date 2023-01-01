import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApiError, AuthenticationService, OpenAPI } from '../../api';
import { useRouter } from 'next/router';
import { Alert, Snackbar } from '@mui/material';
import { useAppContext } from '../../context/authContext';

const FieldWrapper = ({
  children,
}: {
  children: (
    hasError: boolean,
    setHasError: (hasError: boolean) => void
  ) => JSX.Element;
}): JSX.Element => {
  const [hasError, setHasErorr] = React.useState<boolean>(false);

  return children(hasError, setHasErorr);
};

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://">
        Farhadi test project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

interface Field {
  value: string;
  touched: boolean;
  hasError: boolean;
}
interface actionType {
  field: 'username' | 'password';
  type: 'change' | 'validate';
  value?: string;
  hasError?: boolean;
}

interface State {
  username: Field;
  password: Field;
}

const reducer = (
  state: { username: Field; password: Field },
  action: actionType
): State => {
  switch (action.type) {
    case 'change': {
      const stateClone = JSON.parse(JSON.stringify(state));
      stateClone[action.field].value = action.value;
      if (!stateClone[action.field].touched)
        stateClone[action.field].touched = true;
      if (stateClone[action.field].hasError && action.value)
        stateClone[action.field].hasError = false;
      return stateClone;
    }
    case 'validate': {
      const stateClone = JSON.parse(JSON.stringify(state));
      if (action.hasError) {
        stateClone[action.field].hasError = true;
        return stateClone;
      }
      return state;
    }
    default:
      throw new Error(`Action type of: ${action.type} is not implemented.`);
  }
};

export default function SignIn(): JSX.Element {
  const [error, setError] = React.useState<string>('');

  const [state, dispatch] = React.useReducer(reducer, {
    username: {
      hasError: false,
      touched: false,
      value: '',
    } as Field,
    password: {
      hasError: false,
      touched: false,
      value: '',
    } as Field,
  });

  const router = useRouter();
  const { setIsAuthenticated } = useAppContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = state.username.value;
    const password = state.password.value;
    if (!username)
      dispatch({ field: 'username', type: 'validate', hasError: true });
    if (!password)
      dispatch({ field: 'password', type: 'validate', hasError: true });
    if (!username || !password) return;
    try {
      const response = await AuthenticationService.authenticationLogin({
        username,
        password,
      });
      const token = response.access_token;
      if (token) {
        OpenAPI.TOKEN = token;
        document.cookie = `access-token=${token}`;
        setIsAuthenticated(true);
      }
      router.push({
        pathname: '/hubs',
        auth: token,
      });
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        setError(e.body.detail);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event) =>
                dispatch({
                  field: 'username',
                  value: event.target.value,
                  type: 'change',
                })
              }
              error={
                (state.username.touched && !state.username.value) ||
                state.username.hasError
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) =>
                dispatch({
                  field: 'password',
                  value: event.target.value,
                  type: 'change',
                })
              }
              error={
                (state.password.touched && !state.password.value) ||
                state.password.hasError
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert
            onClose={() => setError('')}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
