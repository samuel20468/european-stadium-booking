import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    cancelledBookings: [],
    activeBookings: []
};

export const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state, ) => {
            state.user = {};
        },
        sortBookings: (state, action) => {
            const activeBookings = action.payload.active;
            const cancelledBookings = action.payload.cancelled;

            state.activeBookings = activeBookings;
            state.cancelledBookings = cancelledBookings;
        },
        addBooking: (state, action) => {
            state.activeBookings.push(action.payload);
        },
        cancelOneBooking: (state, action) => {
            console.log(action.payload);
            const updatedActiveBookings = action.payload.updatedActiveBookings;
            state.activeBookings = updatedActiveBookings;
            const bookingToCancel = action.payload.cancelledBooking

            state.cancelledBookings.push({...bookingToCancel, status: "Cancelled"});
        },
        removeBooking: (state, action) => {
            state.cancelledBookings = action.payload;
        }
    }
});

export const { addUser, removeUser, sortBookings, addBooking, cancelOneBooking, removeBooking } = mainSlice.actions;