import React, { Dispatch, SetStateAction, createContext, useEffect, useReducer } from "react";

// const INITIAL_STATE = {
//   user: JSON.parse(localStorage.getItem("backuser")) || null,
//   loading: false,
//   error: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, performUserAction] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("backuser", JSON.stringify(state.user));
//   }, [state.user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         loading: state.loading,
//         error: state.error,
//         performUserAction,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


export interface AuthContextType {
  authDetails: AuthType;
  setAuthDetails: Dispatch<SetStateAction<AuthType>>;
}

export type AuthType = {
                        user: {username: String,
                        email: String,
                        img: String,
                        phone: String,
                        isAdmin: Boolean,    
                        favorites: [{ product: String}],
                      },// Page label
  loading: boolean; // Page slug
  error: {}; // Material icons text content
};

const defaultAuthContext: AuthContextType = {
  authDetails: {
              user: localStorage.getItem("backuser") ? JSON.parse(localStorage.getItem("backuser")||"") : {},
              loading: false,
              error: {},
            },
            setAuthDetails: (user) => {  localStorage.setItem("backuser", JSON.stringify(user))},
};

export const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);
