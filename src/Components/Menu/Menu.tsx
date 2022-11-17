import  { useEffect, useState } from "react";
import Cards, { CardType } from "./Cards/Cards";
import Title from "../Title/Title";
import "./Menu.css";
import { getRequest } from "../../services/apiService";

export type displayMode = 'grid' | 'list';

interface MenuProps {
    defaultDisplay: displayMode;
}

function Menu(props: MenuProps) {

    const [display, setDisplay] = useState<displayMode>(props.defaultDisplay);
    const [cards, setCards] = useState<Array<CardType>>([]);
    const [filtered, setFiltered] = useState<Array<CardType>>([]);
    const [bizToSearch, setBizToSearch] = useState<string>('');


    useEffect(() => {
        const res= getRequest('cards');
        if (res){
            res.then(res => res.json())
            .then(json => {
                setCards(json);
                setFiltered(json)
            });
        }
    },[]);

    function changeDisplay(mode: displayMode) {
        setDisplay(mode);

    }

    function findBiz(biz:string) {
        const searched = cards.filter(card => {
            return card.name.includes(biz);
        })
        
        setFiltered(searched);
        setBizToSearch(biz);
    }


    return (
        <>
            <Title text="BizAd">
                <small>Advertising your bussiness</small>
            </Title>

            <div className="d-flex justify-content-between px-5">
                <div className="d-flex align-items-center">
                    <button onClick={(e) => findBiz(bizToSearch)} className="searchBtn">
                        <i className="bi bi-search p-2"></i>
                    </button>
                    <input onChange={(e) => findBiz(e.target.value)} type="text" placeholder="Search by bussiness name" className="form-control" id="exampleInputPassword1" />
                </div>
                <div>
                    <button onClick={(e) => changeDisplay('list')} className="btn btn-default">
                        <i className="bi-list-ul"></i>
                    </button>
                    <button onClick={(e) => changeDisplay('grid')} className="btn btn-default">
                        <i className="bi-grid-3x3-gap-fill"></i>
                    </button>
                </div>
            </div>
           {
            (filtered.length === 0) &&  <div className="alert alert-warning" role="alert">No biz to display</div>
           } 

            <div className={display}>
                {
                    filtered.map((card) =>
                        <Cards
                            key={card._id}
                            data={card}
                        />
                    )

                }
            </div>
        </>
    );

}

export default Menu;