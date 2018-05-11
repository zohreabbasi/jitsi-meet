// @flow

import { JITSI_KNOWN_DOMAINS } from './constants';

import { getAppProp } from '../../app';

/**
 * Returns the default domains known by the app.
 *
 * @param {Object|Function} stateful - The redux state object or
 * {@code getState} function.
 * @returns {Array<string>}
 */
export function getDefaultDomains(stateful: Object | Function) {
    const domains = getAppProp(stateful, 'knownDomains');

    if (Array.isArray(domains)) {
        return domains;
    }

    return JITSI_KNOWN_DOMAINS;
}
