export default function Button({ title, icon, onClick, disabled }) {
  return (
    <button
      className="bg-[#2d3748] text-white w-auto p-2 rounded-md m-2 flex justify-center items-center"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="m-2">{icon}</span>
      {title}
    </button>
  );
}
