import { Menu, Layout } from "antd";
import React from "react";

const { Sider } = Layout;

class Navigation extends React.Component {
  state = {
    redirect: false,
  };

  render() {
    return (
      <Sider style={{ background: "white" }}>
        <Menu
          defaultSelectedKeys={["Dashboard"]}
          selectedKeys={this.props.current}
          mode="inline"
        >
          <Menu.Item key="Dashboard">
            <a href="/dashboard">Dashboard</a>
          </Menu.Item>
          <Menu.Item key="Booking">
            <a href="/booking">Booking</a>
          </Menu.Item>
          <Menu.Item key="User">
            <a href="/user">User</a>
          </Menu.Item>
          <Menu.Item key="Barber">
            <a href="/barber">Barber</a>
          </Menu.Item>
          <Menu.Item key="Service">
            <a href="/service">Service</a>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Navigation;
