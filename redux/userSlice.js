import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'usuario',
  initialState: {
    usuario: {
      id: null,      // Agregando el campo "id"
      nombre: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.usuario.id = action.payload.id;      // Actualizando el campo "id"
      state.usuario.nombre = action.payload.nombre; // Actualizando el campo "nombre"
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
