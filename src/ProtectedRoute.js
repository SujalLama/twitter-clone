import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function PrivateRoute({ children, ...rest }) {
  let auth = useSelector(state => state.userLogin);
  let registerAuth = useSelector(state => state.userRegister);

  return (
    <Route
      {...rest}
      render={() =>
        auth.userInfo || registerAuth.userInfo ? (
          children
        ) : (
          <Redirect
            to="/" />
        )
      }
    />
  );
}