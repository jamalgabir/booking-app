import { createContext, useEffect, useReducer } from "react";

const INTAIL_STATE = {
    user: JSON.parse(localStorage.getItem("user"))||null,
    loading: false,
    error: null
};
export const AuthContext = createContext(INTAIL_STATE);

const AuthReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return {
                user:null,
                loading:true,
                error:null
            };
        case "LOGIN_SUCCESSFULLY":
            return {
                user:action.payload,
                loading:false,
                error:null
            };
        case "LOGIN_FAILURE":
            return {
                user:null,
                loading:false,
                error:action.payload
            };
        case "LOG_OUT_START":
            return {
                user:null,
                loading:false,
                errror:null
            };
        default:
            return state;

    }

};

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INTAIL_STATE);
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return(
        <AuthContext.Provider value={{
            city:state.city,
            options:state.options,
            dates:state.dates
            ,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}