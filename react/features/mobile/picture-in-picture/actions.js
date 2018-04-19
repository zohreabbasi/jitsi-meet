// @flow

import { NativeModules } from 'react-native';

import { Platform } from '../../base/react';

import {
    ENTER_PICTURE_IN_PICTURE,
    WANTS_TO_BE_IN_PIP_MODE
} from './actionTypes';
import { isItOkToGoPiP } from './functions';

/**
 * Enters (or rather initiates entering) picture-in-picture.
 * Helper function to enter PiP mode. This is triggered by user request
 * (either pressing the button in the toolbox or the home button on Android)
 * ans this triggers the PiP mode, iff it's available and we are in a
 * conference.
 *
 * @public
 * @returns {Function}
 */
export function enterPictureInPicture() {
    return (dispatch: Dispatch, getState: Function) => {
        if (isItOkToGoPiP(getState())) {
            const { PictureInPicture } = NativeModules;
            const p
                = Platform.OS === 'android'
                    ? PictureInPicture
                        ? PictureInPicture.enterPictureInPicture()
                        : Promise.reject(
                            new Error('Picture-in-Picture not supported'))
                    : Promise.resolve();

            p.then(
                () => dispatch({ type: ENTER_PICTURE_IN_PICTURE }),
                e => console.warn(`Error entering PiP mode: ${e}`));
        }
    };
}

/**
 * Indicates the app's intention to go into the Picture In Picture mode in case
 * the app would be brought to the background (minimized).
 *
 * @param {boolean} wantsToBeInPiPMode - {@code true} to go into the PiP mode on
 * minimize or {@code false} otherwise.
 * @returns {{
 *     type: WANTS_TO_BE_IN_PIP_MODE,
 *     wantsToBeInPiPMode: boolean
 * }}
 */
export function setWantsToBeInPiPMode(wantsToBeInPiPMode: boolean) {
    return {
        type: WANTS_TO_BE_IN_PIP_MODE,
        wantsToBeInPiPMode
    };
}
