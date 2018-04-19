// @flow

/**
 * Tells if it's fine to go into the picture in picture in case the app would be
 * minimized based on the application's current Redux state.
 *
 * @param {Object} state - The Redux state.
 * @returns {boolean}
 */
export function isItOkToGoPiP(state: Object): boolean {
    const { app } = state['features/app'];

    // FIXME We also want to go PiP in the early joining phase, after the
    // room name was clicked, but just before "joining" was set in the
    // reducer. Currently there is a time window while the config is being
    // downloaded where the app will not go to the PiP mode if minimized.
    const { conference, joining } = state['features/base/conference'];

    return Boolean(app
        && app.props.pictureInPictureEnabled
        && (conference || joining));
}
