import React from "react";
import { Breadcrumb, Layout, Descriptions, Image } from "antd";
import HeaderNav from "../../HeaderNav";
import Navigation from "../../Navigation";
import { Content, Footer } from "antd/lib/layout/layout";
import AdminService from "../../../services/admin.service";

const weekDays = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

class BarberDetails extends React.Component {
  state = {
    current: "Barber",
    data: {},
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(
      AdminService.getBarberById(id).then((res) => {
        const data = res.data.data;
        let image = "";
        if (data.image) {
          image =
            "http://localhost:3000/" +
            data.image.substring(19, data.image.length);
        }
        let result = {
          id: data._id,
          name: data.name,
          rate: data.rate,
          description: data.description,
          service: [],
          workingDays: [],
          image: image,
        };
        let tempWorkingDays = [];
        data.workingDays.forEach((days) => {
          tempWorkingDays.push(weekDays[days]);
        });
        result.workingDays = tempWorkingDays;
        this.setState({ data: result });
      })
    );
  }

  render() {
    let { data } = this.state;
    return (
      <Layout>
        <HeaderNav />
        <Layout>
          <Navigation current={this.state.current} />
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/barber">
                  {this.state.current}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Barber Details</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
                <Image src={data.image} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design Layout example create by muhfauqhi
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default BarberDetails;
