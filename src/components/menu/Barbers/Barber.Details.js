import React from "react";
import { Breadcrumb, Layout } from "antd";
import HeaderNav from "../../HeaderNav";
import Navigation from "../../Navigation";
import { Content, Footer } from "antd/lib/layout/layout";
import AdminService from "../../../services/admin.service";

class BarberDetails extends React.Component {
  state = {
    current: "Barber",
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(
      AdminService.getBarberById(id).then((res) => {
        console.log(res);
      })
    );
  }
  render() {
    return (
      <Layout>
        <HeaderNav />
        <Layout>
          <Navigation current={this.state.current} />
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/barber">{this.state.current}</Breadcrumb.Item>
                <Breadcrumb.Item>Barber Details</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{ background: "#fff", padding: 24, minHeight: 580 }}
              ></div>
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
