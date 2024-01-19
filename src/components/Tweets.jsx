import { useEffect, useState } from "react";
import { useTweetApi } from "../context/TweetApiContext";
import TweetList from "./TweetList";
import TweetForm from "./TweetForm";
import Banner from "./Banner";

export default function Tweets({ userId, addable = true }) {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState();
  const { tweetService } = useTweetApi();

  useEffect(() => {
    tweetService //
      .getTweets(userId)
      .then(setTweets)
      .catch((err) => {
        setError(err.message);
      });
  }, [tweetService, userId]);

  useEffect(() => {
    const offSocket = tweetService.onSocket((tweet) =>
      setTweets([tweet, ...tweets])
    );

    return () => offSocket();
  }, [tweetService, tweets]);

  const handleCreate = async (text) => {
    return tweetService //
      .postTweet(text)
      .then((tweet) => setTweets([tweet, ...tweets]))
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleDelete = (id) => {
    return tweetService //
      .deleteTweet(id)
      .then(() => {
        setTweets((tweets) => tweets.filter((tweet) => tweet.id !== id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleEdit = async (id, text) => {
    return tweetService //
      .updateTweet(id, text)
      .then((tweet) =>
        setTweets((tweets) => tweets.map((t) => (t.id === id ? tweet : t)))
      )
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <section>
      {error && <Banner text={error} />}
      {addable && <TweetForm onCreate={handleCreate} />}
      <TweetList tweets={tweets} onDelete={handleDelete} onEdit={handleEdit} />
    </section>
  );
}
