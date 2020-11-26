import React from "react";
import { Table } from "antd";
import AdminService from "../../services/admin.service";
import moment from "moment";
import Dashboard from "../../components/Dashboard";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Full Name",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Join Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

class UserContent extends React.Component {
  state = {
    data: [],
    loading: true,
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
            createdAt: moment(data.createdAt).format("MMMM DD YYYY hh:mm:ss A"),
          };
          result.push(temp);
        });
        this.setState({
          data: result,
          loading: false,
        });
      }),
      (error) => {}
    );
  }

  render() {
    return (
      <Table
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={columns}
      ></Table>
    );
    // return <Dashboard />;
  }
}

export default UserContent;
