import { createSelector } from 'reselect';

export const sessionFormTypeSelector = state => state.getIn(['ui', 'sessionFormType'], '');
