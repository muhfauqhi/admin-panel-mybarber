import { Breadcrumb, Layout, Form, Input, Select, Button, Tooltip, Cascader } from 'antd';
import React from 'react';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import AdminService from '../../../services/admin.service';
import { Redirect } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const role = [
    {
        value: 'Admin',
        label: 'Admin',
    },
    {
        value: 'Customer',
        label: 'Customer',
    },
];

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="+62">+62</Option>
        </Select>
    </Form.Item>
);

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class UserAdd extends React.Component {
    state = {
        current: 'Add User',
        redirect: false,
    };

    onFinish = (values) => {
        let temp = {
            username: values.username,
            fullname: values.fullname,
            password: values.password,
            email: values.email,
            phone: "+62" + values.phone,
            role: values.role[0],
        };
        AdminService.createUser(temp).then((res) => {
            this.setState({ redirect: true });
        });
    };

    render() {
        let { current, redirect } = this.state;

        if (redirect)
            return <Redirect to='/user' />
        return (
            <Layout>
                <HeaderNav />
                <Layout>
                    <Navigation current={current} />
                    <Layout>
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item href='/dashboard'>Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href='/user'>User</Breadcrumb.Item>
                                <Breadcrumb.Item>{current}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                                <Form
                                    {...formItemLayout}
                                    name="add user"
                                    onFinish={this.onFinish}
                                    initialValues={{
                                        role: ['Admin'],
                                        prefix: '62',
                                    }}
                                    hideRequiredMark
                                    scrollToFirstError>

                                    <Form.Item
                                        name="email"
                                        label="E-mail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input E-mail',
                                            },
                                        ]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="fullname"
                                        label="Full name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input full name',
                                            },
                                        ]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input password',
                                            },
                                        ]}
                                        hasFeedback>
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('The two passwords that you entered do not match');
                                                },
                                            }),
                                        ]}>
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        name="username"
                                        label={
                                            <span>
                                                Username&nbsp;
                                                <Tooltip title="This is your unique name">
                                                    <QuestionCircleOutlined />
                                                </Tooltip>
                                            </span>
                                        }
                                        rules={[{ required: true, message: 'Please input username', whitespace: true }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="role"
                                        label="Role"
                                        rules={[
                                            { type: 'array', required: true, message: 'Please select role' },
                                        ]}>
                                        <Cascader options={role} />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design Layout example create by muhfauqhi
                        </Footer>
                    </Layout>
                </Layout >
            </Layout >
        )
    }
}

export default UserAdd;