import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
      nombre: '', 
      libroAsociado: '', 
      autor: '',
      generoLiterario: '',
      descripcion: '',
    
  },
  reducers: {
    setBook: (state, action) => {
      // Actualiza todos los campos a la vez
      state.libroAsociado = action.payload.libroAsociado; 
      state.nombre = action.payload.nombre;
      state.autor = action.payload.autor;
      state.generoLiterario = action.payload.generoLiterario;
      state.descripcion = action.payload.descripcion; 
    },
  },
});

export const { setBook } = bookSlice.actions;

export default bookSlice.reducer;
