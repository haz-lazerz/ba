import { FaExclamationCircle } from "react-icons/fa";

export default function Error({
  message = "Something awful happened, try later",
}) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <FaExclamationCircle className="text-5xl text-red-600" />
      <h1 className="text-3xl text-red-600 mx-2">{message}</h1>
    </div>
  );
}
