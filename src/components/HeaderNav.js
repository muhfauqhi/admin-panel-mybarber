import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, notification, Badge, Row, Col } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/auth.service';
import io from 'socket.io-client';
import AdminService from '../services/admin.service';

const openNotification = () => {
  const close = () => {
    const socket = io('http://localhost:3000');
    socket.emit('close booking', 'test');
  };

  const onClick = () => {
    const socket = io('http://localhost:3000');
    socket.on('booking', data => {
      console.log(data);
    });
  }
  const args = {
    message: 'New Booking',
    description:
      '',
    duration: 3,
    onClose: close,
    onClick
  };
  notification.info(args);
};

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io('http://localhost:3000');
  }
  state = {
    redirect: false,
    token: localStorage.getItem('token'),
    count: 0,
  };

  onClick = () => {
    AuthService.logout();
    this.setState({
      token: null,
      redirect: true,
    });
  };

  componentDidMount() {
    var count = 1;
    this.socket.on('booking', data => {
      openNotification();
      this.setState({
        count: count++,
      })
    });
    if (count === 1) {
      fetch(AdminService.getBookingAll().then((res) => {
        const data = res.data.data;
        if (data.length < 1) return;
        else {
          data.forEach(element => {
            if (element.status === 'Pending') {
              this.setState({
                count: count++,
              });
            }
          });
        }
      }));
    }
  }

  render() {
    if (!this.state.token) {
      return <Redirect to='/' />;
    }
    return (

      <Header>
        <Row>
          <Col span={23}>
            <Title style={{ color: 'white', padding: 10 }}>MyBarber</Title>
          </Col>
          <Col span={1}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Button
                      type='text'
                      onClick={this.onClick}
                    >
                      Logout
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <a href='/booking'>
                <Badge
                  count={this.state.count}
                  overflowCount={10}
                >
                  <Avatar
                    icon={
                      <UserOutlined />
                    }>
                  </Avatar>
                </Badge>
              </a>
            </Dropdown>
          </Col>
        </Row >
      </Header >
    );
  }
}

export default HeaderNav;
