import { User } from 'firebase/auth';
import { ContextState } from './AuthContext';

export enum ReducerActions {
  setUser = 'setUser',
  clearUser = 'clearUser',
}

type ConfigActionType = SetContextUser | ClearContextUser;

type SetContextUser = {
  type: ReducerActions.setUser;
  payload: User;
};
type ClearContextUser = {
  type: ReducerActions.clearUser;
};

export const AuthReducer = (state: ContextState, action: ConfigActionType): ContextState => {
  switch (action.type) {
    case ReducerActions.setUser:
      return {
        ...state,
        user: action.payload,
      };

    case ReducerActions.clearUser:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
