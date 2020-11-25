import AdminService from "../../services/admin.service";
import { useState, useEffect } from "react";
import { Table } from "antd";

const ServiceContent = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    AdminService.getServiceAll().then(
      (response) => {
        const service = response.data.data;
        let result = [];
        service.forEach((data) => {
          let temp = {
            name: data.name,
            duration: data.duration / 60 + " hour(s)",
          };
          result.push(temp);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return <Table dataSource={content} columns={columns}></Table>;
};

export default ServiceContent;
