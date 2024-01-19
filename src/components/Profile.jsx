export default function Profile({ name }) {
  return (
    <div className="p-3 w-10 h-10 flex justify-center items-center font-bold bg-gray-100 border rounded-full">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
