import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import AdminService from '../../../services/admin.service';
import { useHistory } from 'react-router-dom';

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
    render: (name, record) => <a href={'barber/' + record.id}>{name}</a>,
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
      var flag = false;
      for (var i = 0; i < record.workingDays.length; i++) {
        if (value === record.workingDays[i].days) {
          flag = true;
        }
      }
      return flag;
    },
    render: (workingDays) => (
      <>
        {workingDays.map((workingDays) => {
          return (
            <Tag color='blue' key={workingDays}>
              {workingDays.days}
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
      var flag = false;
      for (var i = 0; i < record.service.length; i++) {
        if (value === record.service[i].id) {
          flag = true;
        }
      }
      return flag;
    },
    render: (service) => (
      <>
        {service.map((service) => {
          return (
            <Tag color='green' key={service.id}>
              {service.name.toUpperCase()}
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
        <EditBarber record={record} />
        <Button
          href='/barber'
          onClick={() => deleteBarber(record.id)}
          type='danger'
        >
          Delete
          </Button>
      </Space >
    )
  }
];

function EditBarber(props) {
  let history = useHistory();

  function handleClick() {
    history.push({
      pathname: '/barber/edit/' + props.record.id,
      state: props.record
    });
  }

  return (
    <Button
      onClick={handleClick}
      type='primary'
    >
      Edit
    </Button>
  )
}

function deleteBarber(id) {
  AdminService.deleteBarber(id).then((res) => {
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
            image: data.image,
          };
          let tempService = [];
          let tempWorkingDays = [];
          data.service_id.forEach((service) => {
            tempService.push({
              id: service._id,
              name: service.name,
            });
          });
          data.workingDays.forEach((days) => {
            tempWorkingDays.push({
              id: days,
              days: weekDays[days],
            });
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
        let temp = {
          text: service.name,
          value: service.id,
        };
        if (!tempService.includes(service.name)) {
          tempService.push(service.name);
          filterServices.push(temp);
        }
      });
    });
  };

  render() {
    let { data, loading, } = this.state;
    return (
      <Table
        tableLayout='fixed'
        pagination={this.props.pagination}
        loading={loading}
        dataSource={data}
        columns={columns}
        onChange={this.handleTableChange}
      ></Table>
    );
  }
}

export default BarberContent;
