import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import TweetEditForm from "./TweetEditForm";
import Profile from "./Profile";
import { Link } from "react-router-dom";

export default function TweetItem({ tweet, onDelete, onEdit, editable }) {
  const { id, text, username, name, url, createdAt } = tweet;
  const [isEdit, setEdit] = useState(false);

  return (
    <div className="p-3 flex gap-2 border shadow-lg">
      <div>
        <Profile name={name} />
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex gap-2 items-center">
          <strong className="text-sm">{name}</strong>
          <Link to={`/${username}`}>
            <p className="text-xs text-cyan-600 font-bold">@{username}</p>
          </Link>
          <span className="text-xs text-gray-400">· {createdAt}</span>
        </div>
        <p className="px-1 text-sm">{text}</p>
        {isEdit && (
          <div className="mt-2">
            <TweetEditForm
              id={id}
              value={text}
              onEdit={onEdit}
              onIsEdit={setEdit}
            />
          </div>
        )}
      </div>

      {editable && (
        <div className="flex flex-col justify-between">
          <button
            type="button"
            onClick={() => onDelete(tweet.id)}
            className="text-xl text-cyan-600"
          >
            <RiCloseFill />
          </button>
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="text-xl text-cyan-600"
          >
            <CiEdit />
          </button>
        </div>
      )}
    </div>
  );
}
