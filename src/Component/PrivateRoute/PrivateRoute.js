import { useContext } from "react";
import { Redirect, Route} from "react-router-dom";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
    const [logedIn, setLogedIn] = useContext(UserContext);
    console.log(logedIn,'private route');
    return (
      <Route
        {...rest}
        render={({ location }) =>
        logedIn.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
  export default PrivateRoute;