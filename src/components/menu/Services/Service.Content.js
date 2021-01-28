import AdminService from '../../../services/admin.service';
import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useHistory } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) =>
      <a href={'service/' + record._id}>
        <Tag color='green'>
          {record.name.toUpperCase()}
        </Tag>
      </a>,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    render: (_, record) => record.duration / 60 + ' hour(s)'
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size='middle' >
        <EditService record={record} />
        <Button href='/service' onClick={() => deleteService(record._id)} type='danger'>Delete</Button>
      </Space >
    )
  }
];

function EditService(props) {
  let history = useHistory();

  function handleClick() {
    history.push({
      pathname: '/service/edit/' + props.record._id,
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
        this.setState({
          data: service,
          loading: false,
        });
      }),
      (error) => { }
    );
  }

  render() {
    return (
      <Table
        tableLayout='fixed'
        pagination={this.props.pagination} q
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={columns}
      ></Table>
    );
  }
}

export default ServiceContent;
