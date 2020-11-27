import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Card,
  Divider,
  Alert,
  Layout,
} from "antd";
import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

class Login extends React.Component {
  state = {
    redirect: false,
    token: localStorage.getItem("token"),
    error: "",
  };

  onFinish = (data) => {
    AuthService.login(data).then((res) => {
      if (res.status === 200) {
        const token = res.data.token;
        AuthService.checkUser(token).then((result) => {
          if (result === "Unauthorized") {
            this.setState({ error: result });
          } else {
            localStorage.setItem("token", token);
            this.setState({ redirect: true, token: token });
          }
        });
      } else {
        const error = res.data.message;
        this.setState({ error: error });
      }
    });
  };

  render() {
    if (this.state.token && localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout style={{ background: "#efefef" }}>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col>
            <Card style={{ width: "50vh" }}>
              <h1 style={{ textAlign: "center", fontSize: 35 }}>Sign In</h1>
              <Divider></Divider>
              <Form onFinish={this.onFinish}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username or email!",
                    },
                  ]}
                >
                  <Input placeholder="Username or Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: "right" }}>
                  <a href="/forgotpassword">Forgot password</a>
                </Form.Item>

                <Form.Item>
                  {this.state.error && (
                    <Alert
                      style={{ textAlign: "center" }}
                      message={this.state.error}
                      type="error"
                      banner
                    />
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Login;
