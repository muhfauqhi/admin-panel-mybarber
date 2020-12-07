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
} from 'antd';
import React from 'react';
import AuthService from '../services/auth.service';

class ResetPassword extends React.Component {
  state = {
    message: '',
    error: '',
  };

  onFinish = (value) => {
    const token = this.props.match.params.token;
    const password = value.password;
    AuthService.resetPassword(password, token).then((res) => {
      const message = res.message;
      if (res.status) {
        this.setState({ message: message });
        setTimeout(() => {
          this.setState({
            message: '',
          });
        }, 3000);
      } else {
        this.setState({ error: message });
      }
    });
  };

  render() {
    return (
      <Layout style={{ background: '#efefef' }}>
        <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
          <Col>
            <Card style={{ width: '50vh' }}>
              <h1 style={{ textAlign: 'center', fontSize: 35 }}>
                Reset Password
              </h1>
              <h4 style={{ textAlign: 'center', color: 'grey' }}>
                Enter your new password
              </h4>
              <Divider></Divider>
              <Form onFinish={this.onFinish}>
                <Form.Item
                  name='password'
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder='Password' />
                </Form.Item>
                <Form.Item
                  name='confirm'
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'The two passwords that you entered do not match!'
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='Confirm Password' />
                </Form.Item>

                <Form.Item>
                  <Button block type='primary' htmlType='submit'>
                    Save New password
                  </Button>
                </Form.Item>
                <Form.Item>
                  {this.state.message && (
                    <Alert
                      style={{ textAlign: 'center' }}
                      message={this.state.message}
                      type='success'
                      banner
                    />
                  )}
                  {this.state.error && (
                    <Alert
                      style={{ textAlign: 'center' }}
                      message={this.state.error}
                      type='error'
                      banner
                    />
                  )}
                </Form.Item>
                <Divider></Divider>
                <Form.Item style={{ textAlign: 'center' }}>
                  Back to <a href='/'>Sign in</a> or <a href='/'>Sign up</a>{' '}
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

export default ResetPassword;
