import React from "react";
import { Layout, Space } from "antd";
import { Row, Col, Divider, Breadcrumb } from "antd";
import { Form, Input, InputNumber, Button, notification } from "antd";
import { seller, sellerSave } from "../services/API";
import { SmileOutlined, FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header, Footer, Content } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SellerScreen = () => {
  // const onFinish = (values) => {
  //   console.log(values);
  // };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    sellerSave(values).then(
      (data) => {
        console.log(data.data);
        {(data.data.data.verified===0)?openNotification():failedNotification(data.data.data)}
        form.resetFields();
      },
      (error) => {
      }
    );
  };

  const openNotification = () => {
    notification.open({
      message: "Seller added successfully",
      //description:
      //  'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const failedNotification = (values) => {
    var problem=["","",""];
    console.log(values);
    if(values[0]===1){
      problem[0]="Mobile"
    }
    if(values[1]===1){
      problem[1]="Email"
    }
    if(values[2]===1){
      problem[2]="UserName"
    }
    notification.open({
      message: `Seller Not Added,\nyou have peoblem \nwith ${problem[0]}, ${problem[1]}, ${problem[2]}\nChange These`,
      // message:"Wrong username or password , please try again",
      icon: <FireOutlined style={{ color: "#108ee9" }} />,
    });
  };

  return (
    <>
      {/* <Breadcrumb>
        <Breadcrumb.Item>Add Seller</Breadcrumb.Item>
        <Breadcrumb.Item>Add New</Breadcrumb.Item>
      </Breadcrumb> */}
      <Layout>
        <Header style={{ textAlign: "center", backgroundColor: "#6699ff" }}>
          <h1>Seller Sign Up</h1>
        </Header>
        <Divider></Divider>
        <Row justify="start">
          <Col span={12}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["sellerFullName"]}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["sellerEmail"]}
                label="Email"
                rules={[
                  {
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["sellerAge"]}
                label="Age"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item name={["sellerWebSite"]} label="Website">
                <Input />
              </Form.Item>
              <Form.Item name={["sellerIntroduction"]} label="Introduction">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name={["sellerUserName"]}
                label="Username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["sellerPassword"]}
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["sellerMobile"]}
                label="Mobile"
                rules={[
                  {
                    required: true,
                    type: "number",
                  },
                ]}
              >
                <InputNumber style={{ width: 180 }} />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                  <Link to="/home">
                    <Button type="primary" htmlType="button">
                      Go To Login Page
                    </Button>
                  </Link>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default SellerScreen;
