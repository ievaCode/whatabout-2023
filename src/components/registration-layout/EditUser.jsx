import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import close from "../../assets/close.png"

const EditUser = () => {

    const { loggedInUser, updateUser } = useContext(UserContext);
  
    const navigation = useNavigate();
  
    const handleSubmit = (values) => {
        let editedUser = {
            username: values.username,
            imageUrl: values.imageUrl
            };
        updateUser(loggedInUser.id, editedUser);
        navigation(-1);
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .min(2,'Username shoudl contain at least two letters.')
        .required('This field must be filled.'),
        imageUrl: Yup.string()
        .url('This shoudl be an actual url')
    });

    return (
        <div className="registration formContainer">
            <Link to='/'><img className = "close" src={close} alt="closing icon" /></Link> 
            <Formik initialValues={{
                email: loggedInUser.email,
                username: loggedInUser.username,
                imageUrl: loggedInUser.imageUrl
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
                            disabled={true}
                            />
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
                        <button type="submit">Confirm change</button>
                    </Form>
                )}
            </Formik>
            <p className="redirectText">Already have and account? Log in
                <Link className="redirectLink" to="/login">here</Link>
            .</p>
        </div>
    );
}
 
export default EditUser;