import { useEffect, useState } from "react";
import { Table } from "antd";
import AdminService from "../../services/admin.service";

const UserContent = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    AdminService.getUserAll().then(
      (response) => {
        setContent(response.data);
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
    // {
    //   title: "Join Date",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    // },
  ];
  // console.log(content.data);
  return <Table dataSource={content.data} columns={columns}></Table>;
};

export default UserContent;
