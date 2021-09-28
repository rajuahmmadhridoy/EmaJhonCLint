import React, { useState } from 'react';
import './DashBord.scss'
import { DashBordData } from './DashBordData'
import { Container, Row, Col } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// import Shop from '../Shop/Shop';
import Report from './Report';
import Products from './Products'
const DashBord = () => {
    // const [sidebar, setSidebar] = useState(false);
    // const showSidebar = () => setSidebar(!sidebar);
    const [active, setActive] = useState(0);
    const showActiveMenu = (index) => {
        setActive(index)
        console.log(index, 'from function');
    }
    console.log(active, 'state active');
    return (
        <>
            <Router>
                <Container>
                    <Row>
                        <Col md={4}>
                            {/* <div className="nabvar">
                            <Link to='#' className='menu-bars'>
                                <h1 onClick={showSidebar}>BAR</h1>
                            </Link>
                        </div> */}
                            <nav>
                                {/* className={sidebar ? 'nav-menu active' : 'nav-menu'} */}
                                <ul className="nav-menu-items">
                                    {/* <li className="navbar-toggle">
                                    <Link to='#' className="menu-bars">
                                        <h1>toggleIcon</h1>
                                    </Link>
                                </li> */}
                                    {DashBordData.map((item, index) => {
                                        console.log(index, 'index from data');
                                        return (
                                            <li onClick={() => showActiveMenu(index)} className={active === index ? 'nav-items active' : 'nav-items'}>
                                                <span>{index}</span>
                                                <Link to={item.path}>{item.title}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>
                        </Col>
                        <Col md={8}>
                            <Switch>
                                <Route exact path='/dashbord'>
                                    <Report />
                                </Route>
                                <Route exact path='/dashbord/addProduct'>
                                    <Products />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        </>
    );
};

export default DashBord;