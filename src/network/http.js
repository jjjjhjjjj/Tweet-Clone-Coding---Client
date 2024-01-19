export default class HTTPService {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    // console.log(res);       credentials: "include",

    let data;

    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status < 200 || res.status > 299) {
      const message =
        data && data.message ? data.message : "Something went wrong! 😢";
      const error = new Error(message);

      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
      }

      throw error;
    }

    return data;
  }
}
