import { Button, Table } from "antd";
import { useState } from "react";

import Drawer from "./components/Drawer";

const { SecondDrawer } = Drawer;

const App = () => {
  const [open, setOpen] = useState(false);

  const [secondOpen, setSecondOpen] = useState(false);

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
        width={400}
        open={open}
        onClose={() => setOpen(false)}
        title={"Basic Drawer"}
      >
        <Table dataSource={dataSource} columns={columns} />
        <Button onClick={() => setSecondOpen(!secondOpen)}>二级开关</Button>

        <SecondDrawer
          width={600}
          open={secondOpen}
          onClose={() => setSecondOpen(false)}
        >
          123
        </SecondDrawer>
      </Drawer>
    </div>
  );
};

export default App;
