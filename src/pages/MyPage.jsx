import { useParams } from "react-router-dom";
import Tweets from "../components/Tweets";

export default function MyPage() {
  let { userId } = useParams();

  return <Tweets userId={userId} addable={false} />;
}
