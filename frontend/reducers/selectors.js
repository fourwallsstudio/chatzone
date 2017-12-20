import { createSelector } from 'reselect';

export const currentUserSelector = state => state.getIn(['session', 'currentUser'], '');

export const sessionFormTypeSelector = state => state.getIn(['ui', 'sessionFormType'], '');
