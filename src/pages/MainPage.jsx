import Tweets from "../components/Tweets";
import { useAuth } from "../context/AuthApiContext";

export default function MainPage() {
  const { user } = useAuth();

  return <Tweets addable={Boolean(user)} />;
}
