export function addTokentoHeader() {
  return {
    headers: {
      Authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
    },
  };
}
