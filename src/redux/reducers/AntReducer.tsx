import { Reducer } from 'redux';
import { 
    AntActionTypes, 
    AntActions,
    IAntNameAction,
    IAntLoadingStateAction,
    IAntLikelihoodAction,
    IClearAntsAction,
} from '../actions/AntActions';

export interface IAntState {
    name: string;
    antLoadingState: string;
    likelihood: number;
}

const initialAntDataState: Array<IAntState> = [];

export const AntReducer: Reducer<Array<IAntState>, AntActions> = (
    state: Array<IAntState> = initialAntDataState,
    action: IAntNameAction | IAntLoadingStateAction | IAntLikelihoodAction | IClearAntsAction
) => {
    switch (action.type) {
      case AntActionTypes.ANT_NAME: {
        const cloneArray = JSON.parse(JSON.stringify(state));
        const { name: antName } = action;
        const antIndex = cloneArray.findIndex((antObj: IAntState) => antObj.name === antName);
        if (antIndex === -1) {
            cloneArray.push({
                name: antName,
            })
        }
        return cloneArray;
      }

      case AntActionTypes.ANT_LOADING_STATE: {
        const cloneArray = JSON.parse(JSON.stringify(state));
        const { name: antName } = action;
        const antIndex = cloneArray.findIndex((antObj: IAntState) => antObj.name === antName);
        if (antIndex !== -1) {
            cloneArray[antIndex].antLoadingState = action.antLoadingState;
        }
        return cloneArray;
      }

      case AntActionTypes.ANT_LIKELIHOOD: {
        const cloneArray = JSON.parse(JSON.stringify(state));
        const { name: antName } = action;
        const antIndex = cloneArray.findIndex((antObj: IAntState) => antObj.name === antName);
        if (antIndex !== -1) {
            cloneArray[antIndex].likelihood = action.antLikelihood;
        }
        return cloneArray;
      }

      case AntActionTypes.CLEAR_ANTS: {
        return [];
      }
      
      default:
        return state;
    }
  };
