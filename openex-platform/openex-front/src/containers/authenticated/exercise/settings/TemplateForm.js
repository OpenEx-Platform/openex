import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '../../../../components/TextField';
import { Select } from '../../../../components/Select';
import { i18nRegister } from '../../../../utils/Messages';
import { T } from '../../../../components/I18n';

i18nRegister({
  fr: {
    'Messages header': 'En-tête des messages',
    'Messages footer': 'Pied des messages',
    'Exercise control (animation)': "Direction de l'animation",
  },
});

class TemplateForm extends Component {
  render() {
    const { onSubmit, initialValues } = this.props;
    return (
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form id="templateForm" onSubmit={handleSubmit}>
            <TextField
              name="exercise_message_header"
              fullWidth={true}
              type="text"
              label={<T>Messages header</T>}
            />
            <TextField
              name="exercise_message_footer"
              fullWidth={true}
              type="text"
              label={<T>Messages footer</T>}
              style={{ marginTop: 20 }}
            />
            <Select
              label={<T>Exercise control (animation)</T>}
              name="exercise_animation_group"
              fullWidth={true}
              style={{ marginTop: 20 }}
            >
              <MenuItem value={null}> &nbsp; </MenuItem>
              {this.props.groups.map((data) => (
                <MenuItem key={data.group_id} value={data.group_id}>
                  {data.group_name}
                </MenuItem>
              ))}
            </Select>
          </form>
        )}
      </Form>
    );
  }
}

TemplateForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  groups: PropTypes.array,
};

export default TemplateForm;
