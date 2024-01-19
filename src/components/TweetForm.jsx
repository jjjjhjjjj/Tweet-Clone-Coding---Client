import { useState } from "react";

export default function TweetForm({ onCreate }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(text).then(() => setText(""));
  };

  return (
    <form className="px-5 py-2 w-full flex gap-3 bg-gray-300">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Edit your tweet"
        className="px-3 w-[90%] "
      />
      <div className="w-[10%]">
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-1 w-full bg-blue-500 font-bold text-white"
        >
          POST
        </button>
      </div>
    </form>
  );
}
