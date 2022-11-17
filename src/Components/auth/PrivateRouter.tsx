import { Navigate } from 'react-router-dom';

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props

    const token = localStorage.getItem('token');
    const isLoggedIn = token && token.length > 0;

    return isLoggedIn ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/login"
        />
    )
}

export default PrivateRoute;