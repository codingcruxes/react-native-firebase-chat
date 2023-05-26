import { createContext, FC, useMemo, useReducer } from 'react';
import { User } from 'firebase/auth';

export enum ChatReducer {
  setUser = 'set-user',
  setChatId = 'set-chat-id',
}

type SetContextUser = {
  type: ChatReducer.setUser;
  payload: string;
};
type SetChatId = {
  type: ChatReducer.setChatId;
  payload: string;
};

type ConfigActionType = SetContextUser | SetChatId;

export interface ConfigContextProps {
  user: string | null;
  setUser: (user: string) => void;
}

export const ChatContext = createContext<ConfigContextProps>({} as ConfigContextProps);

interface ContextState {
  chatId: string;
  user: string | null;
}

const INITIAL_STATE: ContextState = {
  chatId: '',
  user: null,
};

export const AuthReducer = (state: ContextState, action: ConfigActionType): ContextState => {
  switch (action.type) {
    case ChatReducer.setUser:
      return {
        ...state,
        user: action.payload,
      };
    case ChatReducer.setChatId:
      return {
        ...state,
        chatId: action.payload,
      };

    default:
      return state;
  }
};

export const ContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const setUser = (user: string) => {
    dispatch({
      type: ChatReducer.setUser,
      payload: user,
    });
  };
  const setChatId = (chatId: string) => {
    dispatch({
      type: ChatReducer.setChatId,
      payload: chatId,
    });
  };

  const value = useMemo(() => ({ ...state, setUser, setChatId }), [state, setUser, setChatId]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// import {
//     createContext,
//     useContext,
//     useReducer,
//   } from "react";
//   import { UserContext } from "./AuthContext";
// import { User } from 'firebase/auth';

//   export const ChatContext = createContext({} as User);

//   interface ChatState {
//     chatId: string;
//     user: User;
//   }

//   export const ChatContextProvider = ({ children }: {children:React.ReactNode}) => {
//     const { user } = useContext(UserContext);
//     const INITIAL_STATE = {
//       chatId: "null",
//       user: {},
//     };

//     const chatReducer = (state, action) => {
//       switch (action.type) {
//         case "CHANGE_USER":
//           return {
//             user: action.payload,
//             chatId:
//             user ? (

//                 user.uid > action.payload.uid
//                 ? user.uid + action.payload.uid
//                 : action.payload.uid + user.uid,
//                 ) : "NA"
//           };

//         default:
//           return state;
//       }
//     };

//     const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//     return (
//       <ChatContext.Provider value={{ data:state, dispatch }}>
//         {children}
//       </ChatContext.Provider>
//     );
//   };
