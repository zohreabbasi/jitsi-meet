// @flow

import { ReducerRegistry, set } from '../../base/redux';

import { WANTS_TO_BE_IN_PIP_MODE } from './actionTypes';

const INITIAL_STATE = {
    /**
     * This flag indicates whether or not the app's intention is to go into the
     * picture in picture mode in case the app would be minimized.
     */
    wantsToBeInPiPMode: false
};

ReducerRegistry.register('features/pip', (state = INITIAL_STATE, action) => {
    if (action.type === WANTS_TO_BE_IN_PIP_MODE) {
        return set(state, 'wantsToBeInPiPMode', action.wantsToBeInPiPMode);
    }

    return state;
});
