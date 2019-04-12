export const SET_COPY = 'SET_COPY';
export const UPDATE_COPY = 'UPDATE_COPY';
export const SET_INITIALVALUES = 'SET_INITIALVALUES';

export function setFormCopy(value: any) {
	return (dispatch: Function) => {
		try {
			dispatch({ type: SET_COPY, payload: value });
		} catch(err) {
			console.log(err);
		}
	}
};

export function updateFormCopy(value: any) {
	return (dispatch: Function) => {
		try {
			dispatch({ type: UPDATE_COPY, payload: value });
		} catch(err) {
			console.log(err);
		}
	}
};

export function setInitialValues(value: any) {
	return (dispatch: Function) => {
		try {
			dispatch({ type: SET_INITIALVALUES, payload: value });
		} catch(err) {
			console.log(err);
		}
	}
};