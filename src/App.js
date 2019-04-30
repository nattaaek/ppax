import React from 'react';
import { Route } from "react-router-dom";
import { Navbar, NavItem, NavLink, NavbarBrand ,Nav} from 'reactstrap';
import Reservation from './Reservation';
import Get from './Get';

export default class App extends React.Component{

    render(){
        return(
                <div>
                    <Navbar>
                        <NavbarBrand href="/">โรงแรมพี่แป็ก</NavbarBrand>
                        <Nav>
                            <NavItem>
                                <NavLink href="/tickets">ค้นหา</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                        <Route path="/" exact component={Reservation}></Route>
                        <Route path="/tickets" component={Get}></Route>
                </div>

        );
    }
}