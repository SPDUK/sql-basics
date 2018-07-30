import React from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import authStore from '../../../stores/authStore';

// antd stuff
const FormItem = Form.Item;

@inject('authStore')
@observer
class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
    }

  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.authStore.registerUser(values);
        console.log('Received values of form: ', values);
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
      callback('Passwords must be the same');
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
                message: 'Please enter a username',
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Not a valid Email'
              },
              {
                required: true,
                message: 'Please enter an email!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
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
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>

        <FormItem className="registerform-options">
          <Button
            className="registerform-options-button"
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);
