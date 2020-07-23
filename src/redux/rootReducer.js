import { combineReducers } from "redux";
import studentReducer from "./student/studentReducer";
import staffReducer from "./staff/staffReducer";
import courseReducer from "./course/courseReducer";
import periodReducer from "./period/periodReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  student: studentReducer,
  staff: staffReducer,
  course: courseReducer,
  period: periodReducer,
  auth: authReducer,
});

export default rootReducer;
