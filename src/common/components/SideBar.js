import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const SideBar = (props) => {
  return (
    <Sider style={{ background: '#fff' }}>
      <Menu defaultSelectedKeys={['attendence']} mode="inline">
        {props.listMenu
          .filter((item) => {
            if (props.role === 'student' || props.role === 'teacher') {
              return item.public === true;
            }

            return item;
          })
          .map((menu) => {
            if (menu.subMenu) {
              return (
                <SubMenu key={menu.key} icon={menu.icon} title={menu.display}>
                  {menu.subMenu.map((item) => {
                    return (
                      <Menu.Item key={item.key}>
                        <Link to={item.path}>{item.display}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            }

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
