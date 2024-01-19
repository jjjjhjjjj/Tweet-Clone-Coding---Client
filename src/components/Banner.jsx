export default function Banner({ text }) {
  return (
    <div className="p-1 w-full mx-auto bg-red-400 text-white font-bold text-lg">
      ⛔ ERROR : {text}
    </div>
  );
}
