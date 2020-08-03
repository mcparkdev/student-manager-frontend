import React, { useState, useEffect } from "react";
import moment from "moment";
import { Form, Button, Col, Row, Input, Select, DatePicker, Radio } from "antd";
import { message, Drawer } from "antd";
import { Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// import { Redirect } from "react-router-dom";
const key = "updatable";
const { Option } = Select;

export default function StaffEdit(props) {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  // const [redirect, setRedirect] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: `staff-${props.staffData.id}`,
      name:
        props.staffData.profileImage !== undefined
          ? `${props.staffData.name}.${props.staffData.profileImage
              .split(".")
              .pop()}`
          : "프로필.png",
      status: "done",
      url: props.staffData.profileImage,
    },
  ]);
  const [staffOcupation, setStaffOcupation] = useState(
    ["대학생", "직장인", "없음"].includes(props.staffData.ocupation)
      ? props.staffData.ocupation
      : "기타"
  );
  const [staffOcupationOther, setStaffOcupationOther] = useState(
    ["대학생", "직장인", "없음"].includes(props.staffData.ocupation)
      ? ""
      : props.staffData.ocupation
  );

  useEffect(() => {
    setStaffOcupation(
      ["대학생", "직장인", "없음"].includes(props.staffData.ocupation)
        ? props.staffData.ocupation
        : "기타"
    );
    setStaffOcupationOther(
      ["대학생", "직장인", "없음"].includes(props.staffData.ocupation)
        ? ""
        : props.staffData.ocupation
    );
    setFileList([
      {
        uid: `staff-${props.staffData.id}`,
        name:
          props.staffData.profileImage !== undefined
            ? `${props.staffData.name}.${props.staffData.profileImage
                .split(".")
                .pop()}`
            : "프로필.png",
        status: "done",
        url: props.staffData.profileImage,
      },
    ]);
    form.resetFields();
  }, [props.staffData, form]);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("JPG/PNG 형식이 아닙니다!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("이미지 파일 용량은 최대 2MB입니다!");
    }
    const encodeImageFileAsURL = (file) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log("RESULT", reader.result);
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    };
    encodeImageFileAsURL(file);
    // console.log(file);

    return false;
  };

  const onChangeStaffOcupation = (e) => {
    setStaffOcupation(e.target.value);
  };

  const onFinish = (values) => {
    props.onClickEdit(false);
    console.log(values);
    const putData = {
      name: values.staffName,
      englishName: values.staffEnglishName,
      registerDate: values.staffRegisterDate.format("YYYY-MM-DD"),
      birthDate: values.staffBirthDate.format("YYYY-MM-DD"),
      gender: values.staffGender,
      documentType: values.staffDocumentType,
      documentID: parseInt(values.staffDocumentID),
      phoneNumber: parseInt(values.staffPhoneNumber),
      email: values.staffEmail,
      ocupation:
        values.staffOcupation === "기타" ? staffOcupationOther : staffOcupation,
      course: values.staffCourse,
      comment: values.comment === undefined ? "" : values.comment,
    };

    if (imageBase64 !== null) {
      putData["profileImage"] = imageBase64;
    }
    props.putStaff(putData, props.staffData.id);
    message.loading({ content: `${values.staffName} - 저장 중`, key });
    // setRedirect(true);
    setTimeout(() => {
      message.success({
        content: `${values.staffName} - 저장 완료`,
        key,
        duration: 2,
      });
      props.resetList();
    }, 1500);
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  // const studentList = props.studentList;
  const staff = props.staffData;
  // const course = props.courseData;
  // const period = props.periodData;
  // console.log(staff);
  return (
    <React.Fragment>
      {/* {redirect && <Redirect to="/" />} */}
      <Drawer
        title={`${staff.name} - 수정하기`}
        width={600}
        onClose={() => props.onClickEdit(false)}
        visible={props.visible}
      >
        <Form
          layout="vertical"
          form={form}
          name="periodEdit"
          onFinish={onFinish}
          initialValues={{
            staffName: staff.name,
            staffEnglishName: staff.englishName,
            staffBirthDate: moment(staff.birthDate, "YYYY-MM-DD", true),
            staffGender: staff.gender,
            staffDocumentType: staff.documentType,
            staffDocumentID: staff.documentID,
            staffPhoneNumber: staff.phoneNumber,
            staffRegisterDate: moment(staff.registerDate, "YYYY-MM-DD"),
            staffEmail: staff.email,
            staffOcupation: ["대학생", "직장인", "없음"].includes(
              staff.ocupation
            )
              ? staff.ocupation
              : "기타",
            staffCourse:
              staff.course !== undefined
                ? staff.course.map((course) => course.id)
                : [],
            staffComment: staff.comment !== undefined ? staff.comment : "",
          }}
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="staffName"
                label="성명"
                rules={[{ required: true, message: "성명을 입력해주세요" }]}
              >
                <Input placeholder="성명" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="staffEnglishName"
                label="영문성명"
                rules={[{ required: true, message: "영문성명을 입력해주세요" }]}
              >
                <Input placeholder="영문성명" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="staffBirthDate"
                label="생년월일"
                rules={[{ required: true, message: "생년월일을 선택해주세요" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="staffGender"
                label="성별"
                rules={[{ required: true, message: "성별을 선택해주세요" }]}
              >
                <Select
                  placeholder="성별을 선택해주세요"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="여">여</Option>
                  <Option value="남">남</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="주민번호">
                <Input.Group compact>
                  <Form.Item
                    name="staffDocumentType"
                    noStyle
                    rules={[
                      { required: true, message: "신분증 종류를 선택해주세요" },
                    ]}
                  >
                    <Select style={{ minWidth: "fit-content" }}>
                      <Option value="TI">TI (미성년자)</Option>
                      <Option value="CC">CC (현지인)</Option>
                      <Option value="CE">CE (외국인)</Option>
                      <Option value="PA">PA (외국인)</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="staffDocumentID"
                    noStyle
                    rules={[
                      { required: true, message: "주민번호를 입력해주세요" },
                    ]}
                  >
                    <Input style={{ width: "55%" }} allowClear />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="staffPhoneNumber"
                label="폰번호"
                rules={[{ required: true, message: "폰번호를 입력해주세요" }]}
              >
                <Input style={{ width: "100%" }} allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="staffRegisterDate"
                label="등록날짜"
                rules={[{ required: true, message: "등록날짜를 선택해주세요" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="staffEmail"
                label="이메일"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "이메일을 입력해주세요",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="staffOcupation"
                label="직업"
                rules={[{ required: true, message: "직업을 입력해주세요" }]}
              >
                <Radio.Group
                  onChange={onChangeStaffOcupation}
                  value={staffOcupation}
                >
                  <Radio style={radioStyle} value={"대학생"}>
                    대학생
                  </Radio>
                  <Radio style={radioStyle} value={"직장인"}>
                    직장인
                  </Radio>
                  <Radio style={radioStyle} value={"없음"}>
                    없음
                  </Radio>
                  <Radio style={radioStyle} value={"기타"}>
                    기타
                    {staffOcupation === "기타" ? (
                      <Input
                        style={{ width: 100, marginLeft: 10 }}
                        allowClear
                        value={staffOcupationOther}
                        onChange={(e) => setStaffOcupationOther(e.target.value)}
                      />
                    ) : null}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="staffProfilePicture"
                label="프로필 사진"
                help="원본파일이 저장됩니다"
              >
                <div className="clearfix">
                  <Upload
                    listType="picture"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                  >
                    {fileList.length >= 1 ? null : (
                      <Button>
                        <UploadOutlined /> 업로드
                      </Button>
                    )}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                name="staffCourse"
                label="수업"
                rules={[{ required: true, message: "수업를 선택해주세요" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="수업를 선택하세요"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.courseList
                    .map((course) => {
                      return {
                        ...course,
                        sortDate: new Date(course.period.startDate),
                      };
                    })
                    .sort((a, b) => a.sortDate - b.sortDate)
                    .filter((course) => {
                      return (
                        props.staffList.filter((staff) => {
                          return (
                            staff.course.filter((staffCourse) => {
                              return staffCourse.id === course.id;
                            }).length > 0
                          );
                        }).length === 0
                      );
                    })
                    .concat(staff.course)
                    .map((course) => {
                      return (
                        <Option
                          key={`staffEditCourse${course.id}`}
                          value={course.id}
                        >
                          {`${course.name} - ${course.period.year}/${course.period.name}`}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item name="staffComment" label="비고">
                <Input.TextArea rows={3} placeholder="비고" allowClear />
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
                  onClick={() => props.onClickEdit(false)}
                >
                  취소
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  초기화
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </React.Fragment>
  );
}
