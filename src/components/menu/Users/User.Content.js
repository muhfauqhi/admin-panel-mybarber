import React from 'react';
import { Table } from 'antd';
import AdminService from '../../../services/admin.service';
import moment from 'moment';

const filterRoles = [
  { text: 'Admin', value: 'Admin' },
  { text: 'Customer', value: 'Customer' },
];

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: filterRoles,
    onFilter: (value, record) => {
      return record.role.includes(value);
    },
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Join Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

class UserContent extends React.Component {
  state = {
    data: [],
    loading: true,
    filteredInfo: null,
  };

  componentDidMount() {
    fetch(
      AdminService.getUserAll().then((response) => {
        const user = response.data.data;
        let result = [];
        user.forEach((data) => {
          let temp = {
            username: data.username,
            fullname: data.fullname,
            email: data.email,
            role: data.role,
            phone: data.phone,
            createdAt: moment(data.createdAt).format('MMMM DD YYYY hh:mm:ss A'),
          };
          result.push(temp);
        });
        this.setState({
          data: result,
          loading: false,
        });
      }),
      (error) => { }
    );
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
    });
  };

  render() {
    return (
      <Table
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={columns}
        onChange={this.handleTableChange}
      ></Table>
    );
  }
}

export default UserContent;