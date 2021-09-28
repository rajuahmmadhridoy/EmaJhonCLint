
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Component/Header/Header'
import DashBord from './Component/DashBord/DashBord';
import Shop from './Component/Shop/Shop'
import Authentication from './Component/Authenticataion/Authentication'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import NoMatch from './Component/NoMatch/NoMatch'
import { useState } from 'react';
import { useEffect } from 'react';
import Review from './Component/Review/Review';
import { createContext } from 'react';
import Shipment from './Component/Shipment/Shipment';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
export const UserContext = createContext()
function App() {
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#2E150B");
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, []);
  let [logedIn, setLogedIn] = useState([])
  return (
    <UserContext.Provider value={[logedIn, setLogedIn]}>
    <div className="appCss">
      {
        loading ? (
          <h1 className="spinner">loading</h1>
        ) : (
          <Router>
            <Header />
            <Switch>
              <Route exact path='/' children={<Shop />} />
              <Route path='/product/:key' component={ProductDetails} />
              <Route path='/review' component={Review} />
              <Route path='/manageinventory' children={<DashBord />} />
              <PrivateRoute path='/shipment' children={<Shipment />}/>
              <Route path='/login'><Authentication /></Route>
              <Route path='/*' children={<NoMatch />} />
            </Switch>
          </Router>
        )
      }
    </div>
    </UserContext.Provider>
  );
}

export default App;
