import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

let SessionForm = () => {

}

SessionForm = reduxForm({
  form: 'session',
})(SessionForm)

export default SessionForm;
