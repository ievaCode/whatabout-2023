import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

const Register = () => {

  const [existingEmail, setExistingEmail] = useState(false);
  const [notMatching, setNotMatching] = useState(false);
  const { users, setUsers, post, setLoggedInUser } = useContext(UserContext);
  
  const navigation = useNavigate();

  const handleSubmit = (values) => {
    if(users.find(user => user.email === values.email)){
      setExistingEmail(true);
    } else if(values.password1 !== values.password2) {
      setNotMatching(true);
    } else {
      let newUser = {
        id: Date.now(),
        username: values.username,
        email: values.email,
        password: values.password1,        
        imageUrl: values.imageUrl,
        likedQuestionIds: [],
        dislikedQuestionIds: [],
        likedAnswerIds: [],
        dislikedAnswerIds: []        
      };
      setUsers([...users, newUser]);
      post(newUser);
      setLoggedInUser(newUser);
      navigation('/questions');
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('This should be a valid e-mail.')
      .required('This field must be filled.'),
    username: Yup.string()
      .min(2,'Username shoudl contain at least two letters.')
      .required('This field must be filled.'),
      imageUrl: Yup.string()
      .url('This shoudl be an actual url') ,
    password1: Yup.string()
      .min(8, 'Password must be at least 8 symbols length.')
      .required('This field must be filled.'),
    password2: Yup.string()
      .min(8, 'Password must be at least 8 symbols length.')
      .required('This field must be filled.')
  });

  return (
    <div className="registration formContainer">
      <Formik initialValues={{
          email: '',
          username: '',
          imageUrl: '',
          password1: '',
          password2: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setValues }) => (
          <Form>
            <div>
              <label>Email:
                <Field 
                  name='email'
                  value={values.email} 
                  onChange={(e)=>setValues({...values, email:e.target.value})}
                />
                {errors.email && touched.email ? <span className='errors'>{errors.email}</span> : null}
              </label>
            </div>
            <div>
              <label>Username:
                <Field 
                  name='username'
                  value={values.username} 
                  onChange={(e)=>setValues({...values, username:e.target.value})}
                />
                {errors.username && touched.username ? <span className='errors'>{errors.username}</span> : null}
              </label>
            </div>
            <div>
              <label> Image url:
                <Field name='imageUrl'
                  type='url'
                  value={values.imageUrl}
                  onChange={(e)=>setValues({...values, imageUrl:e.target.value})}
                />
                { errors.imageUrl && touched.imageUrl ? <span className='errors'>{errors.imageUrl}</span> : null }
              </label>
            </div>
            <div>
              <label>Password:
                <Field name='password1'
                  type='password'
                  value={values.password1} 
                  onChange={(e)=>setValues({...values, password1:e.target.value})}
                />
                {errors.password1 && touched.password1 ? <span className='errors'>{errors.password1}</span> : null}
              </label>
            </div>
            <div>
              <label>Repeat password:
                <Field name='password2'
                  type='password'
                  value={values.password2} 
                  onChange={(e)=>setValues({...values, password2:e.target.value})}
                />
                {errors.password2 && touched.password2 ? <span className='errors'>{errors.password2}</span> : null}
              </label>
            </div>               
            <button type="submit">Register</button>
            {existingEmail && <span className="notification">*User with this e-mail already exists</span>}
            {notMatching && <span className="notification">*Passwords do not match</span>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
 
export default Register;