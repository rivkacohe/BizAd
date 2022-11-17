import { error } from "console";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { patchRequest } from "../../services/apiService";
import Title from "../Title/Title";
import { ServiceType } from "./Service/Service";
import './Service/service.css';

interface IErrors {
    [key: string]: string;
}

interface LocationState {
    state: ServiceType;
}

function EditService() {

    const navigate = useNavigate();

    const location = useLocation();
    const locationState = location as LocationState;
    const service = locationState.state;
    const [errMsg, setErrorMsg] = useState<string>('');

    const statuses = ['active', 'disabled'];


    const formik = useFormik({

        initialValues: {
            status: service.status,
            remark: service.remark,
        },

        // all values from fields as JSON object
        onSubmit: values => {            
            const res = patchRequest(`services/${service.userServiceID}`, values);
            res.then(res => res.json())
            .then(json => {
                if(json.error){
                    setErrorMsg(json.error);
                    return;
                }
                navigate('/services');
            });
        },
    });



    return (<>


        <Title text="Update Service">
            <small className="text-capitalize">{service.serviceName}</small>
        </Title>

        <form onSubmit={formik.handleSubmit} >


            <div className="mx-auto d-flex flex-column  form-group form-max-w">
                <div className="mb-3">
                    <label className="fw-bold">Status</label>
                    <select
                        className="form-select text-capitalize"
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        onBlur={formik.handleBlur}
                    >
                        {
                            statuses.map((status) =>
                                <option key={status} value={status}>{status}</option>
                            )
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label className="fw-bold">Comments:</label>
                    <textarea
                        className="form-control"
                        placeholder="Write here"
                        id="remark"
                        name="remark"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        value={formik.values.remark}
                        onBlur={formik.handleBlur}
                    ></textarea>
                </div>
                <div className="d-flex  justify-content-center">
                    <button
                    type="submit"
                    disabled={service.status===formik.values.status&&service.remark===formik.values.remark} 
                    className=" mx-3 btn btn-outline-success">Update Service
                    </button>
                    <Link to="/services" className="btn btn-outline-primary">Cancel</Link></div>

                    {
                errMsg.length > 0 &&
                <div className="alert alert-danger my-3">
                    {errMsg}
                </div>
            }

            </div>
        </form>


    </>

    );
}

export default EditService;