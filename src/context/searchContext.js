import { createContext, useReducer } from "react";

const INTAIL_STATE = {
    city: undefined,
    dates: [],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined
    },
};
export const searchContext = createContext(INTAIL_STATE);

const SearchReducer = (state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INTAIL_STATE;
        default:
            return state;

    }

};

export const SearchContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(SearchReducer,INTAIL_STATE);
    

    return(
        <searchContext.Provider value={{
            city:state.city,
            options:state.options,
            dates:state.dates,
            dispatch}}>
                
            {children}
        </searchContext.Provider>
    )
}