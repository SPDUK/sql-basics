import React from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import authStore from '../../../../stores/authStore';

// antd stuff
const FormItem = Form.Item;
// TODO: add some kind of persistent warning for email/username invalid with antd
@inject('authStore')
@observer
class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false
    };
  }

  componentDidUpdate() {
    // shows the warning message if one exists
    this.props.authStore.checkRegisterErrors();
  }

  // submits a post request to api/users/register with the form values
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.authStore.registerUser(values);
      }
    });
  };

  // confirmDirty is true if the inputs are all clean and work properly with no errors.
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords must be the same \n');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  validateUsername = (rule, value, callback) => {
    if (value && /^[a-zA-Z0-9]*$/.test(value) === false) {
      callback('Usernames must not include symbols or spaces \n');
    } else {
      callback();
    }
  };

  // validateStatus={authStore.registerErrors.emailtaken ? 'error' : ''}

  render() {
    const { getFieldDecorator } = this.props.form;

    // grid layout for form, 24 (full width) at xs, 8:16 on smaller
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Form className="registerform" onSubmit={this.handleSubmit}>
        <FormItem
          id="username"
          {...formItemLayout}
          label={
            <span>
              Username&nbsp;
              <Tooltip
                placement="top"
                title="Users will see your username publicly, not your email."
              >
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Enter a username between 2 and 30 characters \n',
                whitespace: true,
                min: 2,
                max: 30
              },
              {
                validator: this.validateUsername
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail" id="email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Not a valid Email \n'
              },
              {
                required: true,
                message: 'Please enter an email \n',
                max: 160
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please enter a password \n',
                max: 160
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator('password2', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password \n',
                max: 160
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>

        <div className="registerform-options">
          <Button
            className="registerform-options-register"
            type="primary"
            htmlType="submit"
            loading={authStore.registerLoading}
          >
            Register
          </Button>
          <Button className="registerform-options-login" ghost>
            <a href="/login">Log In</a>
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);
