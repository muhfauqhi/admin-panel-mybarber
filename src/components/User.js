import { Breadcrumb, Layout } from "antd";
import React from "react";
import HeaderNav from "./HeaderNav";
import Navigation from "./Navigation";
import { Content, Footer } from "antd/lib/layout/layout";
import UserContent from "./menu/User.Content";

class User extends React.Component {
  state = {
    current: "User",
  };

  render() {
    return (
      <Layout>
        <HeaderNav />
        <Layout>
          <Navigation current={this.state.current} />
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
                <UserContent />
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

export default User;
