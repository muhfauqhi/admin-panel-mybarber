import { Form, Input, Button, Col, Row, Card, Divider, Alert } from "antd";
import { Layout } from "antd";
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const onFinish = (data) => {
    axios
      .post("http://localhost:3000/api/login", data)
      .then((result) => {
        console.log(result.data.token);
        if (result) {
          const token = result.data.token;
          axios
            .get("http://localhost:3000/api/dashboard", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              const data = res.data.data;
              if (data.role !== "Admin") {
                setError("Unauthorized");
              } else {
                localStorage.setItem("token", token);
                setRedirect(true);
              }
            });
        }
      })
      .catch((err) => {
        const error = err.response.data.message;
        setError(error);
      });
  };

  return (
    <Layout style={{ background: "#efefef" }}>
      {redirect && <Redirect to="/dashboard" />}
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card style={{ width: "50vh" }}>
            <h1 style={{ textAlign: "center", fontSize: 35 }}>Sign In</h1>
            <Divider></Divider>
            <Form onFinish={onFinish}>
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
                {error && (
                  <Alert
                    style={{ textAlign: "center" }}
                    message={error}
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
};

export default Login;
