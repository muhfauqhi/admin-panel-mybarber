import { Breadcrumb, Layout, Form, Input, InputNumber } from 'antd';
import React from 'react';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import AdminService from '../../../services/admin.service';

class BarberEdit extends React.Component {
    state = {
        current: 'Edit Barber',
        data: {},
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(AdminService.getBarberById(id).then((res) => {
            const data = res.data.data;
            this.setState({ data: data });
        }));
    }

    render() {
        let { current, data } = this.state;
        console.log(data);
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
                                <Form hideRequiredMark scrollToFirstError name='Edit Barber'>
                                    <Form.Item
                                        name='name' label='Name' rules={[{
                                            required: true,
                                            message: 'Please input name'
                                        }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name='rate' label='Rate' rules={[{
                                            required: true,
                                            message: 'Please input rate'
                                        }]}>
                                        <InputNumber style={{ width: '100%' }} />
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
        );
    }
}

export default BarberEdit;
