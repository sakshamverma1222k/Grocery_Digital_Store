import React, { useState, useEffect, useForm } from "react";
import {
  Table,
  Breadcrumb,
  Popconfirm,
  Divider,
  Input,
  Space,
  Button,
} from "antd";
import { catalog, catalogDelete } from "../services/API";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BASE_URL_catalog } from "../services/constants";

const ViewCatalogScreen = ({ prop }) => {
  const [finalData, setFinalData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  useEffect(() => {
    fetchCatalog();
  }, []);
  const url = BASE_URL_catalog + "/images/";

  const fetchCatalog = async () => {
    catalog().then(
      (data) => {
        console.log(data);
        setFinalData(data.data);
      },
      (error) => {}
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          //ref={node => {
          // this.searchInput = node;
          //}}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <>
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      </>
    ),
    onFilter: (value, record) => {
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      console.log(value, record);
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        //setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <>
          {console.log(text, dataIndex)}
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
          {console.log(searchText)}
        </>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record, i) => (
        <img style={{ height: "40px", widows: "40px" }} src={url + text} />
      ),
      //children:'subcategory'
    },
    {
      title: "Product Name",
      dataIndex: "productIdentifier",
      key: "productIdentifier",
      sorter: {
        compare: (a, b) => a.productIdentifier - b.productIdentifier,
        multiple: 3,
      },
      ...getColumnSearchProps("productIdentifier"),
      //children:'subcategory'
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: "MSP",
      dataIndex: "msp",
      key: "msp",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "COD",
      dataIndex: "cod",
      key: "cod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Model",
      dataIndex: "models",
      key: "models",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (text, record) => (
        <p>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            {console.log(record)}
            <a>Delete</a>
          </Popconfirm>
          <Popconfirm
            title="You will be redirected to the update page, are you sure that you want to update this?"
            onConfirm={() => handleUpdate(record)}
          >
            <a style={{ padding: "20px" }}>Update</a>
          </Popconfirm>
        </p>
      ),
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
    console.log(key._id);
    const dataSource = [...finalData];

    catalogDelete(key._id).then(
      (data) => {
        setFinalData(data.data);
      },
      (error) => {}
    );
  };

  const history = useHistory();

  const handleUpdate = (key) => {
    console.log("===============" + key + "===============");
    setFinalData(key);
    // setData(key);
    // history.push("/UpdateCatalog",{data:key});
    history.push("/viewUCatalog", { data: key });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log("data", selectedKeys, confirm, dataIndex);
    confirm();
    //this.setState({
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    // });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item> Catalog</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Divider></Divider>
      <Table columns={columns} rowkey="_id" dataSource={finalData} />
    </>
  );
};

export default ViewCatalogScreen;
