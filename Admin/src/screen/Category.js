import React, { useState } from "react";
import { Row, Col, Divider, Breadcrumb, Alert, Form, Input, Button, Upload, Space } from "antd";
import { getVerifyCategory } from "../services/API";
import { customRequest } from "../services/API";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { categorySave } from "../services/API";

import { UploadOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 18,
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

const CategoryScreen = () => {
  const [load, setLoad] = useState(false);
  const [fileList, setFileList] = useState([{}]);
  const [catFlag, setCatFlag] = useState(true);
  const [success, setSuccess] = useState(false);
  const [onCategory, setOnCategory] = useState('');
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let finalData = {};
    let subCategory = [];
    finalData.categoryName = values.user.categoryName;
    finalData.thumbnail = values.user.thumbnail[0].response.data;
    finalData.status = 0;
    values.users.forEach((item) => {
      let temp = {};
      temp.categoryName = item.subCategory;
      temp.thumbnail = item.thumbnail[0].response.data;
      subCategory.push(temp);
    });
    finalData.subcategory = subCategory;
    categorySave(finalData).then(
      (data) => {
        finalData = {};
        form.resetFields();
        setSuccess(true);
      },
      (error) => {}
    );
    console.log(finalData);
  };

  const onFinishCategory = (e) => {
    setLoad("validating");
    setCatFlag(false);
    setOnCategory(e.target.value)
    getVerifyCategory(onCategory).then(
      (data) => {
        console.log(data)
        if (data.data.length == 0) {
          setLoad("success");
        } else {
          setLoad("warning");
        }
      },
      (error) => {}
    );
  };

  const customRequests = (options) => {
    const { onSuccess, onError, file, action, onProgress } = options;
    customRequest(options).then(
      (res) => {
        form.setFieldsValue({
          user: {
            categoryThumbnail: res.data,
          },
        });
        onSuccess(res);
      },
      (error) => {
        onError(error);
      }
    );
  };

  const customRequestsSub = (options) => {
    console.log(options);
    const { onSuccess, onError, file, action, onProgress } = options;
    customRequest(options).then(
      (res) => {
        onSuccess(res);
      },
      (error) => {
        onError(error);
      }
    );
  };

  const props = {
    name: "mypic",
    action: "http://localhost:3001/category/upload",
    multiple: false,
    disabled: catFlag,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
        console.log(info);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item> Category</Breadcrumb.Item>
        <Breadcrumb.Item>Add New</Breadcrumb.Item>
      </Breadcrumb>

      <Divider></Divider>

      <Row justify="start">
        <Col span={12}>
          <Form
            form={form}
            {...layout}
            name="form"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "categoryName"]}
              hasFeedback
              //validateStatus={load}
              //help="The information is being validated..."
              //label="Name"
              onFinish={onFinishCategory}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Category Name" />
            </Form.Item>
            <Form.Item
              name={["user", "thumbnail"]}
              //label="Thumbnail"
              valuePropName="fileList"
              //data={'Category'}
              getValueFromEvent={normFile}
              extra=""
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload
                // action={"http:/api.ldttechnology.com/category/upload/"}
                action={"http://localhost:3001/category/upload"}
                customRequest={customRequests}
              >
                <Button>
                  <UploadOutlined /> Upload category Thumbnail
                </Button>
              </Upload>
            </Form.Item>

            <Form.List name="users">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, i) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="start"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "subCategory"]}
                          fieldKey={[field.fieldKey, "subCategory"]}
                          rules={[
                            { required: true, message: "Missing subCategory " },
                          ]}
                        >
                          <Input placeholder="Sub Category Name" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "thumbnail"]}
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          extra=""
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Upload
                            data={i}
                            action={
                              // "http:/api.ldttechnology.com/category/upload"
                              // "http://54.86.127.53:3001/category/upload"
                              "http://localhost:3001/category/upload"
                            }
                            customRequest={customRequestsSub}
                          >
                            <Button>
                              <UploadOutlined /> Upload Sub Category Thumbnail
                            </Button>
                          </Upload>
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> Add field
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Form.Item name={["user", "categoryThumbnail"]}>
                {" "}
                <Input type="hidden" />
              </Form.Item>
            </Form.Item>
          </Form>
          {success ? (
            <Alert
              message="Category added successfully"
              type="success"
              showIcon
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default CategoryScreen;
