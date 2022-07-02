export const BASE_URL = 'http://api.p1d3c.mesto.nomoredomains.xyz'

export function getToken() {
  return localStorage.getItem('jwt')
}
