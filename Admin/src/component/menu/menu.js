import React, { useState } from "react";
import Login from "../../screen/Login";
import HomeScreen from "../../screen/home";
import MainRoutes from "../../routes/MainRoutes";
import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import SellerloginHeader from "./sellerlogin/SellerLoginHeader";
import { PageHeader } from "antd";
import "./menu.css";

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  FileAddOutlined,
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const imagePath = "./day22owl.png";
// "C:/Users/saksh/OneDrive/Desktop/Grocery/IMG/day22-owl.png";

const MainLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => setCollapsed((value) => !value);
  const path = props.location.pathname;
  const localSt = JSON.parse(localStorage.getItem("token"));

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {path != "/home" && path != "/seller" ? (
          path == "/" ? (
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
              <div className="logo" />
              <AuthButton />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <Link to="/logined">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserAddOutlined />}>
                  <Link to="/seller">Add Seller</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserAddOutlined />}>
                  <Link to="/home">Admin Logout</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<UserAddOutlined />}>
                  <Link to="/viewCatalog">View Catalog</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UserAddOutlined />}>
                  <Link to="/viewCategory">View Category</Link>
                </Menu.Item>
                <Menu.Item key="9" icon={<UserAddOutlined />}>
                  <Link to="/order">Order</Link>
                </Menu.Item>
                <Menu.Item key="8" icon={<UserAddOutlined />}>
                  <Link to="/customer">Customer</Link>
                </Menu.Item>
                <Menu.Item key="10" icon={<UserAddOutlined />}>
                  <Link to="/viewSeller">View Seller</Link>
                </Menu.Item>
              </Menu>
            </Sider>
          ) : (
            <>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link to="/logined">Dashboard</Link>
                  </Menu.Item>
                  {/* <Menu.Item key="2" icon={<UserAddOutlined />}>
                    <Link to="/home">Logout</Link>
                  </Menu.Item> */}
                  <SubMenu
                    key="sub2"
                    icon={<FileAddOutlined />}
                    title="Catalog"
                  >
                    <Menu.Item key="6">
                      {" "}
                      <Link to="/viewCatalog">View Catalog</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <Link to="/catalog">Add Catalog</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub1"
                    icon={<FileAddOutlined />}
                    title="Categories"
                  >
                    <Menu.Item key="4">
                      {" "}
                      <Link to="/viewCategory">View Category</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Link to="/category">Add Category</Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9" icon={<UserAddOutlined />}>
                    <Link to="/order">Order</Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            </>
          )
        ) : (
          <>
            <div className="logo" />
          </>
        )}
        <Layout className="site-layout">
          {/* <Header
            className="site-layout-background"
            style={{ padding: 40 }}
          >{(props)?<h1 id="pond">Original image: <img src={imagePath} width="32" height="32" /></h1>:""}</Header> */}
          {path != "/" &&
          path != "/seller" &&
          path != "/home" &&
          localSt != null ? (
            <SellerloginHeader />
          ) : (
            ""
          )}
          {/* {
            path =! "/" ? (
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                draggable="true"
                size={{
                  xs: 24,
                  sm: 32,
                  md: 40,
                  lg: 64,
                  xl: 80,
                  xxl: 100,
                }}
                icon={<AntDesignOutlined />}
              />
            ) : (
              ""
            )
          } */}
          <Content style={{ margin: "0 16px" }}>
            <MainRoutes></MainRoutes>
          </Content>
          <Footer
            style={{ textAlign: "center", backgroundColor: "#000" }}
          ></Footer>
        </Layout>
      </Layout>
    </>
  );
};

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function AuthButton() {
  let history = useHistory();
  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p id="p">You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default MainLayout;