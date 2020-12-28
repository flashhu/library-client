import { Select, Input, Table, Tag, DatePicker, Space, Modal, message } from 'antd';
import { HISTORY_SERACH_OPTIONS } from '@constant/data'
import { BORROW_HISTORY_BEFORE, BORROW_HISTORY_AFTER } from '@constant/mock/history'
import './index.less'
import { useState } from 'react';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

function BookHistory() {

  const [isModalVisible_renew,setIsModalVisible_renew] = useState(false);
  const [BORROW_HISTORY,setTableDataSource_renew] = useState(BORROW_HISTORY_BEFORE);
  
  const onSearch = value => console.log(value);

  const showModal_renew = () => {
    setIsModalVisible_renew(true);
  };
  const handleOk_renew = () => {
    message.success('续借成功！')
    setTableDataSource_renew(BORROW_HISTORY_AFTER)
    setIsModalVisible_renew(false)
  }
  const handleCancel_renew = () => {
    setIsModalVisible_renew(false)
  }

  const columns = [
      {
        title: '条码号',
        dataIndex: 'bookId',
        key: 'bookId',
        align: 'center'
      },  
      {
        title: '题名',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '责任者',
        dataIndex: 'author',
        key: 'author',
        // ellipsis: true,
      },
      {
        title: '借阅时间',
        dataIndex: 'borrowTime',
        key: 'borrowTime',
        align: 'center'
      },
      {
        title: '应还日期',
        dataIndex: 'returnDate',
        key: 'returnDate',
        align: 'center'
      },
      {
        title: '书刊状态',
        key: 'tags',
        dataIndex: 'tags',
        width: 150,
        align: 'center',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = 'green';
              if (tag === '已逾期') {
                color = 'volcano';
              }
              if (tag === '借阅中') {
                color = 'geekblue';
              }
              if (tag === '续借中') {
                color = 'cyan';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: '归还时间',
        dataIndex: 'returnTime',
        key: 'returnTime',
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 120,
        render: (text, record) => (
          <>
          {record.tags.map(tag => {
            if (tag === '借阅中') {
              return (
                <Space size="middle">
                  <span style={{ color: '#1890ff' }} onClick={() => showModal_renew(record)}>续借</span>
                </Space>
              );
            }else {
              return (
                <Space size="middle">
                    <span className="cancel-disable">不可续借</span>
                </Space>
              );
            }
          })}
      </>
      ),
        // render: () => (
        //     <Space size="middle">
        //         <a onClick={() => showModal_renew()}>续借</a>
        //     </Space>
        //   ),
      }
    ];
      return (
          <div>
              <div className="head-wrapper">
                  <div className="head-title">借阅记录</div>
                  <div>
                  <Input.Group compact>
                      <Select style={{ width: 100 }} defaultValue={HISTORY_SERACH_OPTIONS[0].id || ''}>
                          {HISTORY_SERACH_OPTIONS.map(item =>
                              <Option value={item.id} key={item.id}>{item.name}</Option>
                          )}
                      </Select>
                      <RangePicker picker="month" style={{ width: 200 }} />
                      <Search className="search-bar" defaultValue="" placeholder="搜索图书..." onSearch={onSearch} enterButton />
                  </Input.Group>
                  </div>
              </div>
              <Table columns={columns} dataSource={BORROW_HISTORY} />
                  <Modal
                      title="续借确认"
                      visible={isModalVisible_renew}
                      onOk={handleOk_renew}
                      onCancel={handleCancel_renew}
                      destroyOnClose
                  >
                      <span>续借期30天，确认续借该书？</span>
                  </Modal>
          </div>
      )
}

export default BookHistory