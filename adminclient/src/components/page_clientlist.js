import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { fetchAllUsers } from '../actions/index';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    /**
    * @desc This component renders list of customers in database
    */

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    // Renders Table row to use inside main render function.
    renderUsers() {
        return _.map(this.props.users, user => {
            return (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><Link to={`/customer/${user._id}`}>Lisätiedot</Link></td>
                </tr>
            );
        });
    }

    // Renders main Table and calls renderUser() to display users.
    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nimi</th>
                        <th>Sähköposti</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderUsers()}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps, { fetchAllUsers })(ClientList);
