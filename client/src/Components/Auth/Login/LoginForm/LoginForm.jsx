import React from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import authStore from '../../../../stores/authStore';

// antd stuff
const FormItem = Form.Item;

@inject('authStore')
@observer
class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false
    };
  }

  // submits a post request to api/users/login with the form values
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.authStore.loginUser(values);
      }
    });
  };

  // confirmDirty is true if the inputs are all clean and work properly with no errors.
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
      <Form className="loginform" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="E-mail">
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

        <div className="loginform-options">
          <Button
            className="loginform-options-login"
            type="primary"
            htmlType="submit"
            loading={authStore.loginLoading}
          >
            Log In
          </Button>
          <Button className="loginform-options-signup" ghost>
            <a href="/login">Sign Up</a>
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
