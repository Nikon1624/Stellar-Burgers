import { StateType } from '../../types/state';
import { Namespace } from '../../consts';

export const getUser = (state: StateType) => state[Namespace.User].user;

export const getUserLoadingStatus = (state: StateType) => state[Namespace.User].isLoading;
