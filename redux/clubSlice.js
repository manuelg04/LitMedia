import { createSlice } from "@reduxjs/toolkit";

export const clubSlice = createSlice({
  name: "club",
  initialState: {
    currentClub: null, // Asumimos que no hay club seleccionado al inicio
  },
  reducers: {
    setCurrentClub: (state, action) => {
      state.currentClub = action.payload;
    },
  },
});

// Exportar las acciones
export const { setCurrentClub } = clubSlice.actions;

// Exportar el reducer
export default clubSlice.reducer;
