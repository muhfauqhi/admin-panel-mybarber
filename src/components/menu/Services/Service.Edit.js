import { Breadcrumb, Button, Form, Input, InputNumber, Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminService from '../../../services/admin.service';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';

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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};


class ServiceEdit extends React.Component {
    state = {
        current: 'Edit Service',
        redirect: false,
    };

    onFinish = (values) => {
        AdminService.updateService(this.props.match.params.id, values).then((res) => {
            this.setState({
                redirect: true,
            });
        });
    }

    render() {
        let { current, redirect } = this.state;
        const props = this.props.location.state;
        if (redirect)
            return <Redirect to='/service' />
        return (
            <Layout>
                <HeaderNav />
                <Layout>
                    <Navigation current={current} />
                    <Layout>
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item href='/dashboard'>Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href='/service'>Service</Breadcrumb.Item>
                                <Breadcrumb.Item>{current}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                                <Form
                                    {...formItemLayout}
                                    name='Edit Service'
                                    hideRequiredMark
                                    scrollToFirstError
                                    onFinish={this.onFinish}
                                    initialValues={{
                                        name: props.name,
                                        duration: props.duration,
                                    }}
                                >
                                    <Form.Item
                                        name='name'
                                        label='Name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter service name'
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Please input service name' />
                                    </Form.Item>
                                    <Form.Item
                                        name='duration'
                                        label='Duration'
                                        rules={[
                                            {
                                                type: 'number',
                                                required: true,
                                                message: 'Please enter duration'
                                            }
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            placeholder='Please input duration (minutes)'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...tailFormItemLayout}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Save Service
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design Layout example create by muhfauqhi
                        </Footer>
                    </Layout>
                </Layout>
            </Layout >
        )
    }
}

export default ServiceEdit;