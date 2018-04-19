/**
 * The type of redux action to enter (or rather initiate entering)
 * picture-in-picture.
 *
 * {
 *      type: ENTER_PICTURE_IN_PICTURE
 * }
 *
 * @public
 */
export const ENTER_PICTURE_IN_PICTURE = Symbol('ENTER_PICTURE_IN_PICTURE');

/**
 * The type of redux action to indicates the app's intention to be switched into
 * the picture-in-picture mode in case the app would be minimized.
 *
 * {
 *     type: WANTS_TO_BE_IN_PIP_MODE
 * }
 *
 * @public
 */
export const WANTS_TO_BE_IN_PIP_MODE = Symbol('WANTS_TO_BE_IN_PIP_MODE');
