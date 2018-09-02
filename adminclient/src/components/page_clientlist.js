import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { fetchAllUsers } from '../actions/index';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ClientList extends Component {


    componentDidMount() {
        this.props.fetchAllUsers();
        console.log(this.props);
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

const mapStateToProps = (state) => {
    console.log(state.users)
    return {
        users: state.users  
    };
};


export default connect(mapStateToProps, { fetchAllUsers })(ClientList);
