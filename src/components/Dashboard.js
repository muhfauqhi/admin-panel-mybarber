import {
  Avatar,
  Breadcrumb,
  Layout,
  Menu,
  Dropdown,
  Button,
  // message,
} from "antd";
import React from "react";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import UserContent from "./menu/User.Content";
import ServiceContent from "./menu/Service.Content";
import BarberContent from "./menu/Barber.Content";

const { Content, Footer, Header, Sider } = Layout;

class Dashboard extends React.Component {
  state = {
    current: "Dashboard",
    redirect: false,
    token: localStorage.getItem("token"),
  };

  handleClick = (e) => {
    console.log(this.state.current);
    this.setState({ current: e.key, redirect: true });
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  onClick = () => {
    localStorage.removeItem("token");
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.current.toLowerCase()} />;
    }
  };

  render() {
    if (!this.state.token) {
      return <Redirect to="/" />;
    }
    return (
      <Layout>
        {this.renderRedirect()}
        <Header style={{ padding: 10 }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button type="text" onClick={this.onClick}>
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar style={{ float: "right" }} icon={<UserOutlined />}></Avatar>
          </Dropdown>
          <Title style={{ color: "white" }}>MyBarber</Title>
        </Header>
        <Layout>
          <Sider style={{ background: "white" }}>
            <Menu
              onClick={this.handleClick}
              // defaultSelectedKeys={this.state.current}
              selectedKeys={this.state.current}
              mode="inline"
            >
              <Menu.Item key="Dashboard">Dashboard</Menu.Item>
              <Menu.Item key="Booking">Booking</Menu.Item>
              <Menu.Item key="User">User</Menu.Item>
              <Menu.Item key="Barber">Barber</Menu.Item>
              <Menu.Item key="Service">Service</Menu.Item>
              <SubMenu
                title={
                  <span>
                    <MailOutlined />
                    <span>About Us</span>
                  </span>
                }
              >
                <Menu.ItemGroup title="Country">
                  <Menu.Item key="location1">Location 1</Menu.Item>
                  <Menu.Item key="location2">Location 2</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
                {/* Content */}
                <UserContent />
                <BarberContent />
                <ServiceContent />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design Layout example create by muhfauqhi
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
