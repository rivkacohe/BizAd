import { Link } from "react-router-dom";
import LogOut from "../auth/LogOut";

function Header() {
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg bg-primary ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="/favicon.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="a"
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="w-100 navbar-nav d-flex justify-content-between">

                            <Link className="nav-link text-light active text-end col-md-1" aria-current="page" to="/">
                                BizAd
                            </Link>
                            <Link className="nav-link text-light text-center col-md-1" to="/services">Services</Link>
                            <Link className="nav-link text-light col-md-4" to="/about">About</Link>



                            <Link className="nav-link text-light text-end col-md-4" to="/login">Login</Link>
                            <Link className="nav-link text-light text-center col-md-1" to="/signup">Sign Up</Link>
                            <Link className="nav-link text-light col-md-1" to="#">Logout</Link>

                        </div>
                    </div>
                </div>
            </nav> */}

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
               
                <div className="container-fluid">
                <Link className="navbar-brand " to="/">
                    <img
                        src="/favicon.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="a"
                    />
                </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="navbar-brand nav-link  active" to="/">BizAd</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/services">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-0 mb-2 mb-lg-0 justify-content-end">
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                        <li className="nav-item"><LogOut/></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    );
}

export default Header;