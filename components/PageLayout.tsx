import React from 'react';
import AppBar from './AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { OpenAPI } from '../api';

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  React.useLayoutEffect(() => {
    if (document.cookie.includes('access-token')) {
      const token = document.cookie.match(
        `(?:(?:^|.*; *)${'access-token'} *= *([^;]*).*$)|^.*$`
      )?.[1];
      OpenAPI.TOKEN = token;
    }
  }, []);
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <AppBar />
      <Container maxWidth="lg" sx={{ height: 1 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
