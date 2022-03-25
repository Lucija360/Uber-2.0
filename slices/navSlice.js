import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destionation: null,
    travelTimeInformation: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destionation = action.payload;
        }, 
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const {setOrigin, setDestination, 
    setTravelTimeInformation} = navSlice.actions;

    //Selectors
    export const selectOrigin = (state) => state.nav.origin;
    export const selectDestionation = (state) => state.nav.destionation;
    export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;


    export default navSlice.reducer;