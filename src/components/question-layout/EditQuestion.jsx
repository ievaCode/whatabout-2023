import { useParams } from "react-router-dom";

const EditQuestion = () => {

    let { id } = useParams();

    return (
        <p>edit question, that has id {id}</p>
    );
}
 
export default EditQuestion;