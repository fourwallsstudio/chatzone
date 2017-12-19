import React from 'react';
import { connect } from 'react-redux';
import Title from 'components/title';
import SessionForm from 'components/session_form';
import { login, signup } from 'reducers/session_reducer';

class Landing extends React.Component {

  handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('username', values.get('username'));
    formData.append('password', values.get('password'));

    if (this.props.formType === 'login') {
      this.props.login(formData);
    } else {
      this.props.signup(formData);
    }
  }

  render() {
    return (
      <section>
        <Title />
        <SessionForm formType={ this.props.formType } onSubmit={ this.handleSubmit } />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  formType: 'login',
});

const mapDispatchToProps = dispatch => ({
  login: formData => dispatch(login(formData)),
  signup: formData => dispatch(signup(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
