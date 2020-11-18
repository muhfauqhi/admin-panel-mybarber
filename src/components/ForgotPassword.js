import { Alert, Button, Card, Col, Divider, Input, Row, Form } from "antd";
import Layout from "antd/lib/layout/layout";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onFinish = (data) => {
    axios
      .put("http://localhost:3000/api/forgotpassword", data)
      .then((res) => {
        const message = res.data.message;
        setMessage(message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => {
        const error = err.response.data.message;
        setError(error);
      });
  };

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
            <Form onFinish={onFinish}>
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
                {message && (
                  <Alert
                    style={{ textAlign: "center" }}
                    message={message}
                    type="success"
                    banner
                  />
                )}
                {error && (
                  <Alert
                    style={{ textAlign: "center" }}
                    message={error}
                    type="error"
                    banner
                  />
                )}
              </Form.Item>
              <Divider></Divider>
              <Form.Item style={{ textAlign: "center" }}>
                Back to <a href="/">Sign in</a> or <a href="/">Sign up</a> page
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default ForgotPassword;
