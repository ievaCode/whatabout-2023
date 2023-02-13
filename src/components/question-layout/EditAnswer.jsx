import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import AnswerContext from "../../contexts/AnswerContext";

const EditAnswer = () => {

    const { answers, updateAnswer } = useContext(AnswerContext);
    
    let { id } = useParams();
    const navigation = useNavigate();

    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];

    const editedAnswer = answers.find(answer => answer.id.toString() === id) 
  
    const handleSubmit = (values) => {
        let editedAnswer = {
            answer: values.answer,
            edited: dateNow,
          };
        updateAnswer(id, editedAnswer);
        navigation(-1);
      }
  
    const validationSchema = Yup.object().shape({
      answer: Yup.string()
        .min(15,'Your explanation should be at least 15 symbols length.')
        .max(500, 'Your answer can be maximum 500 symbols length.')
        .required('This field must be filled.') 
    });

    return ( 
      <div className="answerForm formContainer">
        <Formik initialValues={{
            answer: editedAnswer.answer,
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
                  {errors.answer && touched.answer ? <span>{errors.answer}</span> : null}
                </label>
              </div>             
              <button type="submit">Confirm changes</button>
            </Form>
          )}
        </Formik>
      </div>
    );
}
 
export default EditAnswer;

