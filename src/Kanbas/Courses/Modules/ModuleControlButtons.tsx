import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <FaPlus className="position-relative " style={{ bottom: "1px" }}  />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}

