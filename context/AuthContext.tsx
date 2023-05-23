import { createContext, FC, useMemo, useReducer } from 'react';
import { AuthReducer, ReducerActions } from './AuthReducer';
import { User } from 'firebase/auth';

export interface ConfigContextProps {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<ConfigContextProps>({} as ConfigContextProps);

export interface ContextState {
  user: User | null;
}

const INITIAL_STATE: ContextState = {
  user: null,
};

export const ContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const setUser = (user: User) => {
    dispatch({
      type: ReducerActions.setUser,
      payload: user,
    });
  };

  const clearUser = () => {
    dispatch({
      type: ReducerActions.clearUser,
    });
  };
  const value = useMemo(() => ({ ...state, setUser, clearUser }), [state, setUser, clearUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
