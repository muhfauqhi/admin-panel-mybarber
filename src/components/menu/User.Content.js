import { useEffect, useState } from "react";
import { Table } from "antd";
import AdminService from "../../services/admin.service";
import moment from "moment";

const UserContent = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    AdminService.getUserAll().then(
      (response) => {
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
          console.log(temp);
        });
        setContent(result);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

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
  return <Table dataSource={content} columns={columns}></Table>;
};

export default UserContent;
