export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      type={`${type}`}
      name={`${name}`}
      value={`${value}`}
      onChange={onChange}
      placeholder={`${placeholder}`}
      className="py-2 px-4 border border-gray-400 text-lg"
    />
  );
}
