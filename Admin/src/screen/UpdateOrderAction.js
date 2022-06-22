import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Row, Col, Divider, Breadcrumb, Alert, Typography } from "antd";
import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Upload,
  Input,
  Select,
  InputNumber,
  Button,
  notification,
} from "antd";
import { customRequest, catalogSave } from "../services/API";
const { Text } = Typography;

const { Option } = Select;

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

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList.slice(-1);
  //return e && e.fileList;
};

const openNotification = () => {
  notification.open({
    message: "Product added successfully",
    /**
     *  description:
     *   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
     */
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

const UCatalogScreen = (props) => {
  const [finalData, setFinalData] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [address, setAddress] = useState([]);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setOrderData(props.location.state.data);
    // console.log(props.location.state.data);
    setAddress(props.location.state.data.address);
  }, []);

  const onFinish = (values) => {
    // values.product.isChecked = 0;
    // values.product.count = 1;
    // values.product.approvalStatus = true;
    // values.product.thumbnail = values.product.thumbnail[0].response.data;
    // catalogSave(values.product).then(
    //   (data) => {
    //     console.log(data.data);
    //     form.resetFields();
    //     openNotification();
    //   },
    //   (error) => {}
    // );
  };

  const customRequests = (options) => {
    const { onSuccess, onError } = options;
    customRequest(options).then(
      (res) => {
        /* form.setFieldsValue({
                user:
                {
                    categoryThumbnail: res.data,
                }
            });*/
        onSuccess(res);
      },
      (error) => {
        onError(error);
      }
    );
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Update Catalog</Breadcrumb.Item>
      </Breadcrumb>
      <Divider></Divider>
      <Row justify="start">
        <Col span={24}>
          <Form
            form={form}
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Row>
              <Col
                span={10}
                style={{
                  textAlign: "right",
                }}
              >
                <Form.Item
                  name={["Total", "Amount"]}
                  label="Total Amount"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    value={orderData.totalPrice}
                    style={{ width: 144 }}
                    placeholder="Enter Total Amount"
                    onChange={(e) =>
                      setOrderData({ ...orderData, totalPrice: e })
                    }
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["Total", "Item"]}
                  label="Total Item"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    value={orderData.itemCount}
                    style={{ width: 144 }}
                    placeholder="Enter Item Count"
                    onChange={(e) =>
                      setOrderData({ ...orderData, itemCount: e })
                    }
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["payment", "status"]}
                  label="Payment Status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder={orderData.paymentStatus}
                    onChange={(e) =>
                      setOrderData({ ...orderData, paymentStatus: e })
                    }
                    allowClear
                  >
                    {" "}
                    <Option value="Pending">Pending</Option>
                    <Option value="Transaction Was Successful">
                      Transaction Was Successful
                    </Option>
                    <Option value="Transaction Failed">
                      Transaction Failed
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["mobile", "number"]}
                  label="Mobile"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: 180 }}
                    value={orderData.mobile}
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setOrderData({ ...orderData, mobile: e })}
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["order", "status"]}
                  label="Order Status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder={orderData.deliveryStatus}
                    onChange={(e) =>
                      setOrderData({ ...orderData, deliveryStatus: e })
                    }
                    allowClear
                  >
                    <option value="packing">Packing</option>
                    <option value="packed">Packed</option>
                    <option value="new">New</option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["createDate"]}
                  label="Date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  {/* <Text strong> Date : {orderData.createDate}</Text> */}
                  <Text strong>
                    {dayjs(orderData.createDate).format("MMMM D, YYYY	")}
                  </Text>
                </Form.Item>
              </Col>

              <Col
                span={10}
                style={{
                  textAlign: "right",
                }}
              >
                <Form.Item
                  name={["house", "number"]}
                  label="House Number"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    value={address.house}
                    placeholder="Enter House No."
                    onChange={(e) =>
                      setAddress({ ...address, house: e.target.value })
                    }
                    allowClear
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["street", "building"]}
                  label="Street/Building"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    value={address.street}
                    placeholder="Enter Your Street/Building"
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    allowClear
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["City"]}
                  label="City"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    value={address.city}
                    placeholder="Enter Your City"
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    allowClear
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["state"]}
                  label="State"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder={address.state}
                    onChange={(e) => setAddress({ ...address, state: e })}
                    allowClear
                  >
                    <Option value="Punjab">Punjab</Option>
                    <Option value="Haryana">Haryana</Option>
                    <Option value="Chandigarh">Chandigarh</Option>
                    <Option value="Delhi">Delhi</Option>
                    <Option value="Himachal">Himachal</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["pincode"]}
                  label="PIN code"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    value={address.pincode}
                    style={{ width: 150 }}
                    placeholder="Enter Your Pin-Code"
                    onChange={(e) => setAddress({ ...address, pincode: e })}
                  />{" "}
                </Form.Item>
                <Form.Item
                  name={["product", "thumbnail"]}
                  label="Thumbnail"
                  valuePropName="fileList"
                  //data={'Category'}
                  getValueFromEvent={normFile}
                  extra=""
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Upload
                    action={"http://api.ldttechnology.com/category/upload"}
                    customRequest={customRequests}
                  >
                    <Button>
                      <UploadOutlined /> Upload category Thumbnail
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
                {success ? (
                  <Alert
                    message="Category added successfully"
                    type="success"
                    showIcon
                  />
                ) : null}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UCatalogScreen;
