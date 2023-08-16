export const selectCurrentClub = (state) => state.club.currentClub;

export const selectCurrentClubId = (state) => {
  const club = selectCurrentClub(state);
  return club ? club.id : null; // Usamos 'id' aquí porque tu estructura tiene 'id' y no 'Idclub'.
};
