import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { handleRequest, getRequest } from "../../services/apiService";
import { getUserId } from "../../services/auth";
import Title from "../Title/Title";
import Service, { ServiceType } from "./Service/Service";


interface IErrors {
    [key: string]: string;
}

function Services() {
    const [servicesForUser, setServicesForUser] = useState<Array<ServiceType>>([]);
    const [services, setServices] = useState<Array<string>>(['mailinglist','whatsup group notification']);
    const user = getUserId();
    const statuses = ['active', 'disabled']
    
    const formik = useFormik({

        initialValues: {
            serviceName: '',
            userId: user,
            status: '',
            userServiceID: '',
        },

        validate: values => {
            const errors: IErrors = {};

            if (!values.serviceName) { errors.serviceName = 'Please select service'; }
            if (!values.status) { errors.status = 'Please select status'; }

            return errors;
        },

        onSubmit: async values => {
            values.userServiceID = values.serviceName + values.userId;

            const res = handleRequest('services/add', values);
            if (res) {
                res.then(res => res.json())
                    .then(json => {
                        setServicesForUser([...servicesForUser, json]);
                        setServices([...services].filter(service=> service!==json.serviceName));
                    })
            }
            await res.catch(err=>{
                console.log(err);
                
            })
        },
    });

    useEffect(() => {
        const res = getRequest('services/user?userId=' + user)
        if (res) {
            res.then(res => res.json())
                .then(json => {
                    setServicesForUser(json);
                })
        }
    }, [])


    function deleteService(id: string, service:string) {        
        fetch('http://localhost:3000/services/', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userServiceID: id, servicName: service })
        })
            .then(res => res.json())
            .then(json => {                
                const updated = [...servicesForUser].filter(service => service.userServiceID !== json.userServiceID);
                setServicesForUser(updated)
                setServices([...services,service])
            })
    }

    return (
        <>
            <Title text="Services">
                <small>Choose services that you would like to get from BizAd</small>
            </Title>

            <form onSubmit={formik.handleSubmit}>

                <div className="d-flex justify-content-center p-3">
                    <div className="col-md-3 d-flex align-items-center px-2">
                        <label className="col-4 px-2 text-end">Service Name:</label>
                        <select
                            className="form-select text-capitalize"
                            id="serviceName"
                            name="serviceName"
                            onChange={formik.handleChange}
                            value={formik.values.serviceName}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Choose...</option>
                            {
                                services.map((service) =>
                                    <option key={service} value={service}>{service}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="col-md-3 d-flex align-items-center px-2">
                        <label className="col-4 px-2 text-end">Service status:</label>
                        <select
                            className="form-select text-capitalize"
                            id="status"
                            name="status"
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Choose...</option>
                            {
                                statuses.map((status) =>
                                    <option key={status} value={status}>{status}</option>
                                )
                            }
                        </select>
                    </div>

                    <button className="btn btn-primary" type="submit">Add Servioce</button>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <div className="">
                        {
                            formik.touched.serviceName && formik.errors.serviceName ? (
                                <div className="text-danger">
                                    {formik.errors.serviceName}</div>
                            ) : null
                        }
                    </div>

                    <div className="">
                        {
                            formik.touched.status && formik.errors.status ? (
                                <div className="text-danger">
                                    {formik.errors.status}</div>
                            ) : null
                        }
                    </div>
                </div>
            </form>

            {
                servicesForUser.length === 0 ? (
                    <div className="alert alert-warning" role="alert">No services have been defined yet</div>
                ) : null
            }

            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">Service Name</th>
                        <th className="text-center" scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        servicesForUser.map((service) =>
                            <Service
                                key={service.userServiceID}
                                data={service}
                                delete={deleteService}
                            />
                        )}
                </tbody>

            </table>


        </>);


}

export default Services;