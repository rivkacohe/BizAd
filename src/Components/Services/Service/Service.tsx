import React from 'react';
import { Link } from 'react-router-dom';
// import './Card.css';

export type ServiceType = {
    _id: string;
    serviceName: string;
    userId: string;
    status: string;
    userServiceID: string;
    remark: string;
}

interface Props {
    data: ServiceType;
    delete: Function;
};


class Service extends React.Component<Props> {

    render() {
        const { data } = this.props;

        return (
            <tr className="text-capitalize">
                <td className='text-center'>
                    <Link   key={data.userServiceID}
                               to="/editService" state={data}>{data.serviceName}</Link>
                </td>
                <td className='text-center'>
                  <span 
                  className={data.status === 'active' ? 'btn btn-success' : 'btn btn-secondary'}
                   >{data.status}</span>
                </td>
                <td className='text-center'>
                    <button onClick={()=>this.props.delete(data.userServiceID,data.serviceName)} className='btn btn-light'>
                        <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

export default Service;