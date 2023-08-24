import * as types from '../actions/actionTypes';

const initialState = {
	token: '',
	email: '',
	firstName: '',
};

const getInitStateFromStorage = (key, initialState) => {
	const storedState = JSON.parse(localStorage.getItem(key));

	if (storedState) {
		const unchangedInitialStateProps =
			Object.keys(storedState).every(
				(property) => initialState[property] !== undefined
			) &&
			Object.keys(initialState).every(
				(property) => storedState[property] !== undefined
			);
		if (unchangedInitialStateProps) {
			return storedState;
		}
	}
	return initialState;
};

export default function authReducer(
	state = getInitStateFromStorage('auth', initialState),
	action
) {
	switch (action.type) {
    case types.LOGIN:
      console.log(action.payload)
      return Object.assign({}, state, {
				token: action.payload.token,
        email: action.payload.email,
        firstName: action.payload.firstName
			});
		case types.LOGOUT:
			return Object.assign({}, initialState);
		default:
			return state;
	}
}
