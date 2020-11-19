import {
  Avatar,
  Breadcrumb,
  Layout,
  Menu,
  Dropdown,
  Button,
  message,
} from "antd";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import UserContent from "./menu/User.Content";

const { Content, Footer, Header, Sider } = Layout;

const Dashboard = () => {
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/" />;
  }

  const onClick = () => {
    localStorage.removeItem("token");
    setRedirect(true);
  };

  var data = () => {
    axios
      .get("http://localhost:3000/api/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res) {
          var user = res.data.data;
          console.log(user);
          return user;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (token) {
    axios
      .get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: token,
        },
      })
      .catch((error) => {
        message.error(error.message, 3);
        setTimeout(() => {
          localStorage.removeItem("token");
          setRedirect(true);
        }, 3000);
      });
  }

  return (
    <Layout>
      {redirect && <Redirect to="/" />}
      <Header style={{ padding: 10 }}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Button type="text" onClick={onClick}>
                  Logout
                </Button>
                <Button type="text" onClick={data}>
                  data
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
          <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
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
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
              {/* Content */}
              {UserContent.apply()}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design Layout example create by muhfauqhi
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
