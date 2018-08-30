import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar, MenuItem, NavDropdown, NavItem, Grid} from 'react-bootstrap';


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