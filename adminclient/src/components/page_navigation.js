import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';


class PageNavigation extends Component {

    render() {

        return (
            
            <Navbar fluid collapseOnSelect className="nav_custom">
            <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Vakuutushallinta</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
            </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                            Etusivu
                        </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/" to="/addinsurance">
                            Add insurance
                        </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/" to="/createmessage">
                            Add message
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

// Navbar.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// }

// const mapStateToProps  = (state) => ({
//     auth: state.auth
// });

// export default connect(mapStateToProps, { logoutUser })(PageNavigation)

export default PageNavigation