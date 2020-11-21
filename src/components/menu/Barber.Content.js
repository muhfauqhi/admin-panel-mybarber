import { useEffect, useState } from "react";
import { Table } from "antd";
import AdminService from "../../services/admin.service";

const BarberContent = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    AdminService.getBarberAll().then(
      (response) => {
        setContent(response.data);
        const barber = response.data;
        console.log(barber);
        const barberModel = {
          name: barber.name,
          rate: barber.rate,
          description: barber.description,
          workingDays: [barber.workingDays],
        };
        // console.log(barberModel);
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
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Service",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
    },
  ];
  return <Table dataSource={content.data} columns={columns}></Table>;
};

export default BarberContent;
