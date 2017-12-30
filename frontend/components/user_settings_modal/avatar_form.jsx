import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Roboto', monospace;
  color: black;
  font-size: 24px;
`

const FormField = styled.div`
  position: relative;
  border: solid 1px black;
  height: 40px;
  width: 198px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  input {
    opacity: 0;
    position: absolute; 
    size: 170px;
    height: 100px;
    top: 0; bottom: 0; left: -100px; right: 0;
    font-size: 50px;
    &:hover {
      cursor: pointer;
    }
  }

  span {
    font-size: 18px;
    color: black;
  }
`

const Button = styled.button`
  border: solid 1px black;
  width: 198px;
  height: 40px;
  ling-height: 40px;
  margin: 10px auto 0 auto;
  text-align: center;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const validate = values => {
  const allowed_file_types = ['png', 'jpg', 'jpeg', 'gif'];
  const errors = {};

  const file = values.get('avatar');

  if (file && file.length > 0) {
    console.log('validate', file[0].name)
    const ext = file[0].name.split('.')[1].toLowerCase();
    if (!allowed_file_types.includes(ext)) {
      errors.avatar = 'unsupported file';
    }
  }   

  return errors;
}

const renderInputField = ({ input, children, value, name, type, meta: { touched, error }}) => (
  <FormField>
    <input {...input} type={type} value={value} />
    { touched && error && <span>{error}</span> }
    { !error && children }
  </FormField>
)

let AvatarForm = props => {
  const { handleSubmit, handleChange } = props;

  return (
    <Form onSubmit={ handleSubmit }>
      <Field
        name='avatar'
        onChange={ handleChange }
        component={ renderInputField }
        type='file'
        value='' > 
        choose file
      </Field>
      <Button type='submit'>save</Button>
    </Form>
  )
}

AvatarForm = reduxForm({
  form: 'avatar',
  validate,
})(AvatarForm)

export default AvatarForm;
