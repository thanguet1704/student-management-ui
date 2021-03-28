import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';

export const SideBar = (props) => {
  return props.listMenu.map((menu) => {
    return (
      <NavLink
        to={menu.path}
        activeClassName="selected"
        activeStyle={{ textDecoration: 'none' }}
      >
        <ListItem button>
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <ListItemText primary={menu.display} />
        </ListItem>
      </NavLink>
    );
  });
};
