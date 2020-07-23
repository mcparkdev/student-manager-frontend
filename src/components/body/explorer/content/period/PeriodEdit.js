import React, { Component } from "react";
import { Form, Button, Col, Row, Input, Select, DatePicker } from "antd";
import { message, Drawer } from "antd";
import moment from "moment";

const key = "updatable";

const { Option } = Select;
const { RangePicker } = DatePicker;

class PeriodEdit extends Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  componentDidUpdate(prevProps) {
    if (
      this.formRef.current !== null &&
      prevProps.periodData.id !== this.props.periodData.id
    )
      this.onReset();
  }

  onFinish = (values) => {
    this.props.onClickEdit(false);
    console.log(values);
    const startDate = values.periodRange[0].format("YYYY-MM-DD");
    const endDate = values.periodRange[1].format("YYYY-MM-DD");
    const year = parseInt(values.periodRange[1].format("YYYY"));
    const putData = {
      year,
      name: values.name,
      startDate,
      endDate,
      comment: values.comment === undefined ? "" : values.comment,
    };
    // console.log(JSON.stringify(putData));
    // console.log(this.props.periodData.id);
    this.props.putPeriod(putData, this.props.periodData.id);
    message.loading({ content: `${values.name} - 수정 중`, key });
    this.props.resetList();
    setTimeout(() => {
      message.success({
        content: `${year}/${values.name} - 수정 완료`,
        key,
        duration: 2,
      });
    }, 2000);
  };
  render() {
    // console.log(this.props);
    const period = this.props.periodData;
    return (
      <Drawer
        title={`${period.name} - 수정하기`}
        width={600}
        onClose={() => this.props.onClickEdit(false)}
        visible={this.props.visible}
      >
        {/* <PeriodEditForm period={period} initialValues= */}
        <Form
          layout="vertical"
          ref={this.formRef}
          name="periodEdit"
          onFinish={this.onFinish}
          initialValues={{
            name: period.name,
            periodRange: [
              moment(period.startDate, "YYYY-MM-DD", true),
              moment(period.endDate, "YYYY-MM-DD", true),
            ],
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="학기명"
                rules={[{ required: true, message: "학기명을 입력해주세요" }]}
              >
                <Select
                  placeholder="학기를 선태해주세요"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1학기">1학기</Option>
                  <Option value="2학기">2학기</Option>
                  <Option value="3학기">3학기</Option>
                  <Option value="4학기">4학기</Option>
                  <Option value="5학기">5학기</Option>
                  <Option value="6학기">6학기</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="periodRange"
                label="학기기간"
                rules={[
                  { required: true, message: "학기 기간을 선택해주세요" },
                ]}
              >
                <RangePicker allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="comment" label="비고">
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
    );
  }
}

export default PeriodEdit;
