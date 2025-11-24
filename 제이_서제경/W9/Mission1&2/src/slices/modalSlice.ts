import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { isOpen: false },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openModal: (state) => ({ isOpen: true }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    closeModal: (state) => ({ isOpen: false }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
