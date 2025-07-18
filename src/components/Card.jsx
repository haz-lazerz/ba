import { FaLock, FaLockOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { addLockedItem, removeLockedItem } from "../slices";
import Loader from "./Loader";

const Card = ({ src, locked, gridIndex, id, loading }) => {
  const dispatch = useDispatch();

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    return (
      <>
        {locked ? (
          <FaLockOpen className="text-white absolute text-2xl m-2 right-0 group-hover:text-green-600" />
        ) : (
          <FaLock className="text-white absolute text-2xl m-2 right-0 group-hover:text-red-600" />
        )}
        <img className="object-cover w-full h-full block" src={src} alt="" />
      </>
    );
  };

  return (
    <div
      className="border-2 border-white rounded-md relative h-[300px] w-[300px] group"
      onClick={() =>
        dispatch(
          locked
            ? removeLockedItem({ src, gridIndex, id })
            : addLockedItem({ src, gridIndex, id })
        )
      }
    >
      {renderContent()}
    </div>
  );
};

export default Card;
