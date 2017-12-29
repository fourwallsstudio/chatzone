import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AvatarPreview from './avatar_preview';
import AvatarForm from './avatar_form';
import { updateCurrentUser } from 'reducers/session_reducer';
import { currentUserSelector } from 'reducers/selectors';

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 230px;
  height: 334px;
  margin: auto;
  top: 46px; right: 186px;
  background: white;
  border: soild 1px white;
  z-index: 999;
`

class UserSettingsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imagePreview: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.active && nextProps.active !== this.props.active) {
      this.setState({ imagePreview: '' })
    }
  }

  handleSubmit = values => {
    const file = values.get('avatar')[0];
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', this.props.currentUser.get('id'))

    console.log('handle submit', formData);
    this.setState({ imagePreview: '' });
    this.props.toggleModal();
    this.props.updateCurrentUser(formData);
  }

  handleChange = values => {
    const file = values.get('avatar'); 
   
    if (file.length > 0) {
      console.log('file', file);
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ imagePreview: reader.result });
      }
      
      reader.readAsDataURL(file[0]);
    }
  }

  render() {
    const { active, currentUser } = this.props;
    console.log('img', this.state.imagePreview)

    return active ? (
      <Container>
        <AvatarPreview src={ this.state.imagePreview || currentUser.get('avatar') } />
        <AvatarForm 
          onSubmit={ this.handleSubmit }
          onChange={ this.handleChange } />
      </Container>
    ) : null;
  }
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  active: state.getIn(['ui', 'settingsModalActive']),
});

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: data => dispatch(updateCurrentUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);
