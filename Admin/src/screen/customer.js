import React, { useState, useEffect, useHistory } from "react";
import { Table, Breadcrumb, Space, Divider, Modal } from "antd";
import { gatAllUser } from "../services/API";
import EditOrderScreen from "../component/editOrder";

const CustomerScreen = ({ prop }) => {
  const [data, setData] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    gatAllUser().then(
      (data) => {
        console.log(data.data.data);
        setCustomerData(data.data.data);
      },
      (error) => {}
    );
  };

  const showModal = (d) => {
    //   console.log(d);
    //   setData(d);
    //   Modal.info({
    //     title: 'Order No . '+d.id,
    //     centered:true,
    //     content: (
    //       <EditOrderScreen data={d}/>
    //     ),
    //     style: { top: 0, height: '83vh' },
    //     width: '70%',
    //     onOk() { },
    // });
    //  setVisible(true);
    //  const nextState = [...data, d] // this will create a new array, thus will ensure a re-render
    // do other stuffs
    //  console.log(d);
    //  history.push("/orderDetails",{data:d});
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "country",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Space size="middle">
              <a onClick={() => showModal(record)}>View/Update {record.name}</a>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item> Category</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Divider></Divider>
      <Table columns={columns} rowkey="id" dataSource={customerData} />
    </>
  );
};

export default CustomerScreen;
