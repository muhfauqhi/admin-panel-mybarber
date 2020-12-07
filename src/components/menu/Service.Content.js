import AdminService from '../../services/admin.service';
import React from 'react';
import { Table } from 'antd';

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
];

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
