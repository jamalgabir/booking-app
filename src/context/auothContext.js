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
            
        case "LOGIN_SUCCESS":
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
        case "LOG_OUT":
            return {
                user:null,
                loading:false,
                error:null,
            };
        default:
            return state;

    }

};



export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INTAIL_STATE);

    useEffect(()=>{
        const stateInfo = JSON.stringify(state?.user?.token);
        const info = JSON.stringify(state?.user?.others?._id);
        if(stateInfo){
            localStorage.setItem("user",info)
            localStorage.setItem("t_ken",stateInfo)
        }
        
    },[state?.user])

    return(
        <AuthContext.Provider value={{
            user:state.user,
            loading:state.loading,
            error:state.error
            ,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
