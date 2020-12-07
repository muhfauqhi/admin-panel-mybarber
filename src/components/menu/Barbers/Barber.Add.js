import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';

class BarberAdd extends React.Component {
    state = {
        current: 'Add Barber'
    };

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