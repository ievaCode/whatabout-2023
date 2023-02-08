import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

const Login = () => {

  //cia gal nereikia steito, o tik kintamojo
  const [formInputs, setFormInputs] = useState({
    email: '',
    username: '',
    password: '',
    imageUrl: ''
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('This should be a valid e-mail.')
      .required('This field must be filled.'),
    username: Yup.string()
      .min(2,'Username shoudl contain at least two letters.')
      .required('This field must be filled.'), 
    password: Yup.string()
      .min(8, 'Password must be at least 8 symbols length.')
      .required('This field must be filled.'),
    imageUrl: Yup.string()
      .url('This shoudl be an actual url')
  });

  return (
    <div className="registration">
      <Formik
        initialValues={formInputs}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ errors, touched, /*isValidating, validateField, validateFormvalues, */ values, setValues }) => (
          <Form>
            <div>
              <label>Email:
                <Field 
                  name='email'
                  value={values.email} 
                  onChange={(e)=>setValues({...values, email:e.target.value})}
                />
                {errors.email && touched.email ? <span>{errors.email}</span> : null}
              </label>
            </div>
            <div>
              <label>Username:
                <Field 
                  name='username'
                  value={values.username} 
                  onChange={(e)=>setValues({...values, username:e.target.value})}
                />
                {errors.username && touched.username ? <span>{errors.username}</span> : null}
              </label>
            </div>
            <div>
              <label>Password:
                <Field name='password'
                  type='password'
                  value={values.password} 
                  onChange={(e)=>setValues({...values, password:e.target.value})}
                />
                {errors.password && touched.password ? <span>{errors.password}</span> : null}
              </label>
            </div>            
            <div>
              <label> Image url:
                <Field name='imageUrl'
                  type='url'
                  value={values.imageUrl}
                  onChange={(e)=>setValues({...values, imageUrl:e.target.value})}
                />
                { errors.imageUrl && touched.imageUrl ? <span>{errors.imageUrl}</span> : null }
              </label>
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
 
export default Login;