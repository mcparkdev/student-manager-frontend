import React, { Component } from "react";
// import ContentHeader from "./content/ContentHeader";
import ContentBody from "./content/ContentBody";

class ExplorerContent extends Component {
  state = {
    editView: false,
    createView: false,
    visible: false,
  };

  onClickEdit = (view) => {
    // console.log("edit");
    this.setState({ editView: view });
  };
  onClickCreate = (view) => {
    this.setState({ createView: view });
  };

  onClickPrevious = () => {
    console.log("previous");
  };
  onClickNext = () => {
    console.log("next");
  };

  openDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const loadingGET =
      this.props.loadingPeriodGET ||
      this.props.loadingCourseGET ||
      this.props.loadingStaffGET ||
      this.props.loadingStudentGET;
    const loadingPOST =
      this.props.loadingPeriodPOST ||
      this.props.loadingCoursePOST ||
      this.props.loadingStaffPOST ||
      this.props.loadingStudentPOST;
    return (
      <div className="explorer-content">
        {/* <ContentHeader
          {...this.props}
          loadingGET={loadingGET}
          loadingPOST={loadingPOST}
          onClickPrev={this.onClickPrevious}
          onClickNext={this.onClickNext}
          resetList={this.props.resetList}
        /> */}
        <ContentBody
          {...this.props}
          loadingGET={loadingGET}
          loadingPOST={loadingPOST}
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
          onClickEdit={this.onClickEdit}
          onClickCreate={this.onClickCreate}
          onClickPrev={this.onClickPrevious}
          onClickNext={this.onClickNext}
          resetView={this.resetView}
          state={this.state}
          resetList={this.props.resetList}
        />
      </div>
    );
  }
}

export default ExplorerContent;
