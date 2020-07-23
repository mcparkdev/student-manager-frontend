import React from "react";

import { Form, Button, Col, Row, Input, Select, DatePicker } from "antd";
import { message, Drawer } from "antd";

const key = "updatable";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function PeriodCreate(props) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    props.onClickCreate(false);
    const startDate = values.periodRange[0].format("YYYY-MM-DD");
    const endDate = values.periodRange[1].format("YYYY-MM-DD");
    const year = parseInt(values.periodRange[1].format("YYYY"));
    const postData = {
      year,
      name: values.name,
      startDate,
      endDate,
      comment: values.comment === undefined ? "" : values.comment,
    };
    // console.log(JSON.stringify(postData));
    props.postPeriod(postData);
    message.loading({ content: `${values.name} - 생성 중`, key });
    setTimeout(() => {
      message.success({
        content: `${values.name} - 생성 완료`,
        key,
        duration: 2,
      });
      props.resetList();
    }, 1000);
  };

  return (
    <Drawer
      title={`학기 - 새로 만들기`}
      width={600}
      onClose={() => props.onClickCreate(false)}
      visible={props.visible}
    >
      <Form
        layout="vertical"
        form={form}
        name="periodCreate"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="학기명"
              rules={[{ required: true, message: "학기명을 입력해주세요" }]}
            >
              <Select
                placeholder="학기를 선택하세요"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
              rules={[{ required: true, message: "학기 기간을 선택해주세요" }]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="comment"
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
                새로 만들기
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="link"
                htmlType="button"
                onClick={() => props.onClickCreate(false)}
              >
                취소
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                초기화
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
