import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Title from 'components/title';
import SessionForm from 'components/session_form';
import { login, signup } from 'reducers/session_reducer';
import { updateSessionFormType } from 'reducers/ui_reducer';
import { sessionFormTypeSelector, currentUserSelector } from 'reducers/selectors';

const Container = styled.div`
  width: 60%;
  min-width: 730px;
  margin: 300px auto 0 auto;
`

class Landing extends React.Component {

  handleSubmit = values => {
    const formData = new FormData();

    formData.append('username', values.get('username'));
    formData.append('password', values.get('password'));

    if (this.props.formType === 'login') {
      this.props.login(formData);
    } else {
      this.props.signup(formData);
    }
  }

  handleUpdateFormType = () => {
    const newFormType = this.props.formType === 'login' ? 'signup' : 'login';
    this.props.updateSessionFormType(newFormType);
  }

  render() {
    return !this.props.loggedIn 
           ? (
              <Container>
                <Title />
                <SessionForm 
                  formType={ this.props.formType } 
                  onSubmit={ this.handleSubmit } 
                  updateSessionFormType={ this.handleUpdateFormType } />
              </Container>
           ) : null;
  }
}

const mapStateToProps = state => ({
  loggedIn: Boolean(currentUserSelector(state)),
  formType: sessionFormTypeSelector(state), 
});

const mapDispatchToProps = dispatch => ({
  login: formData => dispatch(login(formData)),
  signup: formData => dispatch(signup(formData)),
  updateSessionFormType: formType => dispatch(updateSessionFormType(formType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
