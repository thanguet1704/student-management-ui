import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
  { id: 'name', label: 'Tên sinh viên', minWidth: 170, align: 'center' },
  { id: 'msv', label: 'Mã sinh viên', minWidth: 100, align: 'center' },
  {
    id: 'subject',
    label: 'Chuyên đề',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'inDate',
    label: 'Thời gian vào',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'outDate',
    label: 'Thời gian ra',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'date',
    label: 'Ngày',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'teacher',
    label: 'Giảng viên',
    minWidth: 170,
    align: 'center',
  },
];

function createData(stt, name, msv, subject, inDate, outDate, date, teacher) {
  return { stt, name, msv, subject, inDate, outDate, date, teacher };
}

const rows = [
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
  ),
  createData(
    '1',
    'Trần Hoài An',
    '17021037',
    'Những nguyên lý cơ bản của chủ nghĩa mác lênin',
    '09:12',
    '20:03',
    '24/03/2021',
    'Trần Châu'
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

export const TableAttendence = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
  );
};
