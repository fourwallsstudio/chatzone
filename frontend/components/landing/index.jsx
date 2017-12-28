import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Title from 'components/title';
import SessionForm from 'components/session_form';
import { login, signup } from 'reducers/session_reducer';
import { updateSessionFormType } from 'reducers/ui_reducer';
import { 
  sessionFormTypeSelector, 
  currentUserSelector,
  sessionErrorSelector,
} from 'reducers/selectors';

const Container = styled.div`
  width: 60%;
  min-width: 730px;
  margin: 300px auto 0 auto;
`

const Error = styled.p`
  color: red;
  font-family: 'Roboto', monospace;
  font-size: 12px;
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
    const { formType, error, loggedIn } = this.props;

    return !loggedIn 
           ? (
              <Container>
                <Title />
                { error && <Error>{ error }</Error> }
                <SessionForm 
                  formType={ formType } 
                  error={ error }
                  onSubmit={ this.handleSubmit } 
                  updateSessionFormType={ this.handleUpdateFormType } />
              </Container>
           ) : null;
  }
}

const mapStateToProps = state => ({
  loggedIn: Boolean(currentUserSelector(state)),
  formType: sessionFormTypeSelector(state), 
  error: sessionErrorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  login: formData => dispatch(login(formData)),
  signup: formData => dispatch(signup(formData)),
  updateSessionFormType: formType => dispatch(updateSessionFormType(formType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
