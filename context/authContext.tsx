import React from 'react';
import { OpenAPI } from '../api';

interface Auth {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AppContext = React.createContext({} as Auth);
export const useAppContext = () => React.useContext(AppContext);

const AuthContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  React.useLayoutEffect(() => {
    setIsAuthenticated(
      document?.cookie.includes('access-token') ? true : false
    );
  }, []);
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export default AuthContextWrapper;
