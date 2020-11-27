import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

class HeaderNav extends React.Component {
  state = {
    redirect: false,
    token: localStorage.getItem("token"),
  };

  onClick = () => {
    AuthService.logout();
    this.setState({
      token: null,
      redirect: true,
    });
  };

  componentDidMount() {}

  render() {
    if (!this.state.token) {
      return <Redirect to="/" />;
    }
    return (
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
    );
  }
}

export default HeaderNav;
