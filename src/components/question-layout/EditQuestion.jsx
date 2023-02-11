import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import QuestionContext from "../../contexts/QuestionContext";

const EditQuestion = () => {

    const { questions, updateQuestion } = useContext(QuestionContext);
    
    let { id } = useParams();
    const navigation = useNavigate();

    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];

    const editedQuestion = questions.find(question => question.id.toString() === id) 
  
    const handleSubmit = (values) => {
        let editedQuestion = {
            question: values.question,
            explanation: values.explanation,
            edited: dateNow,
          };
        updateQuestion(id, editedQuestion);
        navigation('/questions');
      }
  
    const validationSchema = Yup.object().shape({
      question: Yup.string()
        .min(15, 'Your question should be at least 15 characters long.')
        .max(100, 'Your question can be maximum 100 characters long. You can always add a more detailed explanation to the explanation textbox.')
        .required('This field must be filled.'),        
      explanation: Yup.string()
        .min(15,'Your explanation should be at least 15 symbols length.')
        .max(500, 'Your question can be maximum 500 symbols length.')
    });

    return ( 
      <div className="questionForm editQuestionForm">
        <Formik initialValues={{
            question: editedQuestion.question,
            explanation: editedQuestion.explanation
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setValues }) => (
            <Form>
              <div>
                <label>Question:
                  <Field 
                    name='question'
                    value={values.question} 
                    onChange={(e)=>setValues({...values, question:e.target.value})}
                  />
                  {errors.question && touched.question ? <span>{errors.question}</span> : null}
                </label>
              </div>
              <div>
                <label>More detailed explanation (optional):
                  <Field 
                    component="textarea"
                    name='explanation'
                    value={values.explanation} 
                    onChange={(e)=>setValues({...values, explanation:e.target.value})}
                  />
                  {errors.explanation && touched.explanation ? <span>{errors.explanation}</span> : null}
                </label>
              </div>        
              <button type="submit">Confirm changes</button>
            </Form>
          )}
        </Formik>
      </div>
    );
}
 
export default EditQuestion;

