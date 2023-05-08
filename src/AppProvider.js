import React, { useContext, useReducer } from "react";

const AppContext = React.createContext();

const useAppContext = () => {
    return useContext(AppContext);
}

const initialState = {
    usuario: null,
    logged: false
}

const reducer = (state, action) => {
    
    switch (action.type) {
        case "CREAR_USUARIO": {
            return {
                ...state,
                usuario: action.value,
                logged: true
            }
        }
    }
    return state;
}


const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{usuario: state.usuario, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppProvider, useAppContext
}