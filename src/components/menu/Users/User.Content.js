import React from 'react';
import { Button, Dropdown, Menu, Space, Table } from 'antd';
import AdminService from '../../../services/admin.service';
import moment from 'moment';

const filterRoles = [
  { text: 'Admin', value: 'Admin' },
  { text: 'Customer', value: 'Customer' },
];

const menu = (id) => {
  return (
    <Menu>
      <Menu.Item
        onClick={() => {
          AdminService.updateUserRole(id, 'Admin').then((res) => {
          })
        }}>
        <a href=''>Admin</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          AdminService.updateUserRole(id, 'Customer').then((res) => {
          })
        }}>
        <a href=''>Customer</a>
      </Menu.Item>
    </Menu >
  )
};

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
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size='middle' >
        <Dropdown
          trigger={['click']}
          overlay={menu(record.id)}
        >
          <Button
            type='primary'>
            Edit
                </Button>
        </Dropdown>
        <Button href='/user' onClick={() => deleteUser(record.id)} type='danger'>Delete</Button>
      </Space >
    )
  }
];

function deleteUser(id) {
  AdminService.deleteUser(id).then((res) => {
    console.log(res);
  });
}

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
            id: data._id,
            username: data.username,
            fullname: data.fullname,
            email: data.email,
            role: data.role,
            phone: data.phone,
            createdAt: moment(data.createdAt).format('MMMM DD YYYY'),
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
        tableLayout='fixed'
        pagination={this.props.pagination}
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={columns}
        onChange={this.handleTableChange}
      ></Table>
    );
  }
}

export default UserContent;
