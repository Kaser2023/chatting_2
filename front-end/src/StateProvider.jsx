
import React , {createContext, 
    useContext, 
    useReducer} from 'react';

    
// Create a context for the state
export const StateContext = createContext();

// StateProvider component to wrap the application and provide state
export const StateProvider = 
({reducer, initialState, children}) => (
    <StateContext.Provider 
    value={useReducer(
        reducer, initialState)}>
        {children}
    </StateContext.Provider>
);


// Custom hook to use the state context
export const useStateValue = () => 
    useContext(StateContext);



// Default export for StateProvider
export default StateProvider;