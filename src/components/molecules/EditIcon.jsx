import editIcon from "../../assets/pen.png";

import "./molecules.scss"

const EditIcon = () => {
    return (
        <div className="iconBorder">
          <img className="icon editIcon" src={editIcon} alt="edit icon" />
        </div>
     );
}
 
export default EditIcon;