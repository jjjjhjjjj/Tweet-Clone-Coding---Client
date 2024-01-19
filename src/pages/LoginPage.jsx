import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthApiContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Banner from "../components/Banner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login, signup } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    url: "",
  });

  const [error, setError] = useState("");
  const { username, password, name, email, url } = form;

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setForm((form) => {
      return { ...form, [key]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    (isLogin
      ? login(username, password)
      : signup(username, password, name, email, url)
    ).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <section className="px-16 py-8 flex-1 bg-gray-100">
      {error && (
        <div className="mb-5">
          <Banner text={error} />
        </div>
      )}
      <form className="flex flex-col gap-3">
        <Input
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Id"
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />

        {!isLogin && (
          <>
            <Input
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Name"
            />
            <Input
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              name="url"
              value={url}
              onChange={handleChange}
              placeholder="Url"
            />
          </>
        )}
        <div className="mb-5">
          <input
            type="checkbox"
            id="regi"
            onChange={() => setIsLogin((value) => !value)}
          />
          <label htmlFor="regi" className="ml-3 text-lg">
            Create a new account?
          </label>
        </div>

        <button
          type="submit"
          className="w-[90%] self-center py-3 bg-blue-500 font-bold text-white"
          onClick={handleSubmit}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </section>
  );
}
