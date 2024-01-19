import { useAuth } from "../context/AuthApiContext";
import TweetItem from "./TweetItem";

export default function TweetList({ tweets, onDelete, onEdit }) {
  const { user } = useAuth();

  return (
    <section className="p-5">
      {tweets.length > 0 && (
        <ul className="flex flex-col gap-3">
          {tweets.map((tweet) => (
            <li key={tweet.id}>
              <TweetItem
                tweet={tweet}
                onDelete={onDelete}
                onEdit={onEdit}
                editable={user?.username === tweet.username}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
