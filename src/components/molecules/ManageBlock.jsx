import { Link } from "react-router-dom";

import "./molecules.scss"

const ManageBlock = ({editLink, deleteAction}) => {
    return (
        <div className="manageButtonsWrapper">
            <div className="button editButton"><Link to={editLink}>Edit</Link></div>
            <button className="button deleteButton" onClick = {deleteAction}>Delete</button>          
        </div>
     );
}
 
export default ManageBlock;