import { Button, Table } from "antd";
import Drawer from "./components/Drawer";
import { useState } from "react";
const App = () => {
  const [open, setOpen] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(!open)}>
        Drawer
      </Button>

      <Drawer
        width={500}
        open={open}
        // destroyOnClose
        onClose={() => setOpen(false)}
      >
        <Table dataSource={dataSource} columns={columns} />
      </Drawer>
    </div>
  );
};

export default App;
