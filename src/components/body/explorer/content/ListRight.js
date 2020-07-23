import React from "react";
import Create from "./crud/Create";
import Delete from "./crud/Delete";
import moment from "moment";
import ContentHeader from "./ContentHeader";
// import { ConsoleSqlOutlined } from "@ant-design/icons";

export default function ListRight(props) {
  const data = props.data;
  const listContent = () => {
    return (
      <>
        <div className="content-right-main-title">{props.name} 관리</div>
        <div className="content-right-main-phone">
          현재 {props.name} 수:{" "}
          <span>
            {data.length} {props.nameCounter}
          </span>
        </div>
      </>
    );
  };
  const periodContent = () => {
    const name = props.data.name;
    const year = props.data.year;
    const periodRange = props.data.periodRange;
    const totalCourses = props.data.totalCourses;
    const totalStaffs = props.data.totalStaffs;
    const totalStudents = props.data.totalStudents;
    return (
      <>
        <div className="content-right-main-title">
          <div>{name}</div> <span> {year}년</span>
        </div>
        <div className="content-right-main-periodRange">
          학기기간: <span>{periodRange}</span>
        </div>
        <div className="content-right-main-periodCourses">
          강의 수: <span>{totalCourses}</span>
        </div>
        <div className="content-right-main-periodStaffs">
          강사 수: <span>{totalStaffs}</span>
        </div>
        <div className="content-right-main-periodStudents">
          학생 수: <span>{totalStudents}</span>
        </div>
      </>
    );
  };
  const courseContent = () => {
    const name = props.data.name;
    const periodName = props.data.periodName;
    const periodRange = props.data.periodRange;
    const totalStaffs = props.data.totalStaffs;
    const totalStudents = props.data.totalStudents;
    return (
      <>
        <div className="content-right-main-title">
          <div>{name}</div> <span> {periodName}</span>
        </div>
        <div className="content-right-main-periodRange">
          학기기간: <span>{periodRange}</span>
        </div>
        <div className="content-right-main-periodStaffs">
          강사 수: <span>{totalStaffs}</span>
        </div>
        <div className="content-right-main-periodStudents">
          학생 수: <span>{totalStudents}</span>
        </div>
      </>
    );
  };
  const staffContent = () => {
    const name = props.data.name;
    const phoneNumber = props.data.phoneNumber;
    const email = props.data.email;
    const age = moment().diff(props.data.birthDate, "years");
    return (
      <>
        <div className="content-right-main-title">
          <div>{name}</div> <span> {age}세</span>
        </div>
        <div className="content-right-main-phone">
          핸드폰 번호: <span>{phoneNumber}</span>
        </div>
        <div className="content-right-main-email">
          이메일: <span>{email}</span>
        </div>
      </>
    );
  };
  const studentContent = () => {
    // console.log(props.data);
    const firstName = props.data.firstName;
    const lastName = props.data.lastName;
    const phoneNumber = props.data.phoneNumber;
    const email = props.data.email;
    const age = moment().diff(props.data.birthDate, "years");
    return (
      <>
        <div className="content-right-main-title">
          <div>
            {firstName} {lastName}{" "}
          </div>
          <span> {age}세</span>
        </div>
        {/* <div className="content-right-main-title">
          
        </div> */}
        <div className="content-right-main-phone">
          핸드폰 번호: <span>{phoneNumber}</span>
        </div>
        <div className="content-right-main-email">
          이메일: <span>{email}</span>
        </div>
      </>
    );
  };
  // console.log(props);
  return (
    <div className="content-right">
      <ContentHeader {...props} />
      <div className="content-right-main">
        <div className="content-right-main-content">
          {props.isList && listContent()}
          {props.isPeriod && periodContent()}
          {props.isCourse && courseContent()}
          {props.isStaff && staffContent()}
          {props.isStudent && studentContent()}
        </div>
        <div className="content-right-main-cd">
          <Create label="새로 만들기" {...props} />
          {!props.isList && <Delete label="삭제하기" {...props} />}
        </div>
      </div>
      <div className="content-right-tabs">{props.children}</div>
    </div>
  );
}
