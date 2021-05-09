import 'date-fns';
import { Route } from 'react-router-dom';
import { TableStudentInfo } from './components/TableStudentInfo';
import { TableTeacherInfo } from './components/TableTeacherInfo';

const Member = () => {
  return (
    <div>
      <Route path="/admin/studentInfo" exact>
        <TableStudentInfo />
      </Route>
      <Route path="/admin/teacherInfo" exact>
        <TableTeacherInfo />
      </Route>
    </div>
  );
};

export default Member;
