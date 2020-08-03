import React from "react";
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

export default function CourseCreate(props) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    props.onClickCreate(false);
    // console.log(values);
    const postData = {
      name: values.courseName.join("-"),
      fee: values.courseFee,
      salary: values.courseSalary,
      period: values.coursePeriod,
      startTime: values.courseTimeRange[0].format("HH:mm:ss"),
      endTime: values.courseTimeRange[1].format("HH:mm:ss"),
      comment: values.couresComment === undefined ? "" : values.courseComment,
    };
    // console.log(postData);
    props.postCourse(postData);
    message.loading({
      content: `${values.courseName.join("-")} - 등록 중`,
      key,
    });
    setTimeout(() => {
      message.success({
        content: `${values.courseName.join("-")} - 등록 완료`,
        key,
        duration: 2,
      });
      props.resetList();
    }, 1000);
  };

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

  const displayRender = (labels, selectedOptions) =>
    labels.map((label, i) => {
      const option = selectedOptions[i];
      if (i === labels.length - 1) {
        return <span key={option.value}>{label}</span>;
      }
      return <span key={option.value}>{label} - </span>;
    });
  const periodList = props.periodList
    .map((period) => {
      return {
        ...period,
        sortDate: new Date(period.startDate),
      };
    })
    .sort((a, b) => b.sortDate - a.sortDate);
  return (
    <Drawer
      title={`새로 만들기`}
      width={600}
      onClose={() => props.onClickCreate(false)}
      visible={props.visible}
    >
      <Form
        layout="vertical"
        form={form}
        name="courseCreate"
        onFinish={onFinish}
        initialValues={{
          courseTimeRange: [moment("1:00", "HH:mm"), moment("3:30", "HH:mm")],
          courseFee: 200000,
          courseSalary: 400000,
          courseName: ["입문", "A반"],
          coursePeriod: periodList[0] !== undefined ? periodList[0].id : 1,
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="courseName"
              label="수업명"
              rules={[{ required: true, message: "수업명을 선택해주세요" }]}
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
                { required: true, message: "수업 수업시간를 선택해주세요" },
              ]}
            >
              <RangePickerTime />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="courseFee"
              label="수업료"
              rules={[{ required: true, message: "수업 수업료 입력해주세요" }]}
            >
              <InputNumber
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
          <Col>
            <Form.Item
              name="courseSalary"
              label="교사 봉사료"
              rules={[{ required: true, message: "봉사료를 입력해주세요" }]}
            >
              <InputNumber
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
