import {
  Form,
  Input,
  Button,
  //   Checkbox,
  Col,
  Row,
  //   Space,
  Card,
  Divider,
} from "antd";
import { Layout } from "antd";
// import Title from "antd/lib/typography/Title";
// const { Content, Header } = Layout;

const Login = () => {
  //   const onFinish = (values) => {
  //     console.log("Success:", values);
  //   };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <Layout style={{ background: "#efefef" }}>
      {/* <Header style={{ padding: 10 }}>
        <Title style={{ color: "white" }}>MyBarber</Title>
      </Header> */}
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card style={{ width: "50vh" }}>
            <h1 style={{ textAlign: "center", fontSize: 35 }}>Sign In</h1>
            <Divider></Divider>
            <Form>
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

              <Form.Item style={{ textAlign: "right" }}>
                <a href="/dashboard">Forgot password</a>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
