import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import close from "../../assets/close.png"

const Login = () => {

  const [correctLogin, setCorrectLogin] = useState(true);
  const { users, setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const handleSubmit = (values) => {
    const existingUser= users.find(user => user.email === values.email && user.password === values.password);
    if (existingUser){
        setLoggedInUser(existingUser);
        navigation('/questions');
      } else {
      setCorrectLogin(false);
    };    
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field must be filled.'),
    password: Yup.string()
      .required('This field must be filled.'),
  });

  return (
    <div className="registration formContainer">
      <Link to='/'><img className = "close" src={close} alt="closing icon" /></Link>   
      <Formik 
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setValues }) => (
          <Form>
            <div>
              <label>Email: </label>
                <Field 
                  name='email'
                  value={values.email} 
                  onChange={(e)=>setValues({...values, email:e.target.value})}
                />
                {errors.email && touched.email ? <span className='errors'>{errors.email}</span> : null}
            </div>
            <div>
              <label>Password:
                <Field name='password'
                  type='password'
                  value={values.password} 
                  onChange={(e)=>setValues({...values, password:e.target.value})}
                />
                {errors.password && touched.password ? <span className='errors'>{errors.password}</span> : null}
              </label>
            </div>            
            <button type="submit">Sign in</button>
            {!correctLogin && <span className="notification">*Wrong sign in details.</span>}
          </Form>
        )}
      </Formik>
      <p className="redirectText">No account yet? You can register
        <Link className="redirectLink" to="/register">here</Link>
        .</p>
    </div>
  );
}
 
export default Login;