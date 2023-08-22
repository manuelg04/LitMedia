import { createSlice } from "@reduxjs/toolkit";

export const clubSlice = createSlice({
  name: "club",
  initialState: {
    idclub: null, // No hay club seleccionado al inicio
  },
  reducers: {
    setCurrentClubId: (state, action) => {
      state.idclub = action.payload.idclub;

   },
  },
});

// Exportar las acciones
export const { setCurrentClubId } = clubSlice.actions;

// Exportar el reducer
export default clubSlice.reducer;
