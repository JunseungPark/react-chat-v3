import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer"

//리듀서를통해 엑션 1 엑션 2로 구분하여 처리하여준다
const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    //로그인정보를 패칭해줄지 여부를 판단한다
    isFetching:false, 
    //에러가 돌아왔을때
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};