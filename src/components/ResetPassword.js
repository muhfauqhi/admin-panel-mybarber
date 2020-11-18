import { Alert, Button, Card, Col, Divider, Input, Row, Form } from "antd";
import Layout from "antd/lib/layout/layout";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const ResetPassword = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onFinish = (value) => {
    const token = props.match.params.token;
    const data = {
      password: value.password,
      token: token,
    };
    axios
      .put("http://localhost:3000/api/resetpassword", data)
      .then((res) => {
        const message = res.data.message;
        setMessage(message);
        setTimeout(() => {
          setMessage("");
          setRedirect(true);
        }, 3000);
      })
      .catch((err) => {
        const error = err.response.data.message;
        setError(error);
      });
  };
  return (
    <Layout style={{ background: "#efefef" }}>
      {redirect && <Redirect to="/" />}
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card style={{ width: "50vh" }}>
            <h1 style={{ textAlign: "center", fontSize: 35 }}>
              Reset Password
            </h1>
            <h4 style={{ textAlign: "center", color: "grey" }}>
              Enter your new password
            </h4>
            <Divider></Divider>
            <Form onFinish={onFinish}>
              <Form.Item
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Save New password
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

export default ResetPassword;
