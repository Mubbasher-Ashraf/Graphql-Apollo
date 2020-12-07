import { Redirect, Route } from 'react-router-dom';

 const ProtectedRoute = (props) => {
    const { component: Component, ...rest } = props;
    const isAuthenticated = true;//???;
    
     return (
        <Route {...rest}
         render={ props => 
            isAuthenticated ? 
            <Component {...props} /> :
            <Redirect to={{ pathname: '/dashboard' }} />
         }
        />
     )
}

export default ProtectedRoute;