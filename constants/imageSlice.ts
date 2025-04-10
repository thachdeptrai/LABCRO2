import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  uri: string | null;
}

const initialState: ImageState = {
  uri: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.uri = action.payload;
    },
    resetImage: (state) => {
      state.uri = null; // Reset ảnh về null
    },
  },
});

export const { setImage, resetImage } = imageSlice.actions;
export default imageSlice.reducer;
