const TOKEN = "token";

export default class TokenService {
  set(token) {
    token && localStorage.setItem(TOKEN, token);
  }

  get() {
    return localStorage.getItem(TOKEN);
  }

  remove() {
    localStorage.clear();
  }
}
