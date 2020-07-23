import React, { Component } from "react";
// import SideActions from "./side/SideActions";
import SideTitle from "./side/SideTitle";
import SideSection from "./side/SideSection";

class ExplorerSide extends Component {
  state = {
    periodSideOpen: false,
    courseSideOpen: false,
    teacherSideOpen: false,
    studentSideOpen: true,
    mainSelected: "",
    studentSelected: "",
    teacherSelected: "",
    courseSelected: "",
    periodSelected: "",
  };
  handleClickMainSide = (name) => {
    switch (name) {
      case "period":
        this.setState((prevState) => ({
          periodSideOpen: !prevState.periodSideOpen,
        }));
        break;
      case "course":
        this.setState((prevState) => ({
          courseSideOpen: !prevState.courseSideOpen,
        }));
        break;
      case "staff":
        this.setState((prevState) => ({
          teacherSideOpen: !prevState.teacherSideOpen,
        }));
        break;
      case "student":
        this.setState((prevState) => ({
          studentSideOpen: !prevState.studentSideOpen,
        }));
        break;
      default:
        break;
    }
    this.setState({ mainSelected: name });
  };

  handleClickPeriodSide = (name) => {
    this.setState({ periodSelected: name });
  };
  handleClickCourseSide = (name) => {
    this.setState({ courseSelected: name });
  };
  handleClickTeacherSide = (name) => {
    this.setState({ teacherSelected: name });
  };
  handleClickStudentSide = (name) => {
    this.setState({ studentSelected: name });
  };

  render() {
    const generalSection = {
      title: "기본관리",
      items: [
        { label: "학기", name: "period", icon: "far fa-calendar-alt" },
        { label: "강의", name: "course", icon: "fas fa-book-open" },
        { label: "강사", name: "staff", icon: "fas fa-chalkboard-teacher" },
        { label: "학생", name: "student", icon: "fas fa-user-graduate" },
      ],
    };
    const scheduleSection = {
      title: "일정관리",
      items: [{ label: "학사일정", name: "schedule", icon: "far fa-clock" }],
    };
    const { mainSelected } = this.state;
    return (
      <React.Fragment>
        <div id={`explorer-side-main`} className="explorer-side">
          <SideTitle>
            재 콜롬비아 <br /> 한국학교
          </SideTitle>
          <SideSection
            key="main-section-general"
            section={generalSection}
            selected={mainSelected}
            onClick={this.handleClickMainSide}
          />
          <SideSection
            key="main-section-schedule"
            section={scheduleSection}
            selected={mainSelected}
            onClick={this.handleClickMainSide}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ExplorerSide;
