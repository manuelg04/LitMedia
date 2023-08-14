
// Selector para obtener el ID del club actualmente selecciono
export const selectCurrentClub = (state) => state.club.currentClub || state.club.currentClub.idclub ||null;


