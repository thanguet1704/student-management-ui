import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Thông tin điểm danh" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ScheduleOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Thời khóa biểu" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PermIdentityOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Thông tin" />
    </ListItem>
  </div>
);
