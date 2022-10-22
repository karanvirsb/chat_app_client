import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// Define a type for the slice state
interface ModalState {
    open: boolean;
    options: any;
    modalName: "changeGroupName" | "";
}

// Define the initial state using that type
const initialState: ModalState = {
    modalName: "",
    options: {},
    open: false,
};

export const modalSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<ModalState>) => {
            state = action.payload;
        },
        resetModal: (state) => {
            state = initialState;
        },
    },
});

export const { setModal, resetModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectModalState = (state: RootState) => state.counter.value;

export default modalSlice.reducer;
