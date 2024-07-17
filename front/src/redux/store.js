import {configureStore} from "@reduxjs/toolkit"
import { mainSlice } from "./reducer";

const store = configureStore({
    reducer: mainSlice.reducer
});

export default store;