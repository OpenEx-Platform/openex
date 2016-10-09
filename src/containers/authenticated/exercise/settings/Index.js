import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Paper} from '../../../../components/Paper'
import {Button} from '../../../../components/Button'
import * as Constants from '../../../../constants/ComponentTypes'
import {fetchExercise} from '../../../../actions/Exercise'
import ExerciseForm from '../ExerciseForm'
import StatusForm from './StatusForm'

const styles = {
  PaperContent: {
    padding: '20px'
  }
}

class Index extends Component {
  componentDidMount() {
    this.props.fetchExercise(this.props.id);
  }

  onUpdate(data) {
    this.props.updateExercise(data)
  }

  render() {
    console.log('EXERCISE', this.props.exercise)
    let name = this.props.exercise ? this.props.exercise.get('exercise_name') : 'Name'
    let subtitle = this.props.exercise ? this.props.exercise.get('exercise_subtitle') : 'Subtitle'
    let description = this.props.exercise ? this.props.exercise.get('exercise_description') : 'Description'
    let startDate = this.props.exercise ? moment(this.props.exercise.get('exercise_start_date')).toDate() : new Date(2016, 1, 1, 1, 0, 0)
    let endDate = this.props.exercise ? moment(this.props.exercise.get('exercise_end_date')).toDate() : new Date(2016, 1, 1, 1, 0, 0)
    let status = this.props.exercise ? this.props.exercise.get('exercise_status').get('status_name') : 'Scheduled'

    return (
      <div>
        <Paper type={Constants.PAPER_TYPE_SETTINGS} zDepth={2}>
          <div style={styles.PaperContent}>
            <h2>Exercise information</h2>
            <ExerciseForm
              ref="exerciseForm"
              onSubmit={this.onUpdate.bind(this)}
              name="test"
              subtitle="Subtitle test"
              description="test"
              startDate={startDate}
              startTime={startDate}
              endDate={endDate}
              endTime={endDate}
            />
            <br />
            <Button type="submit" label="Update"/>
          </div>
        </Paper>
        <Paper type={Constants.PAPER_TYPE_SETTINGS} zDepth={2}>
          <div style={styles.PaperContent}>
            <h2>Exercise status</h2>
            <StatusForm
              ref="statusForm"
              onSubmit={this.onUpdate.bind(this)}
              />
          </div>
        </Paper>
      </div>
    );
  }
}

Index.propTypes = {
  id: PropTypes.string,
  exercise: PropTypes.object,
  params: PropTypes.object,
  fetchExercise: PropTypes.func.isRequired,
}

const select = (state, ownProps) => {
  let exerciseId = ownProps.params.exerciseId
  return {
    loading: state.application.getIn(['ui', 'loading']),
    id: exerciseId,
    exercise: state.application.getIn(['entities', 'exercises', exerciseId])
  }
}

export default connect(select, {fetchExercise})(Index)