import {
  SET_COPY,
  SET_INITIALVALUES
} from '../actions/formActions';

export default function(state = { formCopy: {}, formInitialValues: {} }, action: {type: string, payload: any}) {
	switch(action.type) {
		case SET_COPY:
			return { ...state, formCopy: action.payload };
		case SET_INITIALVALUES:
			return { ...state, formInitialValues: action.payload };
	}
}