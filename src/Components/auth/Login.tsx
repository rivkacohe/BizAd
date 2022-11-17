import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { useFormik } from "formik";
import { handleRequest } from "../../services/apiService";
import { TOKEN_KEY, USER_ID } from "../../services/auth";
import "./form.css"


export interface IErrors {
    [key: string]: string;
}


function Login() {

    const navigate = useNavigate();
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },

        validate: values => {
            const errors: IErrors = {};

            const schema = Joi.object().keys({
                email: Joi.string().required().min(6).max(256),
                password: Joi.string().required().min(6).max(1024),
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
            const res = handleRequest('users/login', values);

            res.then(res => res.json())
                .then(json => {
                    if(json.error){
                        setErrorMsg(json.error);
                        return;
                    }
                    localStorage.setItem(TOKEN_KEY, json.token);
                    localStorage.setItem(USER_ID, json.id);
                    navigate('/');
                })


                res.catch(json=>{
                    console.log( json.error);
                })
        },
    });

    return (

        <form
        onSubmit={formik.handleSubmit}
        className="p-3 form-max-w m-auto d-block"
    >
                <h1 className="text-center" >Login</h1>

        <div className="mb-3">
            <input
                ref={inputRef}
                className="form-control"
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                autoComplete="email"
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

        <button
            type="submit"
            className="btn btn-primary btn-lg w-100">
            Login
        </button>

        {
            (errorMsg.length>1) && (
                <div className="text-danger">
                    {errorMsg}</div>
            ) 
        }
    </form>

    );
}

export default Login;