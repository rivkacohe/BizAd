import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

export type CardType = {
    _id: string;
    bizNum: number;
    name: string;
    description: string;
    phone: string;
    address: string;
    imageUrl: string;
    websiteUrl: string;
}

interface Props {
    data: CardType;
};


class Card extends React.Component<Props> {

    render() {
        const { data } = this.props;

        return (
            <div className="col-sm-8 col-md-3 card border-0 m-4 shadow bg-dark bg-opacity-10">
                <img src={data.imageUrl} alt={data.name} className="card-img-top" />
                <div className="card-body">
                    <p className='btn btn-outline-primary'>{data.bizNum}</p>
                    <h3 className="card-title text-capitalize">                        
                            {data.name}
                    </h3>
                    <h5 className="text-secondary mb-4">
                        {data.description}
                    </h5>
                    <div><i className="bi bi-telephone mx-2"></i>{data.phone}</div>
                    <hr />
                    <div>
                    <i className="bi bi-geo mx-2"></i>{data.address}
                    </div>
                    <hr />
                    <a href={data.websiteUrl} className="btn btn-primary">
                        Visit Website
                    </a>
                </div>
            </div>
        );
    }
}

export default Card;