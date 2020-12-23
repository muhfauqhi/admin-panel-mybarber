import { Breadcrumb, Layout, Form, Input, InputNumber, Tag, Button, Select, Upload } from 'antd';
import React from 'react';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import AdminService from '../../../services/admin.service';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

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

class BookingEdit extends React.Component {
    state = {
        current: 'Edit Booking',
    };

    componentDidMount() {
        // fetch(
        //     AdminService.getBook().then((res) => {
        //         const data = res.data.data;
        //         let result = [];
        //         data.forEach((tempService) => {
        //             let temp = {
        //                 id: tempService._id,
        //                 serviceName: tempService.name
        //             };
        //             result.push(temp);
        //         });
        //         this.setState({
        //             serviceList: result
        //         });
        //     })
        // );
    }

    render() {
        let { current } = this.state;
        return (
            <Layout>
                <HeaderNav />
                <Layout>
                    <Navigation current={current} />
                    <Layout>
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item href='/dashboard'>Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href='/barber'>Barber</Breadcrumb.Item>
                                <Breadcrumb.Item>{current}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                                <Form
                                    {...formItemLayout}
                                    name='Add Barber'
                                    hideRequiredMark
                                    scrollToFirstError
                                    onFinish={this.onFinish}
                                // initialValues={{
                                //     name: props.name,
                                //     rate: props.rate,
                                //     description: props.description,
                                //     workingDays: props.workingDays,
                                //     serviceId: props.service
                                // }}
                                >
                                    <Form.Item
                                        name='name'
                                        label='Name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter name'
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Please input name' />
                                    </Form.Item>
                                    <Form.Item
                                        name='rate'
                                        label='Rate'
                                        rules={[
                                            {
                                                type: 'number',
                                                required: true,
                                                message: 'Please enter rate'
                                            }
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            placeholder='Please input rate'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='description'
                                        label='Description'
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please enter description'
                                            }
                                        ]}
                                    >
                                        <TextArea
                                            placeholder='Please input description'
                                            rows={4}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...tailFormItemLayout}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Save Barber
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
        );
    }
}

export default BookingEdit;