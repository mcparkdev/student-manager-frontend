import React, { useState } from "react";
import moment from "moment";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Radio,
  Switch,
  // Tree,
  // Cascader,
} from "antd";
import { message, Drawer } from "antd";
import { Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
// import { server } from "../../../../../redux/store";
const key = "updatable";
const { Option } = Select;

export default function StudentCreate(props) {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "1",
    //   name: "기본 프로필.png",
    //   status: "done",
    //   url: `${server}/media/Anonymous-Avatar.png`,
    // },
  ]);
  const [studentOcupation, setStudentOcupation] = useState("학생");
  const [studentOcupationOther, setStudentOcupationOther] = useState();

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
      message.error("이미지 파일 용량은 최대 5MB입합니다!");
    }
    const encodeImageFileAsURL = (file) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        // console.log("RESULT", reader.result);
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    };
    encodeImageFileAsURL(file);
    // console.log(file);

    return false;
  };

  const onChangeStudentOcupation = (e) => {
    setStudentOcupation(e.target.value);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    props.onClickCreate(false);
    // console.log(values);

    const postData = {
      studentID: values.studentStudentID,
      firstName: values.studentFirstName,
      lastName: values.studentLastName,
      registerDate: values.studentRegisterDate.format("YYYY-MM-DD"),
      birthDate: values.studentBirthDate.format("YYYY-MM-DD"),
      gender: values.studentGender,
      documentType: values.studentDocumentType,
      documentID: parseInt(values.studentDocumentID),
      phoneNumber: parseInt(values.studentPhoneNumber),
      email: values.studentEmail,
      ocupation:
        values.studentOcupation === "기타"
          ? studentOcupationOther
          : studentOcupation,
      course: values.studentCourse,
      address: values.studentAddress,
      guardianFirstName: values.studentGuardianFirstName,
      guardianLastName: values.studentGuardianLastName,
      guardianRelationship: values.studentGuardianRelationship,
      guardianPhoneNumber: parseInt(values.studentGuardianPhoneNumber),
      payedCourse: values.studentPayedCourse,
      comment: values.comment === undefined ? "" : values.comment,
    };
    if (imageBase64 !== null) {
      postData["profileImage"] = imageBase64;
    }

    props.postStudent(postData);

    message.loading({
      content: `${values.studentFirstName} ${values.studentLastName} - 등록 중`,
      key,
    });
    setRedirect(true);
    setTimeout(() => {
      message.success({
        content: `${values.studentFirstName} ${values.studentLastName} - 등록 완료`,
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

  // let year = 0;
  // const years = props.periodList
  //   .filter((period) => {
  //     if (year === period.year) return false;
  //     year = period.year;
  //     return true;
  //   })
  //   .map((period) => {
  //     return period.year;
  //   });
  // const courseByYear = (year) => {
  //   return props.courseList.filter((course) => {
  //     return course.period.year === year;
  //   });
  // };

  // const courseByPeriod = (courseList, periodName) => {
  //   return courseList.filter((course) => {
  //     return course.period.name === periodName;
  //   });
  // };

  // const periodByYear = (year) => {
  //   return props.periodList.filter((period) => {
  //     return period.year === year;
  //   });
  // };

  // const courseByLevel = (courseList, level) => {
  //   return courseList.filter((course) => {
  //     return course.name.includes(level);
  //   });
  // };

  // const courseTreeData = years.map((year) => {
  //   const periods = periodByYear(year);
  //   const courseListByYear = courseByYear(year);
  //   return {
  //     title: year,
  //     key: year,
  //     children: periods.map((period) => {
  //       const coursesByPeriod = courseByPeriod(courseListByYear, period.name);
  //       return {
  //         title: period.name,
  //         key: `${year}/${period.name}`,
  //         children: coursesByPeriod.map((course) => {
  //           const coursesByLevel = courseByLevel(
  //             coursesByPeriod,
  //             course.name.split("-")[0]
  //           );
  //           return {
  //             title: course.name.split("-")[0],
  //             key: `${year}/${period.name}/${course.name.split("-")[0]}`,
  //             children: coursesByLevel.map((course2) => {
  //               return {
  //                 title: course2.name.split("-")[1],
  //                 key: `${year}/${period.name}/${course.name.split("-")[0]}-${
  //                   course2.name.split("-")[1]
  //                 }`,
  //               };
  //             }),
  //           };
  //         }),
  //       };
  //     }),
  //   };
  // });
  // console.log(courseTreeData);

  return (
    <React.Fragment>
      {redirect && <Redirect to="/staffs/" />}
      <Drawer
        title={`새로 만들기`}
        width={600}
        onClose={() => props.onClickCreate(false)}
        visible={props.visible}
      >
        <Form
          layout="vertical"
          form={form}
          name="studentCreate"
          onFinish={onFinish}
          initialValues={{
            studentBirthDate: moment("2000-01-01", "YYYY-MM-DD", true),
            studentGender: "여",
            studentDocumentType: "CC",
            studentRegisterDate: moment(),
            studentOcupation: "학생",
            studentEmail: "@gmail.com",
          }}
        >
          <Row>
            <div className="form-section-title">기본사항</div>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="studentFirstName"
                label="이름"
                rules={[{ required: true, message: "이름을 입력해주세요" }]}
              >
                <Input placeholder="이름" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentLastName"
                label="성"
                rules={[{ required: true, message: "성을 입력해주세요" }]}
              >
                <Input placeholder="영문성명" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="studentBirthDate"
                label="생년월일"
                rules={[{ required: true, message: "생년월일을 선택해주세요" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentGender"
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
                    name="studentDocumentType"
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
                    name="studentDocumentID"
                    noStyle
                    rules={[
                      { required: true, message: "주민번호를 입력해주세요" },
                    ]}
                  >
                    <Input
                      style={{ width: "50%" }}
                      allowClear
                      placeholder="주민번호"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentAddress"
                label="집주소"
                rules={[{ required: true, message: "집주소를 입력해주세요" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  allowClear
                  placeholder="집주소"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="studentOcupation"
                label="직업"
                rules={[{ required: true, message: "직업을 입력해주세요" }]}
              >
                <Radio.Group
                  onChange={onChangeStudentOcupation}
                  value={studentOcupation}
                >
                  <Radio style={radioStyle} value={"학생"}>
                    학생
                  </Radio>
                  <Radio style={radioStyle} value={"직장인"}>
                    직장인
                  </Radio>
                  <Radio style={radioStyle} value={"없음"}>
                    없음
                  </Radio>
                  <Radio style={radioStyle} value={"기타"}>
                    기타
                    {studentOcupation === "기타" ? (
                      <Input
                        style={{ width: 100, marginLeft: 10 }}
                        allowClear
                        value={studentOcupationOther}
                        onChange={(e) =>
                          setStudentOcupationOther(e.target.value)
                        }
                      />
                    ) : null}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentProfilePicture"
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
            <Col span={12}>
              <Form.Item
                name="studentRegisterDate"
                label="등록날짜"
                rules={[{ required: true, message: "등록날짜를 선택해주세요" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentStudentID"
                label="학생 ID"
                rules={[{ required: true, message: "학생 ID를 입력해주세요" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  allowClear
                  placeholder="학생 ID"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item name="studentComment" label="비고">
                <Input.TextArea rows={3} placeholder="비고" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <div className="form-section-title">연락처</div>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="studentPhoneNumber"
                label="핸드폰 번호"
                rules={[
                  { required: true, message: "핸드폰 번호를 입력해주세요" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  allowClear
                  placeholder="폰번호"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentEmail"
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
          <Row>
            <div className="form-section-title">보호자</div>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="studentGuardianFirstName"
                label="이름"
                rules={[
                  { required: true, message: "보호자 이름을 입력해주세요" },
                ]}
              >
                <Input placeholder="보호자 이름" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentGuardianLastName"
                label="성"
                rules={[
                  { required: true, message: "보호자 성을 입력해주세요" },
                ]}
              >
                <Input placeholder="보호자 성" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="studentGuardianRelationship"
                label="관계"
                rules={[
                  { required: true, message: "보호자 관계를 입력해주세요" },
                ]}
              >
                <Input placeholder="보호자 관계" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentGuardianPhoneNumber"
                label="연락처"
                rules={[
                  { required: true, message: "보호자 연락처를 입력해주세요" },
                ]}
              >
                <Input placeholder="보호자 연락처" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <div className="form-section-title">수업</div>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                name="studentCourse"
                label="수업"
                rules={[{ required: true, message: "수업를 선택해주세요" }]}
              >
                {/* <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  // selectedKeys={selectedKeys}
                  treeData={courseTreeData}
                /> */}
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
                    .map((course) => {
                      return (
                        <Option
                          key={`studentCreateCourse${course.id}`}
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
            <Col>
              <Form.Item name="studentPayedCourse" label="납부">
                <Switch checkedChildren="완료" unCheckedChildren="미납" />
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
    </React.Fragment>
  );
}
