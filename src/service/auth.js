export default class AuthService {
  constructor(http, token) {
    this.http = http;
    this.token = token;
  }

  async login(username, password) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    this.token.set(data.token);

    return data;
  }

  async signup(username, password, name, email, url) {
    const data = this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });

    this.token.set(data.token);

    return data;
  }

  async me() {
    const token = this.token.get();

    if (token == null) {
      return undefined;
    }

    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  logout(callback) {
    this.token.remove();
    callback();
  }
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    this.callback(error);
  }
}
