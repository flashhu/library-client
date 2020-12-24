import { Select, Input, Table, Tag, DatePicker } from 'antd';
import { HISTORY_SERACH_OPTIONS } from '@constant/data'
import { BORROW_HISTORY } from '@constant/mock/history'
import './index.less'

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

const onSearch = value => console.log(value);

const columns = [
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
    title: '条码号',
    dataIndex: 'bookId',
    key: 'bookId',
    align: 'center'
  },
  {
    title: '借阅时间',
    dataIndex: 'borrowTime',
    key: 'borrowTime',
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
          if (tag === '有破损') {
            color = 'yellow';
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
];

function BookHistory() {
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
        </div>
    )
}

export default BookHistory