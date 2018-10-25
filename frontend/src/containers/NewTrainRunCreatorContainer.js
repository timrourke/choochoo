import { connect } from 'react-redux';
import {
  closeCreateNewTrainRunModal,
  createNewTrainRun
} from "../actions/trainRuns";
import NewTrainRunCreator
  from "../components/NewTrainRunCreator/NewTrainRunCreator";

const mapStateToProps = state => {
  return {...state.store};
};

const mapDispatchToProps = dispatch => {
  return {
    closeCreateNewTrainRunModal: () => {
      dispatch(closeCreateNewTrainRunModal());
    },
    createNewTrainRun: () => {
      dispatch(createNewTrainRun())
    },
  };
};

const NewTrainRunCreatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTrainRunCreator);

export default NewTrainRunCreatorContainer;
