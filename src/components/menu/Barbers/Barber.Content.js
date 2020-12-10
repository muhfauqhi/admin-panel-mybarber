import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import AdminService from '../../../services/admin.service';

const weekDays = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

let filterServices = [];

const filterWorkingDays = [
  { text: weekDays[1], value: weekDays[1] },
  { text: weekDays[2], value: weekDays[2] },
  { text: weekDays[3], value: weekDays[3] },
  { text: weekDays[4], value: weekDays[4] },
  { text: weekDays[5], value: weekDays[5] },
  { text: weekDays[6], value: weekDays[6] },
  { text: weekDays[7], value: weekDays[7] },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a href={'barber/' + record.id}>{text}</a>,
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Working Days',
    dataIndex: 'workingDays',
    key: 'workingDays',
    filters: filterWorkingDays,
    onFilter: (value, record) => {
      return record.workingDays.includes(value);
    },
    render: (workingDays) => (
      <>
        {workingDays.map((workingDays) => {
          return (
            <Tag color='blue' key={workingDays}>
              {workingDays}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Service',
    key: 'service',
    dataIndex: 'service',
    filters: filterServices,
    onFilter: (value, record) => {
      return record.service.includes(value);
    },
    render: (service) => (
      <>
        {service.map((service) => {
          return (
            <Tag color='green' key={service}>
              {service.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size='middle' >
        <Button href='/barber' onClick={() => deleteBarber(record.id)} type='danger'>Delete</Button>
      </Space >
    )
  }
];

function deleteBarber(id) {
  AdminService.deleteBarber(id).then((res) => {
    console.log(res);
  });
}

class BarberContent extends React.Component {
  state = {
    data: [],
    loading: true,
    filteredInfo: null,
  };

  componentDidMount() {
    fetch(
      AdminService.getBarberAll().then((res) => {
        const barber = res.data.data;
        let result = [];
        barber.forEach((data) => {
          let temp = {
            id: data._id,
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
        if (filterServices.length < 1) this.setFilterService();

      }),
      (error) => { }
    );
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
    });
  };

  setFilterService = () => {
    let tempService = [];
    this.state.data.forEach((e) => {
      e.service.forEach((service) => {
        if (tempService.length < 1) {
          tempService.push(service);
        }
        if (!tempService.includes(service)) {
          tempService.push(service);
        }
      });
    });
    tempService.forEach((e) => {
      let temp = {
        text: e,
        value: e,
      };
      filterServices.push(temp);
    });
  };

  render() {
    return (
      <Table
        title={() => <a href='/barber'>Barber</a>}
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={columns}
        onChange={this.handleTableChange}
      ></Table>
    );
  }
}

export default BarberContent;
