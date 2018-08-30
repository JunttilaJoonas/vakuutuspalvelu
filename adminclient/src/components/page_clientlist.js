import React, { Component } from 'react'
import { Table, Row, Col, Image, Button } from 'react-bootstrap';
import { fetchUsers } from '../actions';
import _ from 'lodash';
import { connect } from 'react-redux';

class ClientList extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return _.map(this.props.users, user => {
            return (
                <tr key={user._id}>
                <td>{user.nimi}</td>
                <td>{user.sähköposti}</td>
                </tr>
            );
        });
    }

  render() {
    return (
     
        <Table responsive>
        {this.renderUsers()}
        </Table>

    );
  }
}

function mapStateToProps(state) {
    return {users: state.users};
}

export default connect(mapStateToProps, { fetchUsers })(ClientList)
