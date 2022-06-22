import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Space, Divider, Modal } from "antd";
import { getSellers } from "../services/API";
import EditSellerScreen from "../component/editSeller";

const ViewSellerScreen = ({props}) => {
  const [data, setData] = useState("");
  const [sellerData, setSellerData] = useState([]);
  const [visible, setVisible] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  useEffect(() => {
    fetchSeller();
  }, []);

  const fetchSeller = async () => {
    getSellers().then(
      (data) => {
        console.log(data.data.data);
        setSellerData(data.data.data);
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
    //       <EditSellerScreen data={d}/>
    //     ),
    //     style: { top: 0, height: '83vh' },
    //     width: '70%',
    //     onOk() { },
    // });
    //  setVisible(true);
    //  const nextState = [...data, d] // this will create a new array, thus will ensure a re-render
    // // do other stuffs
    //  console.log(d);
    //  history.push("/orderDetails",{data:d});
  };

  const columns = [
    {
      title: "Seller UserName",
      dataIndex: "sellerUserName",
      key: "sellerUserName",
    },
    {
      title: "Mobile",
      dataIndex: "sellerMobile",
      key: "sellerMobile",
    },
    {
      title: "Seller Name",
      dataIndex: "sellerFullName",
      key: "sellerFullName",
    },
    {
      title: "Email",
      dataIndex: "sellerEmail",
      key: "sellerEmail",
    },
    {
      title: "Age",
      dataIndex: "sellerAge",
      key: "sellerAge",
    },
    {
      title: "Web Site",
      dataIndex: "sellerWebSite",
      key: "sellerWebSite",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Space size="middle">
              <a onClick={() => showModal(record)}>View Details{record.name}</a>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Category</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Divider></Divider>
      <Table columns={columns} rowkey="id" dataSource={sellerData} />
    </>
  );
};

export default ViewSellerScreen;