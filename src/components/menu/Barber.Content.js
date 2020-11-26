import React from "react";
import { Table, Tag } from "antd";
import AdminService from "../../services/admin.service";

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

const weekDays = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

class BarberContent extends React.Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    fetch(
      AdminService.getBarberAll().then((response) => {
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
            tempWorkingDays.push(weekDays[days]);
          });

          temp.service = tempService;
          temp.workingDays = tempWorkingDays;
          result.push(temp);
        });
        this.setState({ data: result, loading: false });
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
  }
}

export default BarberContent;
