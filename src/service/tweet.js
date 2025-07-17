export default class TweetService {
  constructor(http, token, socket) {
    this.http = http;
    this.token = token;
    this.socket = socket;
  }

  async getTweets(userId) {
    const query = userId ? `?username=${userId}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
    });
  }

  async postTweet(text) {
    return this.http.fetch("/tweets", {
      method: "POST",
      headers: this.getAuthorization(),
      body: JSON.stringify({
        text,
      }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getAuthorization(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getAuthorization(),
      body: JSON.stringify({
        text,
      }),
    });
  }

  onSocket(callback) {
    return this.socket.on("tweets", callback);
  }

  getAuthorization() {
    const token = this.token.get();

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
