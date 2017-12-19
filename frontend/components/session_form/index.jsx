import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto', monospace;
  color: ghostwhite;
  font-size: 24px;
`
const FormField = styled.div`
  border: solid 2px ghostwhite;
  height: 60px;
  input::webkit-input-placeholder {
    color: lightgrey;
  }
  span {
    position: relative;
    top: -30px;
    left: 0;
  }
`
const Button = styled.button`

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
    <input {...input} placeholder={label} type={type} />
    { touched && error && <span>{error}</span> }
  </FormField>
)

let SessionForm = ({ handleSubmit, formType }) => {
  return (
    <Form onSubmit={ handleSubmit } >
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
    </Form>
  )
}

SessionForm = reduxForm({
  form: 'session',
  validate,
})(SessionForm)

export default SessionForm;
