import {
	SET_COPY,
	UPDATE_COPY,
  SET_INITIALVALUES
} from '../actions/formActions';

export default function(state = { formCopy: {}, formInitialValues: {age: 0, interests: [], news: false} }, action: {type: string, payload: any}) {
	switch(action.type) {
		case SET_COPY:
			return { ...state, formCopy: {...action.payload} };
		case UPDATE_COPY:
			return { ...state, formCopy: {...state.formCopy, ...action.payload} };
		case SET_INITIALVALUES:
			return { ...state, formInitialValues: {...action.payload} };
		default: // need this for default case
      return state 
	}
}