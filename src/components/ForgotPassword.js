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
import AuthService from "../services/auth.service";

class ForgotPassword extends React.Component {
  state = {
    message: "",
    error: "",
  };
  onFinish = (data) => {
    AuthService.forgotPassword(data).then((res) => {
      const message = res.message;
      if (res.status) {
        this.setState({ message: message });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 3000);
      } else {
        this.setState({ error: message });
      }
    });
  };

  onValuesChange = () => {
    this.setState({ error: "", message: "" });
  };

  render() {
    return (
      <Layout style={{ background: "#efefef" }}>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col>
            <Card style={{ width: "50vh" }}>
              <h1 style={{ textAlign: "center", fontSize: 35 }}>
                Forgot Password
              </h1>
              <h4 style={{ textAlign: "center", color: "grey" }}>
                Enter your email to reset your password
              </h4>
              <Divider></Divider>
              <Form
                onValuesChange={this.onValuesChange}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Reset password
                  </Button>
                </Form.Item>
                <Form.Item>
                  {this.state.message && (
                    <Alert
                      style={{ textAlign: "center" }}
                      message={this.state.message}
                      type="success"
                      banner
                    />
                  )}
                  {this.state.error && (
                    <Alert
                      style={{ textAlign: "center" }}
                      message={this.state.error}
                      type="error"
                      banner
                    />
                  )}
                </Form.Item>
                <Divider></Divider>
                <Form.Item style={{ textAlign: "center" }}>
                  Back to <a href="/">Sign in</a> or <a href="/">Sign up</a>{" "}
                  page
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default ForgotPassword;
