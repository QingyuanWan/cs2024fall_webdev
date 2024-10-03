import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssigmentTileControlsButton() {
  return (
    <div className="float-end">
      <span className="badge rounded-pill bg-secondary text-dark border border-dark px-4 me-2">
        40% of Total
      </span>
      <FaPlus className="position-relative " style={{ bottom: "1px" }}  />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}

