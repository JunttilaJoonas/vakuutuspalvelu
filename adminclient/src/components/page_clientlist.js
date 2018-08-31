import React, { Component } from 'react'
import { Table, Row, Col, Image, Button } from 'react-bootstrap';
import { fetchUsers } from '../actions';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return _.map(this.props.users, user => {
            return (
                <tr key={user._id}>
                <td><Link to={`/customer/${user._id}`}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                </Link></td>
                </tr>
            );
        });
    }

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

function mapStateToProps(state) {
    return {users: state.users};
}

export default connect(mapStateToProps, { fetchUsers })(ClientList);
