import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Roboto', monospace;
  color: ghostwhite;
  margin-top: 10px;
`

const FormField = styled.div`
  width: 100%;
  height: 40px;
  border: solid 1px ghostwhite;
  padding-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  
  input {
    width: 100%;
    height: 100%;
  }

  input::webkit-input-placeholder {
    color: lightgrey;
  }
`

const Button = styled.button`
  height: 40px;
  border: solid 1px ghostwhite;
  padding: 0 10px;
  font-size: 24px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const renderInputField = ({ input, label, name, type }) => (
  <FormField>
    <input {...input} placeholder={label} type={type} autocomplete="off" />
  </FormField>
)

let MessageForm = props => {

  return (
    <Form onSubmit={ props.handleSubmit }>
      <Field
        name='message'
        component={ renderInputField }
        type='text'
        label='message' />

      <Button type='submit'>send</Button>
    </Form>
  )
}

MessageForm = reduxForm({
  form: 'message',
})(MessageForm)

export default MessageForm;
