import { Breadcrumb, Button, Col, Descriptions, Image, Layout, Rate, Row, Tag } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AdminService from '../../../services/admin.service';
import HeaderNav from '../../HeaderNav';
import Navigation from '../../Navigation';

const weekDays = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

class BarberDetails extends React.Component {
  state = {
    current: 'Barber',
    data: {},
    workingDays: [],
    service: [],
    image: '',
    rating: 0
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(
      AdminService.getBarberById(id).then((res) => {
        const data = res.data.data;
        let image = '';
        if (data.image) {
          image =
            'http://localhost:3000/' +
            data.image.substring(19, data.image.length);
        }
        // let result = {
        //   id: data._id,
        //   name: data.name,
        //   rate: data.rate,
        //   description: data.description,
        //   service: [],
        //   workingDays: [],
        //   image: image,
        // };
        // let tempWorkingDays = [];
        // data.workingDays.forEach((days) => {
        //   tempWorkingDays.push(weekDays[days]);
        // });
        // let tempService = [];
        // data.service_id.forEach((service) => {
        //   tempService.push({
        //     id: service._id,
        //     name: service.name,
        //   });
        // });
        // result.service = tempService;
        // result.workingDays = tempWorkingDays;

        AdminService.getBookingAll().then((res) => {
          const booking = res.data.data;

          var rating = 0;
          var totalRating = 0;
          booking.map((book) => {
            if (book.barber._id == data._id &&
              book.status == 'Finished' &&
              book.rating > 0) {
              rating += book.rating;
              totalRating++;
            }
          })
          var finalRating = rating / totalRating;
          if (isNaN(finalRating)) {
            finalRating = 0;
          }
          this.setState({ data: data, service: data.service_id, workingDays: data.workingDays, image: image, rating: parseFloat(finalRating.toFixed(2)) });
        })
      })
    );
  }

  render() {
    var { data, service, workingDays, image, rating } = this.state;
    return (
      <Layout >
        <HeaderNav />
        <Layout>
          <Navigation current={this.state.current} />
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item href='/dashboard'>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href='/barber'>
                  {this.state.current}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Barber Details</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                <Row>
                  <Col span={8}>
                    <Image
                      height={606}
                      width={412}
                      src={image}
                    // fallback='data:image/png;base64,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'
                    />
                  </Col>
                  <Col span={8}>
                    <Descriptions title='Barber Info'>
                      <Descriptions.Item label='Name'>
                        {data.name}
                      </Descriptions.Item>
                      <Descriptions.Item span={4} label='Rate'>
                        ${data.rate} / hour
                      </Descriptions.Item>
                      <Col span={8}>
                        <Descriptions title='Service List'>
                          {service.map((s, i) => {
                            return (
                              <Descriptions.Item>
                                <Tag color='green'>{s.name.toUpperCase()}</Tag>
                              </Descriptions.Item>
                            )
                          }
                          )}
                        </Descriptions>
                      </Col>
                      <Col span={8}>
                        <Descriptions column={4} title='Working Days'>
                          {workingDays.map((d, i) => {
                            return (
                              <Descriptions.Item>
                                <Tag color='blue'>{weekDays[d]}</Tag>
                              </Descriptions.Item>
                            )
                          }
                          )}
                        </Descriptions>
                      </Col>
                      <Col span={8}>
                        <Descriptions column={4} title='Description'>
                          <Descriptions.Item>
                            {data.description}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={8}>
                        <Descriptions column={4} title='Rating'>
                          <Descriptions.Item>
                            <Rate allowHalf value={rating} disabled />
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Descriptions>
                  </Col>
                </Row>
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

export default BarberDetails;
