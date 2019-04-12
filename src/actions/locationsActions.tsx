export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_STATES = 'GET_STATES';

import axios, { AxiosResponse } from 'axios';

const formatCoutries = ({data}: AxiosResponse<any>) => data.map(({name, alpha2Code}: any) => ({value: alpha2Code, label: name}));

const timeOut = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

const random = (range: number) => Math.floor(Math.random() * range);

const randomState = (states: Array<any>, index: number) => new Promise( async (resolve) => {
	await timeOut(random(500)), length = random(100);
	let label = '',
	possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i=0; i<length; i++) {
		let space = random(8) === 0;
		label += space?' ':possible.charAt(random(possible.length))
	}
	states[index] = {label, value: label.slice(0, 3)};
	resolve();
});

const statesGenerator = async () => {
	let states = new Array, qntd = random(100);
	for (let i=0; i<qntd; i++)
		states.push(randomState(states, i));
	await Promise.all(states);
	return states;
};

export function getCountries(value: any) {
	return async (dispatch: Function) => {
		try {
			let response = await axios.get('https://restcountries.eu/rest/v2/all');
			dispatch({ type: GET_COUNTRIES, payload: formatCoutries(response) });
		} catch(err) {
			console.log(err);
		}
	}
};

export function getStates(value: any) {
	return async (dispatch: Function) => {
		try {
			dispatch({ type: GET_STATES, payload: await statesGenerator() });
		} catch(err) {
			console.log(err);
		}
	}
};