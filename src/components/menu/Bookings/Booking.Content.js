import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import AdminService from '../../../services/admin.service';
import { useHistory } from 'react-router-dom';

function tagColor(status) {
    switch (status) {
        case 'Finished': return 'green';
        case 'Pending': return 'yellow';
        case 'Booked': return 'blue';
        case 'On Process': return 'geekblue';
    }
}

function deleteBooking(id) {
    AdminService.deleteBooking(id).then((res) => {
    });
}

const filterStatus = [
    { text: 'Finished', value: 'Finished' },
    { text: 'Pending', value: 'Pending' },
    { text: 'Booked', value: 'Booked' },
    { text: 'On Process', value: 'On Process' },
];

const columns = [
    {
        title: 'Booking ID',
        dataIndex: 'bookingId',
        key: 'bookingId',
        render: (text, record) => <a href={'booking/' + record._id}>{text.toUpperCase()}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: filterStatus,
        onFilter: (value, record) => {
            return record.status.includes(value);
        },
        render: (text) => <Tag color={tagColor(text)}>{text}</Tag>,
        editable: true,
    },
    {
        title: 'Barber',
        dataIndex: 'barber',
        key: 'barber',
        render: (_, record) =>
            <a href={'barber/' + record.barber._id}>
                {record.barber.name}
            </a>
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (_, record) => record.user.fullname,
    },
    {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
        render: (_, record) => record.service.name,
    },
    {
        title: 'Booking Date',
        dataIndex: 'bookDate',
        key: 'bookDate',
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Updated',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
    {
        title: 'Action',
        key: 'action',
        render: (record) => (
            <Space size='middle' >
                {/* <EditBooking record={record} /> */}
                <Button
                    href='/booking'
                    onClick={() => deleteBooking(record._id)}
                    type='danger'
                >
                    Delete
              </Button>
            </Space >
        )
    }
];

function EditBooking(props) {
    let history = useHistory();

    function handleClick() {
        history.push({
            pathname: '/booking/edit/' + props.record.id,
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

class BookingContent extends React.Component {
    state = {
        data: [],
        loading: true,
        filteredInfo: null,
    }

    componentDidMount() {
        fetch(
            AdminService.getBookingAll().then((res) => {
                const booking = res.data.data;
                this.setState({
                    data: booking,
                    loading: false,
                });
            })
        );
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
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

export default BookingContent;