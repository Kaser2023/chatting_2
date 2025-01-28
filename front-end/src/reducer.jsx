// Initial state of the application
export const initialState = {
    user: null,
}

// Action types for the reducer
export const actionTypes = {
    SET_USER: "SET_USER",
}


// Reducer function to handle state changes based on actions
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
};

// Export the reducer as the default export
export default reducer;