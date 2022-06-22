import React, { useState, useEffect, useForm } from "react";
import { Table, Breadcrumb, Popconfirm, Divider } from "antd";
import { category, categoryDelete } from "../services/API";
import { BASE_URL_catalog } from "../services/constants";

const ViewCategoryScreen = ({ prop }) => {
  const [finalData, setFinalData] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const url = BASE_URL_catalog + "/images/";

  const fetchUser = async () => {
    //const data = await category()

    category().then(
      ({ data }) => {
        console.log(data);
        setFinalData(data);
      },
      (error) => {}
    );
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      //children:'subcategory'
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      //children:'subcategory'
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record, i) => (
        <img style={{ height: "40px", widows: "40px" }} src={url + text} />
      ),
      width: "12%",
    },
    // b73eec10-ec91-11ec-8c0b-572ab9cd3f94.jpeg
    {
      title: "Status",
      dataIndex: "status",
      width: "30%",
      key: "status",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (text, record) => (
        // finalData.length >= 1 ? (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record._id)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
      //) : null,
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const handleDelete = (key) => {
    console.log(key);
    const dataSource = [...finalData];

    categoryDelete(key).then(
      (data) => {
        setFinalData(data.data);
      },
      (error) => {}
    );
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item> Category</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Divider></Divider>
      <Table
        columns={columns}
        childrenColumnName="subcategory"
        rowkey="_id"
        dataSource={finalData}
      />
    </>
  );
};

export default ViewCategoryScreen;
