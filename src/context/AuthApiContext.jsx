import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ authService, authErrorEventBus, children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, []);

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.error(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  const signup = useCallback(
    async (username, password, name, email, url) => {
      return authService
        .signup(username, password, name, email, url)
        .then(setUser);
    },
    [authService]
  );

  const login = useCallback(
    async (username, password) => {
      return authService.login(username, password).then(setUser);
    },
    [authService]
  );

  const logout = useCallback(() => {
    return authService.logout(() => setUser(undefined));
  }, [authService]);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
