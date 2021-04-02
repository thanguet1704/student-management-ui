import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const days = [
  {
    value: 'day0',
    display: '',
  },
  {
    value: 'day1',
    display: 'Thứ 2',
  },
  {
    value: 'day2',
    display: 'Thứ 3',
  },
  {
    value: 'day3',
    display: 'Thứ 4',
  },
  {
    value: 'day4',
    display: 'Thứ 5',
  },
  {
    value: 'day5',
    display: 'Thứ 6',
  },
  {
    value: 'day6',
    display: 'Thứ 7',
  },
];

const times = [
  {
    value: 'time1',
    display: '07:00-08:00',
  },
  {
    value: 'time2',
    display: '08:00-09:00',
  },
  {
    value: 'time3',
    display: '09:00-10:00',
  },
  {
    value: 'time4',
    display: '11:00-12:00',
  },
  {
    value: 'time5',
    display: '12:00-13:00',
  },
  {
    value: 'time6',
    display: '13:00-14:00',
  },
  {
    value: 'time7',
    display: '14:00-15:00',
  },
  {
    value: 'time8',
    display: '15:00-16:00',
  },
  {
    value: 'time9',
    display: '16:00-17:00',
  },
  {
    value: 'time10',
    display: '17:00-18:00',
  },
  {
    value: 'time11',
    display: '18:00-19:00',
  },
];

const colors = ['#5BC3B2', '#F7EB7F', '#F5CFF4'];

const useStyles = makeStyles({
  border: {
    width: '600',
    margin: 'auto',
    fontSize: '1.2rem',
    padding: 10,
    textAlign: 'center',
    border: '5px solid #fff',
    borderCollapse: 'collapse',
    wordWrap: 'break-word',
  },
});

export const TableStudentSchedule = (props) => {
  const classes = useStyles();
  return (
    <table className={clsx(classes.border)}>
      <tr>
        {days.map((day) => (
          <th
            className={clsx(classes.border)}
            style={{ width: 200 }}
            id={day.value}
          >
            {day.display}
          </th>
        ))}
      </tr>
      {/* hang1 */}
      <tr>
        <td className={classes.border}>07:00</td>
        <td
          className={clsx(classes.border)}
          rowSpan="2"
          style={{ backgroundColor: colors[Math.floor(Math.random() * 3)] }}
        >
          Các vấn đề hiện đại của Công nghệ thông tin (308-GD2)
        </td>
        <td className={classes.border}></td>
        <td
          className={clsx(classes.border)}
          style={{ backgroundColor: colors[Math.floor(Math.random() * 3)] }}
          rowSpan="3"
        >
          Quản trị mạng (302-G2)
        </td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang2 */}
      <tr>
        <td className={classes.border}>08:00</td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang3 */}
      <tr>
        <td className={classes.border}>09:00</td>
        <td className={classes.border}></td>
        <td
          className={clsx(classes.border)}
          rowSpan="3"
          style={{ backgroundColor: colors[Math.floor(Math.random() * 3)] }}
        >
          Các vấn đề hiện đại của Công nghệ thông tin (308-GD2)
        </td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang4 */}
      <tr>
        <td className={classes.border}>10:00</td>
        <td
          className={clsx(classes.border)}
          rowSpan="4"
          style={{ backgroundColor: colors[Math.floor(Math.random() * 3)] }}
        >
          Mạng không dây (103-G2)
        </td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang5 */}
      <tr>
        <td className={classes.border}>11:00</td>
        <td className={clsx(classes.border)}></td>
        <td className={classes.border}></td>
        <td
          className={clsx(classes.border)}
          rowSpan="4"
          style={{ backgroundColor: colors[Math.floor(Math.random() * 3)] }}
        >
          Mạng không dây (103-G2)
        </td>
        <td className={classes.border}></td>
      </tr>
      {/* hang6 */}
      <tr>
        <td className={classes.border}>12:00</td>
        <td className={clsx(classes.border)}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang7 */}
      <tr>
        <td className={classes.border}>13:00</td>
        <td className={clsx(classes.border)}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang8 */}
      <tr>
        <td className={classes.border}>14:00</td>
        <td className={clsx(classes.border)}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang9 */}
      <tr>
        <td className={classes.border}>15:00</td>
        <td className={clsx(classes.border)}></td>
        <td
          className={clsx(classes.border)}
          rowSpan="3"
          style={{ backgroundColor: colors[Math.floor(Math.random() * 3)] }}
        >
          Quản trị mạng (302-G2)
        </td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang10 */}
      <tr>
        <td className={classes.border}>16:00</td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
      {/* hang11 */}
      <tr>
        <td className={classes.border}>17:00</td>
        <td className={clsx(classes.border)}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
        <td className={classes.border}></td>
      </tr>
    </table>
  );
};
