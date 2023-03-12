import { useContext } from "react";
import { useNavigate,  useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import UserContext from "../../contexts/UserContext";
import AnswerContext from "../../contexts/AnswerContext";


const NewAnswer = () => {

    const { loggedInUser } = useContext(UserContext);
    const { addNewAnswer } = useContext(AnswerContext);
    
    let { questionId } = useParams();
    const navigation = useNavigate();

    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];
  
    const handleSubmit = (values) => {
        let newAnswer = {
          id: Date.now(),
          answer: values.answer,
          authorId: loggedInUser.id,
          questionId: Number(questionId),
          date: dateNow,
          edited: "",
          likedBy: [],
          dislikedBy: []
        };
        addNewAnswer(newAnswer);
        navigation(`/questions/${questionId}`);
        
      }
  
    const validationSchema = Yup.object().shape({
      answer: Yup.string()
        .min(15, 'Your answer should be at least 15 characters long.')
        .max(100, 'Your answer can be maximum 100 characters long. You can always add a more detailed explanation to the explanation textbox.')
        .required('This field must be filled.'),        
      explanation: Yup.string()
        .min(15,'Your explanation should be at least 15 symbols length.')
        .max(500, 'Your answer can be maximum 500 symbols length.')
    });

    return ( 
      <div className="answerForm formContainer">
        <Formik initialValues={{
            answer: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setValues }) => (
            <Form>
              <div>
                <label>Answer:
                  <Field 
                    component="textarea"
                    name='answer'
                    value={values.answer} 
                    onChange={(e)=>setValues({...values, answer:e.target.value})}
                  />
                  {errors.answer && touched.answer ? <span className='errors'>{errors.answer}</span> : null}
                </label>
              </div>              
              <button type="submit">Publish answer</button>
            </Form>
          )}
        </Formik>
      </div>
    );
}
 
export default NewAnswer;