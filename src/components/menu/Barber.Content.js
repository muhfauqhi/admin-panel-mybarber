import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import AdminService from "../../services/admin.service";

const BarberContent = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    AdminService.getBarberAll().then(
      (response) => {
        const barber = response.data.data;
        let result = [];
        barber.forEach((data) => {
          let temp = {
            name: data.name,
            rate: data.rate,
            description: data.description,
            service: [],
            workingDays: [],
          };
          let tempService = [];
          let tempWorkingDays = [];
          data.service_id.forEach((service) => {
            tempService.push(service.name);
          });
          data.workingDays.forEach((days) => {
            if (days === 1) tempWorkingDays.push("Monday");
            else if (days === 2) tempWorkingDays.push("Tuesday");
            else if (days === 3) tempWorkingDays.push("Wednesday");
            else if (days === 4) tempWorkingDays.push("Thursday");
            else if (days === 5) tempWorkingDays.push("Friday");
            else if (days === 6) tempWorkingDays.push("Saturday");
            else if (days === 7) tempWorkingDays.push("Sunday");
          });
          temp.service = tempService;
          temp.workingDays = tempWorkingDays;
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
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      render: (workingDays) => (
        <>
          {workingDays.map((workingDays) => {
            return (
              <Tag color="blue" key={workingDays}>
                {workingDays}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Service",
      key: "service",
      dataIndex: "service",
      render: (service) => (
        <>
          {service.map((service) => {
            return (
              <Tag color="green" key={service}>
                {service.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  return <Table dataSource={content} columns={columns}></Table>;
};

export default BarberContent;
