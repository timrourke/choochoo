import { connect } from 'react-redux';
import {
  closeCreateNewTrainRunModal,
  createNewTrainRun, editTrainRun
} from "../actions/trainRuns";
import NewTrainRunCreator
  from "../components/NewTrainRunCreator/NewTrainRunCreator";

const mapStateToProps = state => {
  return {...state.store};
};

const mapDispatchToProps = dispatch => {
  return {
    editTrainRun: (trainRun) => {
      dispatch(editTrainRun(trainRun));
    },
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
