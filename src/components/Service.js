import { Breadcrumb, Layout, Button } from 'antd';
import React from 'react';
import HeaderNav from './HeaderNav';
import Navigation from './Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import ServiceContent from './menu/Services/Service.Content';
import { PlusOutlined } from '@ant-design/icons';

class Service extends React.Component {
  state = {
    current: 'Service',
  };
  render() {
    let { current } = this.state;
    return (
      <Layout>
        <HeaderNav />
        <Layout>
          <Navigation current={this.state.current} />
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item href='/dashboard'>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>{current}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                <ServiceContent />
                <Button href='/service/add'
                  // style={{ float: 'right' }} 
                  type='primary'>
                  <PlusOutlined />
                  Add New Service
                </Button>
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
export default Service;
