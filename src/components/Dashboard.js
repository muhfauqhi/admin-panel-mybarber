import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import UserContent from './menu/Users/User.Content';
import ServiceContent from './menu/Services/Service.Content';
import BarberContent from './menu/Barbers/Barber.Content';
import Navigation from './Navigation';
import HeaderNav from './HeaderNav';
import { Content, Footer } from 'antd/lib/layout/layout';
import BookingContent from './menu/Bookings/Booking.Content';

class Dashboard extends React.Component {
  state = {
    current: 'Dashboard',
  };

  render() {
    return (
      <Layout>
        <HeaderNav />
        <Layout>
          <Navigation current={this.state.current} />
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                <BookingContent pagination={{ pageSize: 5 }} />
                <BarberContent pagination={{ pageSize: 5 }} />
                <ServiceContent pagination={{ pageSize: 5 }} />
                <UserContent pagination={{ pageSize: 5 }} />
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

export default Dashboard;
