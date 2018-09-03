import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class PageNavigation extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/kirjaudu');
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        console.log(this.props);
        const guestLinks = (

            <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                            Etusivu
                        </NavItem>
                        <NavItem eventKey={5} componentClass={Link} href="/" to="/rekisteröidy">
                            Rekisteröidy
                        </NavItem>
                        <NavItem eventKey={6} componentClass={Link} href="/" to="/kirjaudu">
                            Kirjaudu
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>

        );

        const authLinks = (

            <Navbar.Collapse>
                <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                            Etusivu
                        </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/" to="/addinsurance">
                            Lisää vakuutus
                        </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/" to="/createmessage">
                            Lisää viesti
                        </NavItem>
                        <NavItem eventKey={4} componentClass={Link} href="/" to="/createprofile">
                            Lisää profiili
                        </NavItem>
                        <NavItem eventKey={5} componentClass={Link} href="/" to="/addinvoice">
                            Laskutus
                        </NavItem>
                        <NavItem eventKey={5} componentClass={Link} href="/" to="/chat">
                           Chatti
                        </NavItem>
                        <NavItem eventKey={4} componentClass={Link} href="#" to="#" onClick={this.onLogoutClick.bind(this)}>
                            Kirjaudu ulos
                        </NavItem>
                      
                </Nav>
            </Navbar.Collapse>
        );

        return (
            
            <Navbar fluid collapseOnSelect className="nav_custom">
            <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Vakuutushallinta</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
            </Navbar.Header>
            { isAuthenticated ? authLinks : guestLinks }
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

const mapStateToProps  = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(PageNavigation))