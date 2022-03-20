import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAntState } from '../reducers/AntReducer';
import { generateAntWinLikelihoodCalculator } from '../../constants/tableCalc';
import { getByPlaceholderText } from '@testing-library/react';

export enum AntActionTypes {
    ANT_NAME = 'ANT_NAME',
    ANT_LOADING_STATE = 'ANT_LOADING_STATE',
    ANT_LIKELIHOOD = 'ANT_LIKELIHOOD',
    CLEAR_ANTS = 'CLEAR_ANTS',
}

export enum AntLoadingStates {
    NOT_YET_RUN = 'NOT YET RUN',
    IN_PROGRESS = 'IN PROGRESS',
    CALCULATED = 'CALCULATED',
    ERROR = 'ERROR',
}

export interface IAntNameAction {
    type: AntActionTypes.ANT_NAME;
    name: string;
}

export interface IAntLoadingStateAction {
    type: AntActionTypes.ANT_LOADING_STATE;
    name: string;
    antLoadingState: AntLoadingStates;
}

export interface IAntLikelihoodAction {
    type: AntActionTypes.ANT_LIKELIHOOD;
    name: string;
    antLikelihood: number;
}

export interface IClearAntsAction {
    type: AntActionTypes.CLEAR_ANTS;
}

export type AntActions = IAntNameAction | IAntLoadingStateAction | IAntLikelihoodAction | IClearAntsAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const updateAntName: ActionCreator<ThunkAction<Promise<any>, IAntState, null, IAntNameAction>> = (antName: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ name: antName, type: AntActionTypes.ANT_NAME });
            dispatch({ name: antName, antLoadingState: AntLoadingStates.IN_PROGRESS, type: AntActionTypes.ANT_LOADING_STATE });
        } catch (err) {
            console.error(err);
            dispatch({ name: antName, antLoadingState: AntLoadingStates.ERROR, type: AntActionTypes.ANT_LOADING_STATE });
        };
    };
};

export const updateAntLikelihood: ActionCreator<ThunkAction<Promise<any>, IAntState, null, IAntNameAction>> = (antName: string) => {
    return async (dispatch: Dispatch) => {
        try {
                const innerFunction = generateAntWinLikelihoodCalculator();
                const myCallbackFunc = (winningLikelihood: number) => {
                    dispatch({ name: antName, antLikelihood: winningLikelihood, type: AntActionTypes.ANT_LIKELIHOOD });
                }
                await new Promise(() => innerFunction(myCallbackFunc));
        } catch (err) {
            console.error(err);
            dispatch({ name: antName, antLoadingState: AntLoadingStates.ERROR, type: AntActionTypes.ANT_LOADING_STATE });
        };
    };
};

export const updateAntCalculatedStatus: ActionCreator<ThunkAction<Promise<any>, IAntState, null, IAntNameAction>> = (antName: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ name: antName, antLoadingState: AntLoadingStates.CALCULATED, type: AntActionTypes.ANT_LOADING_STATE });
        } catch (err) {
            console.error(err);
            dispatch({ name: antName, antLoadingState: AntLoadingStates.ERROR, type: AntActionTypes.ANT_LOADING_STATE });
        };
    };
};

export const clearAnts: ActionCreator<ThunkAction<Promise<any>, IAntState, null, IAntNameAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: AntActionTypes.CLEAR_ANTS });
        } catch (err) {
            console.error(err);
        };
    };
};
