
import { Link, useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        navigate('/login');
    }

    return (
        <Link
         onClickCapture={handleLogout}
            className="nav-link"
            to="#">
            Log Out
        </Link>
    );
}

export default LogOut;