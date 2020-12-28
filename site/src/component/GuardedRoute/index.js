import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect push to='/login' />
        )} />
    )
}

export default GuardedRoute;