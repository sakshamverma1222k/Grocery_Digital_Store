import React, { useState, useEffect, useForm } from 'react';
import { Table, Breadcrumb, Modal,Popconfirm, Divider, Tag, Input, Space, Button, } from 'antd';
import { catalog, getOrderApi, catalogDelete } from '../services/API';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, CheckCircleTwoTone, WarningTwoTone, ZoomInOutlined, ContactsTwoTone } from '@ant-design/icons';
import EditOrderScreen from '../component/editOrder';
import { useHistory } from 'react-router-dom';

const OrderScreen = ({ prop }) => {

  const [finalData, setFinalData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [statusColor, setStatusColor] = useState('red');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const history = useHistory();
  const showModal = (d) => {
    /*console.log(d);
    setData(d);
    Modal.info({
      title: 'Order No . '+d.id,
      centered:true,
      content: (
        <EditOrderScreen data={d}/>
      ),
      style: { top: 0, height: '83vh' },
      width: '70%',
      onOk() { },
  });*/
   // setVisible(true);
   //const nextState = [...data, d] // this will create a new array, thus will ensure a re-render
  // do other stuffs
   setData(d);
   console.log(d);
   history.push("/orderDetails",{data:d});
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };
  useEffect(() => {
    fetchCatalog();
  }, []);


  const fetchCatalog = async () => {
    getOrderApi().then(data => {
      setFinalData(data.data.data);
    },
      error => {
      }
    );
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          //ref={node => {
          // this.searchInput = node;
          //}}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
              </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        //setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps("id")
    },
    {
      title: 'Items',
      dataIndex: 'itemCount',
      key: 'itemCount',
      render: text => <a>{text}</a>,

    },

    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => {
        return (
          <ContactsTwoTone />
        )
      }

    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',

    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text, record) => {
        let icon;
        if (text == 'pending') {
          icon = <WarningTwoTone twoToneColor="#eb2f96" />

        } else {
          icon = <CheckCircleTwoTone twoToneColor="green" />
        }
        return (
          <>

            {icon} {text}
          </>

        )
      }
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
    },
    {
      title: 'Order Status',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
      render: (text, record) => {
        if (text == 'pending') {
          setStatusColor('orange');
        } else {

          setStatusColor('red');
        }
        return (
          <>
            <Tag color={statusColor} key={text}>
              {text}
            </Tag>
          </>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <>
           <Space size="middle">
              <a onClick={() => showModal(record)} >View/Update {record.name}</a>
            </Space>
          </>
        )
      }
    }
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };


  const handleDelete = key => {
    console.log(key)
    const dataSource = [...finalData];

    catalogDelete(key).then(data => {
      setFinalData(data.data);
    },
      error => {
      }
    );

  };



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    //this.setState({
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    // });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };


  return (
    <>
      
      <Table columns={columns} rowkey="_id" dataSource={finalData} />
      <div>
       
       
      </div>
    </>
  );
};

export default OrderScreen