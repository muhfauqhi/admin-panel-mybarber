import { Menu, Layout, Button } from 'antd';
import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, TeamOutlined, DashboardOutlined, CustomerServiceOutlined } from '@ant-design/icons'

const { Sider } = Layout;

class Navigation extends React.Component {
  state = {
    redirect: false,
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let { collapsed } = this.state;
    return (
      <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={this.toggleCollapsed} theme='light'>
        <Button type='primary' onClick={this.toggleCollapsed} style={{ margin: 10 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['Dashboard']}
          selectedKeys={this.props.current}
          mode='inline'
        >
          <Menu.Item icon={<DashboardOutlined />} key='Dashboard'>
            <a href='/dashboard'>Dashboard</a>
          </Menu.Item>
          {/* <Menu.Item key='Booking'>
            <a href='/booking'>Booking</a>
          </Menu.Item> */}
          <Menu.Item icon={<UserOutlined />} key='User'>
            <a href='/user'>User</a>
          </Menu.Item>
          <Menu.Item icon={<CustomerServiceOutlined />} key='Service'>
            <a href='/service'>Service</a>
          </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key='Barber'>
            <a href='/barber'>Barber</a>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Navigation;
