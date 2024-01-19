import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthApiContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="p-5 flex items-center justify-between bg-black">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src="./images/logo.png" alt="Dwitter" className="w-10 h-10" />
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Dwitter
        </h1>
        {user && (
          <Link to={`/${user.username}`}>
            <strong className="font-normal text-xl text-cyan-600">
              @{user.username}
            </strong>
          </Link>
        )}
      </div>
      <ul className="flex text-lg gap-4 text-white">
        <li className="">
          <Link to="/">All Tweets</Link>
        </li>
        {user && (
          <li className="">
            <Link to={`/${user.username}`}>My Tweets</Link>
          </li>
        )}
        <li className="">
          {user ? (
            <button type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </header>
  );
}
