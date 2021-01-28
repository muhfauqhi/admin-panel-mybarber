import { Breadcrumb, Button, Form, Input, InputNumber, Layout, Select, Tag } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminService from '../../../services/admin.service';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';

const { Option } = Select;
const { TextArea } = Input;

function tagRenderService(props) {
    const { label, closable, onClose } = props;

    return (
        <Tag color='green' closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label.toUpperCase()}
        </Tag>
    );
}

function tagRenderWorkingDays(props) {
    const { label, closable, onClose } = props;

    return (
        <Tag color='blue' closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label}
        </Tag>
    );
}

const weekDays = [
    {
        id: 1,
        value: 'Monday'
    },
    {
        id: 2,
        value: 'Tuesday'
    },
    {
        id: 3,
        value: 'Wednesday'
    },
    {
        id: 4,
        value: 'Thursday'
    },
    {
        id: 5,
        value: 'Friday'
    },
    {
        id: 6,
        value: 'Saturday'
    },
    {
        id: 7,
        value: 'Sunday'
    }
];


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
            span: 12,
            offset: 4,
        },
        sm: {
            span: 24,
            offset: 4,
        },
    },
};

class BarberAdd extends React.Component {
    state = {
        current: 'Add Barber',
        serviceList: [],
        redirect: false,
        // image: ''
    };

    componentDidMount() {
        fetch(
            AdminService.getServiceAll().then((res) => {
                const data = res.data.data;
                let result = [];
                data.forEach((tempService) => {
                    let temp = {
                        id: tempService._id,
                        serviceName: tempService.name
                    };
                    result.push(temp);
                });
                this.setState({
                    serviceList: result
                });
            })
        );
    }

    onFinish = (values) => {
        AdminService.addBarber(values).then((res) => {
            this.setState({ redirect: true });
        });
    }

    render() {
        let { current, serviceList, redirect, } = this.state;
        if (redirect)
            return <Redirect to='/barber' />
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
                                        name='workingDays'
                                        label='Working Days'
                                        rules={[
                                            {
                                                type: 'array',
                                                required: true,
                                                message: 'Please select working days'
                                            }
                                        ]}
                                    >
                                        <Select
                                            allowClear
                                            placeholder='Please select working days'
                                            mode='multiple'
                                            tagRender={tagRenderWorkingDays}
                                        >
                                            {weekDays.map(d => (
                                                <Option key={d.id} value={d.id}>{d.value}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name='serviceId'
                                        label='Service List'
                                        rules={[
                                            {
                                                type: 'array',
                                                required: true,
                                                message: 'Please select services'
                                            }
                                        ]}>
                                        <Select
                                            allowClear
                                            placeholder='Please select services'
                                            mode='multiple'
                                            tagRender={tagRenderService}
                                        >
                                            {serviceList.map(d => (
                                                <Option key={d.id} value={d.id}>{d.serviceName}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {/* <Form.Item {...tailFormItemLayout}>
                                        <Upload
                                            action={AdminService.}
                                            fileList={image}
                                            showUploadList={true}
                                            beforeUpload={(file) => {
                                                const isPng = file.type === 'image/png'
                                                if (!isPng) {
                                                    message.error('You can only upload png file');
                                                    return false;
                                                }
                                                else {
                                                    return true;
                                                }
                                            }}
                                        >
                                            <Button icon={<UploadOutlined />}></Button>
                                        </Upload>
                                    </Form.Item> */}
                                    <Form.Item
                                        {...tailFormItemLayout}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Add Barber
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
            </Layout>
        )
    }
}

export default BarberAdd;