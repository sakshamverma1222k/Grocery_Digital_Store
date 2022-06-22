import {
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Row,
  Col,
  notification,
} from "antd";
import React, { useEffect } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { loginActions } from "../actions/LoginAction";
import { useHistory } from "react-router-dom";
import {
  SmileOutlined,
  FireOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

const Login = (props) => {
  const history = useHistory();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    values.grant_type = "password";
    props.login(values, props.navigation);
    const localSt = JSON.parse(localStorage.getItem("token"));
    console.log(localSt);
    {
      localSt.seller && localSt != null
        ? history.push("/logined")
        : localSt.seller == false
        ? history.push("/")
        : failedNotification();
    }
  };

  const openNotification = () => {
    notification.open({
      message: "Seller Logged In",
      //description:
      //  'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const failedNotification = () => {
    notification.open({
      message: "Wrong username or password , please try again",
      icon: <FireOutlined style={{ color: "#108ee9" }} />,
    });
  };

  // useEffect(() => {
  //   const localSt = JSON.parse(localStorage.getItem("token"));
  //   console.log(localSt);
  //   {(localSt.seller)?history.push("/logined"):""}
  // });

  return (
    <div className="full-height">
      {console.log(props.location.pathname)}
      <Layout>
        <Header style={{ textAlign: "center", backgroundColor: "#6699ff" }}>
          <h1>Seller Login</h1>
        </Header>
        <Content>
          <Divider />
          <Divider />
          <Row className="full-height">
            <Col span={8}></Col>
            <Col span={8}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Login
                  </Button>
                  Or <a href="/seller">register now!</a>
                </Form.Item>
              </Form>
            </Col>
            {/* <Col span={8}>  {props.loading ? <Spin /> : props.history.push('/someRoute')}</Col> */}
            <div class="ant-col ant-col-8"></div>
          </Row>
          <Divider />
        </Content>
        <Footer />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userData: state.loginReducer.userData,
  loading: state.loginReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (msg) => {
    dispatch(loginActions.loginSellerAction(msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
