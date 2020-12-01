import { Layout, Menu, PageHeader, Button } from "antd";
import {
  // AppstoreOutlined,
  BarChartOutlined,
  // CloudOutlined,
  // ShopOutlined,
  // TeamOutlined, 
  LogoutOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./dashboard.css";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            My Friends
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            My Contatcs
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            My Contats
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<CloudOutlined />}>
                            My Contatcs
                        </Menu.Item> */}
          <Menu.Item key="5" icon={<UploadOutlined />}>
            Profile
          </Menu.Item>
          {/* <Menu.Item key="6" icon={<AppstoreOutlined />}>
                            nav 6
                        </Menu.Item>
                        <Menu.Item key="7" icon={<TeamOutlined />}>
                            nav 7
                        </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <PageHeader
          ghost={true}
        //   onBack={() => window.history.back()}
          title="Title"
        //   subTitle="This is a subtitle"
          extra={[
              <Button type="primary" style={{background: "#070235db", borderRadius: '1rem'}}>
                <LogoutOutlined rotate="-90" />
                SignOut
            </Button>
          ]}
        ></PageHeader>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            ...
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design Components designed By Mubbasher©2020
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
