import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
import { Table, Tag, Input, Space, DatePicker, Button } from "antd";
import Select, { StylesConfig } from "react-select";
import Highlighter from "react-highlight-words";
import "bootstrap/dist/css/bootstrap.min.css";
import { getOrderApi, catalogDelete } from "../services/API";
import ToolTip from "react-tooltip";
import {
  CheckCircleTwoTone,
  WarningTwoTone,
  ContactsTwoTone,
  SearchOutlined,
} from "@ant-design/icons";

import { useHistory } from "react-router-dom";

import styles from "./Css.css";

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

const actions = [
  { label: "Mobile", value: 1 },
  { label: "Order Id", value: 2 },
  { label: "Order Status", value: 3 },
  { label: "Payment Status", value: 4 },
];

const actions_1 = [
  { label: "Pending", value: 1 },
  { label: "Transaction Was Successful", value: 2 },
  { label: "Transaction Failed", value: 3 },
];

const actions_2 = [
  { label: "Packed", value: 1 },
  { label: "Packing", value: 2 },
  { label: "New", value: 3 },
];

const OrderScreen = ({ props }) => {
  const { Search } = Input;
  const [gridApi, setGridApi] = useState();
  const [finalData, setFinalData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusColor, setStatusColor] = useState("red");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [sTrue, setTrue] = useState(true);
  const history = useHistory();
  const showModal = (d, edit) => {
    // console.log(d);
    // setData(d);
    // Modal.info({
    //   title: "Order No . " + d.id,
    //   centered: true,
    //   content: <EditOrderScreen data={d} />,
    //   style: { top: 0, height: "83vh" },
    //   width: "70%",
    //   onOk() {},
    // });
    // setVisible(true);
    // const nextState = [...data, d]; // this will create a new array, thus will ensure a re-render
    //// do other stuffs
    setData(d);
    history.push("/orderDetails", { data: d });
  };

  const updateModal = (d, edit) => {
    setData(d);
    history.push("/orderUpdate", { data: d });
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = () => {
    getOrderApi().then(
      (data) => {
        setFinalData(data.data.data);
      },
      (error) => {}
    );
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };

  // useEffect(() => {
  //     if (startDate !== '' && endDate !== '' && startDate > endDate) {
  //       alert("Start Date should be before End Date")
  //       setEndDate('')
  //     } else {
  //       var dateFilterComponent = gridApi.api.getFilterInstance('date');
  //       dateFilterComponent.setModel({
  //         type: getFilterType(),
  //         dateFrom: startDate ? startDate : endDate,
  //         dateTo: endDate,
  //       });
  //       gridApi.api.onFilterChanged();
  //     }
  // }, [startDate, endDate])

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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        //setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Order Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Items",
      dataIndex: "itemCount",
      // render: text => <a>{text}</a>,
      sorter: (a, b) => a.itemCount - b.itemCount,
      ...getColumnSearchProps("itemCount"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (a) => {
        return (
          <>
            <a
              target="_blank"
              data-tip={`${
                "H.No.:" +
                a.house +
                "\n  City:" +
                a.city +
                "\n  District:" +
                a.dist +
                "\n  State:" +
                a.state +
                "\n  Pincode:" +
                a.pincode
              }`}
              rel="noopener noreferrer"
            >
              <ContactsTwoTone />
            </a>
            <ToolTip globalEventOff="click" />
          </>
        );
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (text, record) => {
        let icon;
        if (text == "pending") {
          icon = <WarningTwoTone twoToneColor="#eb2f96" />;
        } else {
          icon = <CheckCircleTwoTone twoToneColor="green" />;
        }
        return (
          <>
            {icon} {text}
          </>
        );
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Order Status",
      dataIndex: "deliveryStatus",
      render: (text, record) => {
        if (text == "pending") {
          setStatusColor("orange");
        } else {
          setStatusColor("red");
        }
        return (
          <>
            {/* {if(a.deliveryStatus == "new"){
              deliveryStatus_O= 1;
            } else if (a.deliveryStatus == "packing") {
              deliveryStatus_O= 2;
            } else if (a.deliveryStatus == "packed") {
              deliveryStatus_O= 3;
            } else (a.deliveryStatus == "") {
              deliveryStatus_O= 4;
            }}
          </> */}

            <Tag color={statusColor} key={text}>
              <span class={`ant-tag ant-tag-${statusColor}`}>{text}</span>
            </Tag>
          </>
        );
      },
      sorter: (a, b) => a.deliveryStatus.length - b.deliveryStatus.length,
      // sortOrder: sortedInfo.selectedKeys === "deliveryStatus" && sortedInfo.order
      ...getColumnSearchProps("deliveryStatus"),
    },
    {
      title: "Created At",
      dataIndex: "createDate",
      ...getColumnSearchProps("createDate"),
      render: (text) => dayjs(text).format("MMMM D, YYYY	"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Space size="middle">
              <a onClick={() => showModal(record)}>View</a>
              <a onClick={() => updateModal(record)}>Update</a>
            </Space>
          </>
        );
      },
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

    catalogDelete(key).then(
      (data) => {
        setFinalData(data.data);
      },
      (error) => {}
    );
  };

  const handleSearch = (selectedKeys, dataIndex) => {
    //this.setState({
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    // });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [selected_Value, setSelected_Value] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
    setTrue(false);
  };

  const handle_Change = (value) => {
    setSelected_Value(value);
    setTrue(false);
  };

  const dot = (color = "transparent") => ({
    alignItems: "center",
    dispaly: "flex",
    width: 200,
  });
  const margining: StylesConfig = {
    input: (styles) => ({ ...styles, ...dot() }),
  };

  const filterOrdersByDate = (dateValues) => {
    if (finalData.length) {
      let filteredArray = [];
      dayjs.extend(isBetween);
      let [startDate, endDate] = dateValues;
      startDate = dayjs(startDate).format();
      endDate = dayjs(endDate).format();
      finalData.map((order) => {
        const convertedOrderDate = dayjs(order.createDate).format();
        if (dayjs(convertedOrderDate).isBetween(startDate, endDate, "day")) {
          filteredArray.push(order);
          console.log(order);
        }
      });
      // console.log(filteredArray)
      setFinalData(filteredArray);
      // console.log(dayjs(startDate).format(),dayjs(endDate).format())
      // dayjs.extend(isBetween)
      // const filteredOrders = finalData.filter(order=>dayjs(dayjs(order.createDate).format()).isBetween(dayjs(startDate).format(),dayjs(endDate).format(),'day'))
      // setFinalData(filteredOrders)
    }
  };

  return (
    <>
      <div style={{ width: 400 }}>
        <Space>
          <Select
            placeholder="Select The Field To Search"
            options={actions}
            styles={margining}
            value={selectedValue}
            onChange={handleChange}
          />
          {selectedValue &&
          (selectedValue.label == "Order Id" ||
            selectedValue.label == "Mobile") ? (
            <>
              <Search
                placeholder="input search loading with enterButton"
                value={searchText}
                hidden={sTrue}
                onChange={(e) => setSearchText(e.target.value)}
                // onClick={alert(searchText)}
                onSearch={() => console.log(searchText)}
                enterButton
                style={{ width: 304, height: "center" }}
                onClick={() => handleSearch(searchText, selectedValue)}
              />
            </>
          ) : selectedValue && selectedValue.label == "Payment Status" ? (
            <>
              <Select
                options={actions_1}
                styles={margining}
                value={selected_Value}
                onChange={handle_Change}
              />
              <Search enterButton />
            </>
          ) : selectedValue && selectedValue.label == "Order Status" ? (
            <>
              <Select
                options={actions_2}
                styles={margining}
                value={selected_Value}
                onChange={handle_Change}
              />
              <Search
                enterButton
                onSearch={() => getColumnSearchProps(selectedValue.label)}
              />
            </>
          ) : ("")}
        </Space>
      </div>
      <div align="right">
        <Input defaultValue="Date" style={{ width: 55 }} />
        <DatePicker.RangePicker
          style={{ width: 400 }}
          onChange={(value) => filterOrdersByDate(value)}
          format="YYYY-MM-DD HH:mm"
        />
        {/* From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/> */}
        {/* <button onClick={onGridReady}/> */}
      </div>
      <div style={{ padding: 4 }}></div>
      <Table columns={columns} rowkey="_id" dataSource={finalData} />
    </>
  );
};

export default OrderScreen;
