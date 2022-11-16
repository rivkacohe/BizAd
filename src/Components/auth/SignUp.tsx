import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRequest } from "../../services/apiService";
import { IErrors } from "./Login";

function SignUp() {
    const [errorMsg, setErrorMsg] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef<null | HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);



    const formik = useFormik({

        // assign default value to field
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },

        validate: values => {
            const errors: IErrors = {};

            const schema = Joi.object().keys({
                name:Joi.string().required().min(2).max(100),
                email: Joi.string().email({ tlds: { allow: false } }),
                password: Joi.string().min(3).max(15).required().label('Password'),
                password_confirmation: Joi.any().equal(Joi.ref('password'))
                    .required()
                    .label('Confirm password')
                    .messages({ 'any.only': '{{#label}} does not match' })
            });

            const { error } = schema.validate(values);

            if (error) {
                error.details.forEach(item => {
                    if (item.context) {
                        const key = item.context.key + '';
                        errors[key] = item.message;
                    }
                })
            };

            return errors;
        },

        onSubmit: values => {
            const res = handleRequest('users/signUp', values);

            res.then  (res => {
                // console.log('registered');
                if (res.ok){
                    navigate('/login');
                }
                else{
                    setErrorMsg('Something went wrong')
                    console.error(errorMsg);
                }
            });
        },
    });
    return (
        <>
           <form
        onSubmit={formik.handleSubmit}
        className="p-3 form-max-w m-auto d-block"
    >
                <h1 className="text-center" >Sign Up</h1>


          <div className="mb-3">
            <input
                ref={inputRef}
                className="form-control"
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
            />
        </div>
        {
            formik.touched.name && formik.errors.name ? (
                <div className="text-danger">
                    {formik.errors.name}</div>
            ) : null
        }

        
        <div className="mb-3">
            <input
                className="form-control"
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                autoComplete="user-name"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
            />
        </div>
        {
            formik.touched.email && formik.errors.email ? (
                <div className="text-danger">
                    {formik.errors.email}</div>
            ) : null
        }

        <div className="mb-3">
            <input
                className="form-control"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
            />
        </div>
        {
            formik.touched.password && formik.errors.password ? (
                <div className="text-danger">
                    {formik.errors.password}</div>
            ) : null
        }
        
        <div className="mb-3">
            <input
                className="form-control"
                type="password"
                placeholder="Confirm Password"
                id="password_confirmation"
                name="password_confirmation"
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
                onBlur={formik.handleBlur}
            />
        </div>
        {
            formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                <div className="text-danger">
                    {formik.errors.password_confirmation}</div>
            ) : null
        }

        <button
            type="submit"
            className="btn btn-primary btn-lg w-100">
           Sign Up
        </button>
        {
            (errorMsg.length>1) && (
                <div className="text-danger">
                    {errorMsg}</div>
            ) 
        }

    </form>


        </>
           
    );
}

export default SignUp;