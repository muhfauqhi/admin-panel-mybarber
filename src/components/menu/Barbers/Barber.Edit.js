import { Breadcrumb, Layout, Form, Input, InputNumber, Tag, Button, Select, Upload } from 'antd';
import React from 'react';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import AdminService from '../../../services/admin.service';
import { UploadOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';


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
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};


class BarberEdit extends React.Component {
    state = {
        current: 'Edit Barber',
        serviceList: [],
        redirect: false,
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

    fileList = () => {
        const imageName = this.props.image.substring(19, this.props.image.length);
        const urlImage = 'http://localhost:3000/' + imageName;
        if (imageName.length < 1) {
            return [];
        } else {
            return {
                uid: '1',
                name: imageName,
                status: 'done',
                url: urlImage,
            };
        }
    }

    onFinish = (values) => {
        AdminService.updateBarber(this.props.match.params.id, values).then((res) => {
            this.setState({
                redirect: true,
            });
        });
    }

    render() {
        let { current, serviceList, redirect } = this.state;
        const props = this.props.location.state;
        const imageName = props.image.substring(19, props.image.length);
        const urlImage = 'http://localhost:3000/' + imageName;

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
                                    initialValues={{
                                        name: props.name,
                                        rate: props.rate,
                                        description: props.description,
                                        workingDays: props.workingDays.map((workingDays) => workingDays.id),
                                        serviceId: props.service.map((service) => service.id)
                                    }}
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
                                    <Form.Item {...tailFormItemLayout}>
                                        <Upload
                                            multiple={false}
                                            listType='picture'
                                            defaultFileList={[
                                                {
                                                    uid: '1',
                                                    name: imageName,
                                                    status: 'done',
                                                    url: urlImage,
                                                    fileName: imageName,
                                                },
                                            ]}
                                            name='image'
                                            method='post'
                                            action={'http://localhost:3000/api/barber/upload/' + props.id}
                                            headers={{
                                                Authorization: localStorage.getItem('token')
                                            }}
                                        >
                                            <Button icon={<UploadOutlined />}>Upload Barber Image</Button>
                                        </Upload>
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

export default BarberEdit;
