export function validateRegisterResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('User registration failed');
  }
}
export function validateLoginResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('Login failed');
  }
}
