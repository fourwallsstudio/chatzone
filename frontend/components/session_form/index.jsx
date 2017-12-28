import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

const Form = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Roboto', monospace;
  color: ghostwhite;
  font-size: 24px;
  margin-top: 10px;
`

const FormField = styled.div`
  position: relative;
  width: 100%;
  border: solid 1px ghostwhite;
  height: 42px;
  padding-left: 10px;
  line-height: 42px;
  margin-right: 10px;
  input::webkit-input-placeholder {
    color: lightgrey;
    line-height: 42px;
  }
  span {
    position: absolute;
    top: 34px;
    left: 10px;
    font-size: 12px;
  }
`

const Button = styled.button`
  border: solid 1px ghostwhite;
  padding: 0 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const TextButton = styled.button`
  position: absolute;
  top: 50px;
  right: 10px;
  font-size: 12px;
`

const validate = (values) => {
  const errors = {};
  const req = 'required';

  if (!values.get('username')) errors.username = req;
  if (!values.get('password')) errors.password = req;
  
  return errors;
}

const renderInputField = ({ input, label, name, type, meta: { touched, error }}) => (
  <FormField>
    <input {...input} placeholder={label} type={type} autoComplete="off" />
    { touched && error && <span>{error}</span> } 
  </FormField>
)

let SessionForm = props => {
  const { handleSubmit, formType, updateSessionFormType } = props;
  
  return (
    <Form onSubmit={ handleSubmit }>
      <Field
        name='username'
        component={ renderInputField }
        type='text'
        label='username' />

      <Field
        name='password'
        component={ renderInputField }
        type='password'
        label='password' />

      <Button
        type='submit'>
        { formType }
      </Button>

      <TextButton 
        type='button'
        onClick={ updateSessionFormType } >
        { formType === 'login' ? 'signup' : 'login' }
      </TextButton>
    </Form>
  )
}

SessionForm = reduxForm({
  form: 'session',
  validate,
})(SessionForm)

export default SessionForm;
