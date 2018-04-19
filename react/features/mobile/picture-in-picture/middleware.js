// @flow

import { NativeModules } from 'react-native';

import { MiddlewareRegistry } from '../../base/redux';

import { WANTS_TO_BE_IN_PIP_MODE } from './actionTypes';
import { isItOkToGoPiP } from './functions';
import { setWantsToBeInPiPMode } from './actions';

/**
 * Middleware for the Picture-in-Picture feature. It lets the native PIP module
 * know whether the app is willing to switch to the PIP mode in case user
 * minimizes the app.
 *
 * @param {Store} store - Redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(({ dispatch, getState }) => next => action => {
    const result = next(action);
    const state = getState();
    const { wantsToBeInPiPMode } = state['features/pip'];

    switch (action.type) {
    case WANTS_TO_BE_IN_PIP_MODE: {
        const { PictureInPicture } = NativeModules;

        PictureInPicture
            && PictureInPicture.setWantsToBeInPiPMode
                && PictureInPicture.setWantsToBeInPiPMode(wantsToBeInPiPMode);
        break;
    }

    default: {
        const newWantsToBeInPiPMode = isItOkToGoPiP(state);

        if (wantsToBeInPiPMode !== newWantsToBeInPiPMode) {
            dispatch(setWantsToBeInPiPMode(newWantsToBeInPiPMode));
        }
    }
    }

    return result;
});
