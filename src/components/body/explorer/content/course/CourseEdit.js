import React, { Component } from "react";
import moment from "moment";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Cascader,
  TimePicker,
  InputNumber,
} from "antd";
import { message, Drawer } from "antd";

const key = "updatable";

const { Option } = Select;
// const { RangePicker } = DatePicker;
const RangePickerTime = TimePicker.RangePicker;

class CourseEdit extends Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  componentDidUpdate(prevProps) {
    if (
      this.formRef.current !== null &&
      prevProps.courseData.id !== this.props.courseData.id
    )
      this.onReset();
  }

  onFinish = (values) => {
    this.props.onClickEdit(false);
    console.log(values);
    // const startDate = values.periodRange[0].format("YYYY-MM-DD");
    // const endDate = values.periodRange[1].format("YYYY-MM-DD");
    // const year = parseInt(values.periodRange[1].format("YYYY"));
    const putData = {
      name: values.courseName.join("-"),
      fee: values.courseFee,
      salary: values.courseSalary,
      period: values.coursePeriod,
      startTime: values.courseTimeRange[0].format("HH:mm:ss"),
      endTime: values.courseTimeRange[1].format("HH:mm:ss"),
      comment: values.couresComment === undefined ? "" : values.courseComment,
    };
    // console.log(JSON.stringify(putData));
    this.props.putCourse(putData, this.props.courseData.id);
    message.loading({
      content: `${values.courseName.join("-")} - 저장 중`,
      key,
    });
    setTimeout(() => {
      message.success({
        content: `${values.courseName.join("-")} - 저장 완료`,
        key,
        duration: 2,
      });
      this.props.resetList();
    }, 1000);
  };
  render() {
    const courseName = ["입문", "초급", "중급", "고급"];
    const children = [
      { value: "A반", label: "A반" },
      { value: "B반", label: "B반" },
      { value: "C반", label: "C반" },
    ];
    const courseOption = courseName.map((name) => {
      return {
        value: name,
        label: name,
        children,
      };
    });

    const courseData = this.props.courseData;
    const periodData = this.props.periodData;

    const displayRender = (labels, selectedOptions) =>
      labels.map((label, i) => {
        const option = selectedOptions[i];
        if (i === labels.length - 1) {
          return <span key={option.value}>{label}</span>;
        }
        return <span key={option.value}>{label} - </span>;
      });
    const periodList = this.props.periodList
      .map((period) => {
        return {
          ...period,
          sortDate: new Date(period.startDate),
        };
      })
      .sort((a, b) => b.sortDate - a.sortDate);
    return (
      <React.Fragment>
        {courseData.name !== undefined && (
          <Drawer
            title={`${periodData.year}/${periodData.name} - ${courseData.name} - 수정하기`}
            width={600}
            onClose={() => this.props.onClickEdit(false)}
            visible={this.props.visible}
          >
            <Form
              layout="vertical"
              ref={this.formRef}
              name="courseEdit"
              onFinish={this.onFinish}
              initialValues={{
                courseTimeRange: [
                  moment(
                    courseData.startTime.substring(
                      0,
                      courseData.startTime.length - 3
                    ),
                    "HH:mm"
                  ),
                  moment(
                    courseData.endTime.substring(
                      0,
                      courseData.endTime.length - 3
                    ),
                    "HH:mm"
                  ),
                ],
                courseFee: courseData.fee,
                courseSalary: courseData.salary,
                courseName: courseData.name.split("-"),
                coursePeriod: courseData.period.id,
                courseComment:
                  courseData.comment !== undefined ? courseData.Comment : "",
              }}
            >
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    name="courseName"
                    label="수업명"
                    rules={[
                      { required: true, message: "수업명을 선택해주세요" },
                    ]}
                  >
                    <Cascader
                      placeholder="수업명을 선택해주세요"
                      expandTrigger="hover"
                      options={courseOption}
                      displayRender={displayRender}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="coursePeriod"
                    label="학기"
                    rules={[{ required: true, message: "학기를 선택해주세요" }]}
                  >
                    <Select
                      placeholder="학기를 선택하세요"
                      allowClear
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {periodList.map((period) => {
                        return (
                          <Option
                            key={`courseCreatePeriod${period.id}`}
                            value={period.id}
                          >
                            {`${period.year}/${period.name}`}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} justify="start">
                <Col span={12}>
                  <Form.Item
                    name="courseTimeRange"
                    label="수업 수업시간"
                    rules={[
                      {
                        required: true,
                        message: "수업 수업시간를 선택해주세요",
                      },
                    ]}
                  >
                    <RangePickerTime style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="courseFee"
                    label="수업료"
                    rules={[
                      { required: true, message: "수업 수업료 입력해주세요" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      step={10000}
                      min={0}
                      // onChange={onChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="courseSalary"
                    label="교사 봉사료"
                    rules={[
                      { required: true, message: "봉사료를 입력해주세요" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      step={10000}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={24}>
                  <Form.Item
                    name="courseComment"
                    label="비고"
                    rules={[
                      {
                        required: false,
                        // message: "please enter url description",
                      },
                    ]}
                  >
                    <Input.TextArea rows={3} placeholder="비고" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8} justify="start">
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      저장
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button
                      type="link"
                      htmlType="button"
                      onClick={() => this.props.onClickEdit(false)}
                    >
                      취소
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button htmlType="button" onClick={this.onReset}>
                      초기화
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        )}
      </React.Fragment>
    );
  }
}

export default CourseEdit;
