import React, { useEffect, useState } from "react";
import { Layout } from "antd";
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

const UCatalogScreen = (props) => {
  const [finalData, setFinalData] = useState([]);
  const [catalogData, setCatalogData] = useState({});
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const [x, setX] = useState("")
  useEffect(() => {
    setCatalogData(props.location.state.data);
    console.log(props.location.state.data);
    category().then(
      (data) => {
        setFinalData(data.data);
      },
      (error) => {}
    );
  }, []);

  const onFinish = (values) => {
    console.log(catalogData);
    values.product.isChecked = 0;
    values.product.count = 1;
    values.product.approvalStatus = true;
    values.product.thumbnail = values.product.thumbnail[0].response.data;
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

  const onCategoryChange = (value) => {
    console.log(value);
    var result = finalData.filter((obj) => {
      return obj.categoryName === value;
    });
    setSubCategoryData(result[0].subcategory);
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
                  label="Seller"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  {!{ ...catalogData.seller } ? (
                    <>
                      <Input placeholder="Enter Seller Name" />{" "}
                    </>
                  ) : (
                    <>
                      <Input
                        value={catalogData.seller}
                        onChange={(e) =>
                          setCatalogData({
                            ...catalogData,
                            seller: e.target.value,
                          })
                        }
                        placeholder="Enter Seller Name"
                      />{" "}
                      {console.log(catalogData.seller)}
                    </>
                  )}
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
                  <Input
                    value={catalogData.productIdentifier}
                    placeholder="Enter Product Name"
                    onChange={(e) =>
                      setCatalogData({
                        ...catalogData,
                        productIdentifier: e.target.value,
                      })
                    }
                  />{" "}
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
                    placeholder={catalogData.type}
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, type: e })
                    }
                    allowClear
                  >
                    <Option value="Physical">Physical</Option>
                    <Option value="Digital">Digital</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "category"]}
                  label=" Category"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder={catalogData.category}
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, category: e })
                    }
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
                      <Option key={i} value={item.categoryName} onSelect={(i)=>{setX(item._id)}}>{item.categoryName}</Option>
                    ))}
                    ;
                  </Select>
                </Form.Item>
                {/* <Form.Item
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
                    placeholder={catalogData.category}
                    allowClear
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, category: e })
                    }
                  >
                    {subCategoryData.map((item, i) => (
                      <option key={i} value={item.categoryName}>
                        {item.categoryName}
                      </option>
                    ))}
                    ;
                  </Select>
                </Form.Item> */}
                <Form.Item
                  name={["product", "models"]}
                  label="Model"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    value={catalogData.models}
                    placeholder="Enter Product Model"
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, models: e.target.value })
                    }
                  />{" "}
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
                  <Select
                    placeholder={catalogData.featured ? "Yes" : "No"}
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, featured: e })
                    }
                    allowClear
                  >
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
                  <Input
                    value={catalogData.brand}
                    placeholder="Enter Brand Name"
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, brand: e.target.value })
                    }
                  />{" "}
                </Form.Item>
                <Form.Item name={["product", "tax"]} label="Tax">
                  <InputNumber
                    defaultValue={0}
                    value={catalogData.tax}
                    placeholder="Enter Product Brand"
                    onChange={(e) => setCatalogData({ ...catalogData, tex: e })}
                  />{" "}
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
                    placeholder={catalogData.weightUnit}
                    allowClear
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, weightUnit: e })
                    }
                  >
                    <option value="Gram">Gram</option>
                    <option value="Kg">Kg</option>
                    <option value="piece">Piece</option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["product", "price"]}
                  label="Price"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    value={catalogData.price}
                    placeholder="Enter Product Price"
                    style={{ width: 166 }}
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, price: e })
                    }
                  />{" "}
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
                  <InputNumber
                    value={catalogData.count}
                    placeholder="Enter Quantity of Product"
                    style={{ width: 166 }}
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, count: e })
                    }
                  />{" "}
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
                  <InputNumber
                    value={catalogData.mrp}
                    placeholder="Enter Product's MRP"
                    style={{ width: 166 }}
                    onChange={(e) => setCatalogData({ ...catalogData, mrp: e })}
                  />{" "}
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
                  <InputNumber
                    value={catalogData.msp}
                    placeholder="Enter Product's MSP"
                    style={{ width: 166 }}
                    onChange={(e) => setCatalogData({ ...catalogData, msp: e })}
                  />{" "}
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
                  <InputNumber
                    value={catalogData.qty}
                    placeholder="Enter Product Quantity"
                    style={{ width: 166 }}
                    onChange={(e) => setCatalogData({ ...catalogData, qty: e })}
                  />{" "}
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
                    placeholder={catalogData.approvalStatus ? "Yes" : "No"}
                    allowClear
                    onChange={(e) =>
                      setCatalogData({ ...catalogData, approvalStatus: e })
                    }
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
                    placeholder={catalogData.cod ? "Yes" : "No"}
                    onChange={(e) => setCatalogData({ ...catalogData, cod: e })}
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
                    action={"http://api.ldttechnology.com/category/upload"}
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
                    Update
                  </Button>
                </Form.Item>
                {success ? (
                  <Alert
                    message="Category updated successfully"
                    type="success"
                    showIcon
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UCatalogScreen;
