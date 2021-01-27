import React from 'react';
import { Button, Dropdown, Menu, Space, Table, Tag } from 'antd';
import AdminService from '../../../services/admin.service';
import moment from 'moment';

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
        render: (_, record) => <Tag color='green'>{record.service[0].name.toUpperCase()}</Tag>,
    },
    {
        title: 'Booking Date',
        dataIndex: 'bookDate',
        key: 'bookDate',
        render: (_, record) => moment(record.bookDate).format('MMMM DD YYYY hh:mm:ss A'),

    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (_, record) => moment(record.createdAt).format('MMMM DD YYYY hh:mm:ss A'),
    },
    {
        title: 'Updated',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (_, record) => moment(record.updatedAt).format('MMMM DD YYYY hh:mm:ss A'),

    },
    {
        title: 'Action',
        key: 'action',
        render: (record) => (
            <Space size='middle' >
                <Dropdown
                    trigger={['click']}
                    overlay={menu(record.status, record._id)}
                >
                    <Button
                        type='primary'>
                        Edit
                </Button>
                </Dropdown>
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

function checkStatus(status, buttonStatus, id) {
    if (buttonStatus === 'Pending') {
        if (status === 'Pending')
            return true;
        else if (status === 'On Process')
            return true;
        else if (status === 'Finished')
            return true;
        else
            return false;
    } else if (buttonStatus === 'Booked') {
        if (status === 'Booked')
            return true;
        else if (status === 'On Process')
            return true;
        else if (status === 'Finished')
            return true;
        else
            return false;
    } else if (buttonStatus === 'On Process') {
        if (status === 'On Process')
            return true;
        else if (status === 'Finished')
            return true;
        else
            return false;
    } else if (buttonStatus === 'Finished') {
        if (status === 'Finished')
            return true;
    }
}

const menu = (status, id) => {
    return (
        <Menu>
            <Menu.Item
                disabled={checkStatus(status, 'Pending', id)}
                onClick={() => {
                    AdminService.updateBookingStatus({ status: 'Pending' }, id).then((res) => {
                        console.log(res);
                    });
                }}
            >
                Pending
            </Menu.Item>
            <Menu.Item
                disabled={checkStatus(status, 'Booked')}
                onClick={() => {
                    AdminService.updateBookingStatus({ status: 'Booked' }, id).then((res) => {
                        console.log(res);
                    });
                }
                }
            >
                Booked
             </Menu.Item>
            <Menu.Item
                disabled={checkStatus(status, 'On Process')}
                onClick={() => {
                    AdminService.updateBookingStatus({ status: 'On Process' }, id).then((res) => {
                        console.log(res);
                    });
                }}
            >
                On Process
             </Menu.Item>
            <Menu.Item
                disabled={checkStatus(status, 'Finished')}
                onClick={() => {
                    AdminService.updateBookingStatus({ status: 'Finished' }, id).then((res) => {
                        console.log(res);
                    });
                }}
            >
                Finished
             </Menu.Item>
        </Menu >
    )
};

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
                console.log(booking);
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