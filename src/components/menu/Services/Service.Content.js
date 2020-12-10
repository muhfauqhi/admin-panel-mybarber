import AdminService from '../../../services/admin.service';
import React from 'react';
import { Button, Space, Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size='middle' >
        <Button href='/service' onClick={() => deleteService(record.id)} type='danger'>Delete</Button>
      </Space >
    )
  }
];

function deleteService(id) {
  AdminService.deleteService(id).then((res) => {
  });
}

class ServiceContent extends React.Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    fetch(
      AdminService.getServiceAll().then((response) => {
        const service = response.data.data;
        let result = [];
        service.forEach((data) => {
          let temp = {
            id: data._id,
            name: data.name,
            duration: data.duration / 60 + ' hour(s)',
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

export default ServiceContent;
