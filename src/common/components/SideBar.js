import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export const SideBar = (props) => {
  return (
    <Sider style={{ background: '#fff' }}>
      <Menu defaultSelectedKeys={['attendence']} mode="inline">
        {props.listMenu.map((menu) => {
          return (
            <Menu.Item icon={menu.icon} key={menu.key}>
              <Link to={menu.path}>{menu.display}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};
