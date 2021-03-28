import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import 'date-fns';
import moment from 'moment';
import React from 'react';

const columns = [
  { id: 'stt', label: 'STT', maxWidth: 50, align: 'center' },
  { id: 'room', label: 'Phòng học', maxWidth: 100, align: 'center' },
  {
    id: 'absent',
    label: 'Vắng',
    maxWidth: 70,
    align: 'center',
  },
  {
    id: 'population',
    label: 'Sĩ số',
    maxWidth: 70,
    align: 'center',
  },
  {
    id: 'lesson',
    label: 'Chuyên đề',
    maxWidth: 170,
    align: 'center',
  },
  {
    id: 'teacher',
    label: 'Giảng viên',
    maxWidth: 170,
    align: 'center',
  },
  {
    id: 'monitor',
    label: 'Người giám sát',
    maxWidth: 170,
    align: 'center',
  },
  {
    id: 'date',
    label: 'Thời gian',
    maxWidth: 170,
    align: 'center',
  },
];

function createData(
  stt,
  room,
  absent,
  population,
  lesson,
  teacher,
  monitor,
  date
) {
  return { stt, room, absent, population, lesson, teacher, monitor, date };
}

const rows = [
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
  createData(
    '1',
    '302-G2',
    2,
    40,
    'Mạng không dây',
    'Trần Trọng',
    'Nguyễn Quý',
    '12/3/2021'
  ),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export const Report = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2021-03-03T12:00:00')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [age, setAge] = React.useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <label for="type-table">Lựa chọn: </label>
      <select name="type-table" id="type-table">
        <option selected value="room">
          Lớp
        </option>
        <option value="student">Sinh viên</option>
      </select>
      <label for="birthday">Start Date: </label>
      <input type="date" id="birthday" name="birthday" />
      <label for="birthday">End Date: </label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        value={moment().subtract(10, 'days').calendar()}
      />
      <Paper className={classes.root} style={{ marginTop: 50 }}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ maxWidth: column.maxWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
