import { Breadcrumb, Layout, Form, Col, Row, Input, Select, Button, InputNumber, Tag } from 'antd';
import React from 'react';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import AdminService from '../../../services/admin.service';
import { Redirect } from 'react-router-dom';

const { Option } = Select;

function tagRender(props) {
    const { label, closable, onClose } = props;

    return (
        <Tag color='green' closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label}
        </Tag>
    );
}

class UserAdd extends React.Component {
    state = {
        current: 'Add Service',
        barberSelect: [],
        redirect: false,
    };

    componentDidMount() {
        fetch(
            AdminService.getBarberAll().then((res) => {
                const barber = res.data.data;
                const data = barber.map(b => ({
                    id: b._id,
                    value: b.name,
                }));
                this.setState({
                    barberSelect: data,
                });
            }),
            (error) => { }
        );
    }

    onFinish = (data) => {
        const temp = {
            name: data.name,
            duration: data.duration,
        }
        AdminService.createService(temp).then((res) => {
            const result = res.data.data;
            if (!data.barber) {
                this.setState({ redirect: true });
            }
            else {
                data.barber.forEach((barber) => {
                    AdminService.putService(barber, { serviceId: result._id }).then((res) => {
                        this.setState({ redirect: true });
                    });
                });
            }
        });
    }

    render() {
        let { current, barberSelect, redirect } = this.state;
        if (redirect) {
            return <Redirect to='/service' />;
        }
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
                                <Form onFinish={this.onFinish} layout='vertical' hideRequiredMark>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name='name' label='Service Name'
                                                rules={[{ required: true, message: 'Please enter service name' }]}>
                                                <Input placeholder='Please enter service name' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name='duration'
                                                label='Service Duration'
                                                rules={[{ required: true, message: 'Please enter duration' }]}>
                                                <InputNumber style={{ width: '100%' }} placeholder='Please enter duration' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name='barber'
                                                label='Barber List'>
                                                <Select tagRender={tagRender} mode='multiple' placeholder='Please select barber'>
                                                    {barberSelect.map(d => (
                                                        <Option key={d.id}>{d.value}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name='description'
                                                label='Description'>
                                                <Input.TextArea rows={4} placeholder='Please enter description' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit'>Submit</Button>
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

export default UserAdd;