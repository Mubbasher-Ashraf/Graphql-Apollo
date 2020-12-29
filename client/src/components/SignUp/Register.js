import { Form, Input, Tooltip,  Select, Row, Col, Checkbox,//Cascader,
   Button, PageHeader, DatePicker } from 'antd'; //AutoComplete,
import { withRouter, Link } from 'react-router-dom';
import Modal from '../../portals/Modal';
import Loader from '../../common/Loader';
import './register.css';
import 'antd/dist/antd.css';
import { formItemLayout, tailFormItemLayout } from './RegisterHelper';
import { useMutation } from '@apollo/client';
import { User_Sign_Up } from './Graphql';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

const Register = (props) => {
  const [form] = Form.useForm();
  let lds = true;
  const [SignUP, { data, loading, error }] = useMutation(User_Sign_Up);
  //update apollo cache after query
  /*const [SignUP, { data, loading, error }] = useMutation(User_Sign_Up, 
    update(cache, {data: {SIGNUP}}) {
    const allUsersList = cache.readQuery({query: ALL_USER_LIST})
    cache.writeQuery({
    query: ALL_USER_LIST,
    data: {usersList: [SIGNUP, ...allUsersList.data]}
    })
    }
    )
  */
  const getCaptcha = () => {
    let x = Math.random().toString(24);
    x = x.substr(2, x.length);
    form.setFieldsValue({
      captcha: x
    });
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { email, password } = values; //, dob
    SignUP({
      variables: {
        email,
        // username,
        password,
        age: 25//new Date(dob).toISOString()
      }, 
      /** 
       * optimisticResponse: {
          __typename: "Mutation",
          SIGNUP: {
            __typename: 'SignUP',
            id: Math.floor(Math.random() * 1000),
            name: 'abcd',
            pass: 'good',
            img: 'default placeholder'
          }
        }
      */
    })
  };

  if (error) {
    console.log("Error while query-----------", error);
    return null;
  }
  if (lds) {
    console.log('loading------------->', loading);
    <Modal>
      <Loader />
    </Modal>
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
      
  if (data && data.SignUP) {
    console.log('data------------------->', data);
    setTimeout(() => {
      props.history.push("/dashboard");
    }, 2500);
  }
  return (
    <div className="main_div">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        className="custome_class"
        onFinish={onFinish}
        initialValues={{
          // residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <PageHeader className="site-page-header header_class" title="SIGN UP" />
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The Entered E-mail not Valid!',
            },
            {
              required: true,
              message: 'Please Enter your E-mail!',
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please Enter your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter Password"/>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter confirm password" />
        </Form.Item>

        <Form.Item
          name="username"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="dob"
          label={
            <span>
              Date of Birth&nbsp;
              <Tooltip title="Select your date of birth!">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
        >
        <DatePicker renderExtraFooter={() => 'Select Date'} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please Enter your phone number!',
            },
          ]}
        >
          <Input
            placeholder="e.g 3201415680"
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the captcha you got!',
                  },
                ]}
              >
                <Input placeholder="Enter captcha" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button onClick={getCaptcha}>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href={"https://seebiz.com"}>agreement</a>
          </Checkbox>
        </Form.Item>
    
        <Form.Item {...tailFormItemLayout}>
          <Button className="register" type="primary" htmlType="submit" >
            {/* loading */}
            Register
          </Button>
        <Link to={{ pathname: '/Login'}}> already have an account! </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Register);