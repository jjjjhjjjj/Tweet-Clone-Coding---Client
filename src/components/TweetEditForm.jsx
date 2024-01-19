import { useState } from "react";

export default function TweetEditForm({ id, value, onEdit, onIsEdit }) {
  const [text, setText] = useState(value);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit(id, text).then(() => onIsEdit(false));
  };

  return (
    <form>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="px-1 border border-2 border-dotted border-cyan-500 w-full"
      />
      <div className="mt-1 flex justify-end gap-1">
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-1 bg-blue-500 text-xs font-bold text-white"
        >
          Update
        </button>
        <button
          type="submit"
          onClick={() => onIsEdit(false)}
          className="p-1 bg-red-500 text-xs font-bold text-white"
        >
          Cancle
        </button>
      </div>
    </form>
  );
}
