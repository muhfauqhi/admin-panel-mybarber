import { Breadcrumb, Layout, Button, } from 'antd';
import React from 'react';
import HeaderNav from './HeaderNav';
import Navigation from './Navigation';
import { Content, Footer } from 'antd/lib/layout/layout';
import BarberContent from './menu/Barbers/Barber.Content';
import { PlusOutlined } from '@ant-design/icons';

class Barber extends React.Component {
  state = {
    current: 'Barber',
    visible: false,
    number: {
      value: 0, validateStatus: '',
    }
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
                <Breadcrumb.Item>{current}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                <BarberContent />
                <Button href='/addbarber'
                  // style={{ float: 'right' }} 
                  type='primary'>
                  <PlusOutlined />
                  Add New Barber
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
export default Barber;
