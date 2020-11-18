import { Avatar, Breadcrumb, Layout, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
const { Content, Footer, Header, Sider } = Layout;

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/" />;
  }
  return (
    <Layout>
      <Header style={{ padding: 10 }}>
        <Avatar style={{ float: "right" }} icon={<UserOutlined />}></Avatar>
        <Title style={{ color: "white" }}>MyBarber</Title>
      </Header>
      <Layout>
        <Sider style={{ background: "white" }}>
          <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
            <Menu.Item key="Dashboard">Dashboard</Menu.Item>
            <Menu.Item key="Booking">Booking</Menu.Item>
            <Menu.Item key="Barber">Barber</Menu.Item>
            <Menu.Item key="User">User</Menu.Item>
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
              Content
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
