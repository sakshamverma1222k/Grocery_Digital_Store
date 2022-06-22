import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Breadcrumb, Alert } from "antd";
import {
  Form,
  Upload,
  Input,
  Select,
  InputNumber,
  Button,
  notification,
} from "antd";
import { category } from "../services/API";
import { customRequest, catalogSave } from "../services/API";

import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
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
    //description:
    //  'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

const CatalogScreen = (props) => {
  const [finalData, setFinalData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [x, setX] = useState("");
  const [form] = Form.useForm();
  // const [forme] = Form.useFormInstance();
  // const [sellerUserName, setSellerUserName] = useState("");

  const localSt = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    // setSellerUserName(localSt.sellerUserName);
    // forme.setFieldsValue({
    //   seller: sellerUserName,
    // });
    category().then(
      (data) => {
        setFinalData(data.data);
        console.log(data.data);
      },
      (error) => {}
    );
  }, []);

  const onFinish = (values) => {
    console.log(x);
    console.log(values);
    values.product.seller = localSt.sellerUserName;
    values.product.isChecked = 1;
    values.product.count = 1;
    values.product.approvalStatus = true;
    if (values.product.thumbnail !== null) {
      values.product.thumbnail = values.product.thumbnail[0].response.data;
      // var result = finalData.filter((obj) => {
      //   return obj.categoryName === value;
      // });
      // setSubCategoryData(result[0].subcategory);
    } else {
      values.product.thumbnail = values.product.thumbnail[0].response.data;
    }
    console.log(values.product);
    catalogSave(values.product).then(
      (data) => {
        console.log(data.data);
        form.resetFields();
        openNotification();
      },
      (error) => {}
    );
  };

  console.log(finalData, "=====");
  const onCategoryChange = (value) => {
    console.log(value);
    var result = finalData.filter((obj) => {
      return obj.categoryName === value;
    });
    setSubCategoryData(result[0].subcategory);
    console.log(result[0], "====");
  };
  const customRequests = (options) => {
    const { onSuccess, onError, file, action, onProgress } = options;
    customRequest(options).then(
      (res) => {
        console.log(res);
        form.setFieldsValue({
          product: {
            catalogThumbnail: res.data,
          },
        });
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
        <Breadcrumb.Item>
          {props.toString() == "[object Object]" ? "Add Catalog" : "Update"}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {props.toString() == "[object Object]" ? "Add New" : "Catalog"}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider></Divider>
      <Row justify="start">
        <Col span={24}>
          <Form
            form={form}
            {...layout}
            name="form"
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
                  name={["product", "seller"]}
                  label="Seller UserName"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Text strong>{localSt.sellerUserName}</Text>{" "}
                  {/* <Input placeholder="Enter Seller UserName" /> */}
                </Form.Item>
                <Form.Item
                  name={["product", "productIdentifier"]}
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Product Name" />
                </Form.Item>
                <Form.Item
                  name={["product", "type"]}
                  label="Product Type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Product Type"
                    //onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="Physical">Physical</Option>
                    <Option value="Digital">Digital</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "category"]}
                  label="Category"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Category Type"
                    onChange={onCategoryChange}
                    allowClear
                  >
                    {finalData.map((item, i) => (
                      <option key={i} value={item.categoryName}>
                        {item.categoryName}
                      </option>
                    ))}
                    ;
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "subCategory"]}
                  label="Sub Category"
                  disabled={!subCategoryData}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Sub Category Type"
                    //onChange={onGenderChange}
                    allowClear
                  >
                    {subCategoryData.map((item, i) => (
                      // <option key={i} value={item.categoryName} onSelect={(i)=>{setX(item._id)}} >
                      //   {item.categoryName}
                      // </option>
                      <Option
                        key={i}
                        value={item.categoryName}
                        onSelect={(i) => {
                          setX(item._id);
                        }}
                      >
                        {item.categoryName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "models"]}
                  label="Model"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Model Name" />
                </Form.Item>
                <Form.Item
                  name={["product", "featured"]}
                  label="Featured"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select Featured" allowClear>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "brand"]}
                  label="Brand"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Brand Of The Product" />
                </Form.Item>
                <Form.Item
                  name={["product", "stockQuantity"]}
                  label="Stock Count"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>

              <Col
                span={10}
                style={{
                  textAlign: "right",
                }}
              >
                <Form.Item
                  name={["product", "weightUnit"]}
                  label="Weight Unit"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Unit"
                    //onChange={onGenderChange}
                    allowClear
                  >
                    <option value="Gram">Gram</option>
                    <option value="Kg">Kg</option>
                    <option value="piece">Piece</option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "qty"]}
                  label="Quantity"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name={["product", "mrp"]}
                  label="MRP"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item name={["product", "tax"]} label="Tax">
                  <InputNumber defaultValue={0} />
                </Form.Item>
                <Form.Item
                  name={["product", "msp"]}
                  label="MSP"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name={["product", "status"]}
                  label="Status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Status"
                    //onChange={onGenderChange}
                    allowClear
                  >
                    <option value="Available">Available</option>
                    <option value="Sold_Out">Sold_Out</option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "cod"]}
                  label="Cod"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Status"
                    //onChange={onGenderChange}
                    allowClear
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Select>
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
                    action={"http://localhost:3001/catalog/upload"}
                    customRequest={customRequests}
                  >
                    <Button>
                      <UploadOutlined /> Upload category Thumbnail
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name={["product", "Discription"]}
                  label="Discription"
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    {props.toString() == "[object Object]"
                      ? "Submit"
                      : "Update"}
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

export default CatalogScreen;
