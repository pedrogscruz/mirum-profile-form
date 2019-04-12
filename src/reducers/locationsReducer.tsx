import {
	GET_COUNTRIES,
	GET_STATES
} from '../actions/locationsActions';

export default function(state = { countries: [], states: [] }, action: {type: string, payload: any}) {
	switch(action.type) {
		case GET_COUNTRIES:
			return { ...state, countries: action.payload };
		case GET_STATES:
			return { ...state, states: action.payload };
		default: // need this for default case
      return state 
	}
}