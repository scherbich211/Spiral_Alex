import {RootStackParamList} from '../types';

export interface IListData {
	id: number;
	title: keyof RootStackParamList;
	subtitle: string;
	icon: string;
	dollars: string;
	cents: string;
}

export const dollars = [1500, 5000, 500];
export const cents = [20, 20, 40];

export const list: IListData[] = [
	{
		id: 1,
		title: 'Checking',
		subtitle: 'Main account (...0353)',
		icon: 'arrow-forward',
		dollars: `$${dollars[0]}`,
		cents: `.${cents[0]}`,
	},
	{
		id: 2,
		title: 'Savings',
		subtitle: 'Buy a house (...4044)',
		icon: 'arrow-forward',
		dollars: `$${dollars[1]}`,
		cents: `.${cents[1]}`,
	},
	{
		id: 3,
		title: 'Goodness',
		subtitle: 'Cash Rewards',
		icon: 'arrow-forward',
		dollars: `$${dollars[2]}`,
		cents: `.${cents[2]}`,
	},
];

export const dollars11 = [63, 17, 1200, 320];
export const cents11 = [95, 75, 50, 73];

export const list11 = [
	{
		id: 1,
		title: 'Target',
		subtitle: 'Closter NJ | Debit card',
		dollars: `$${dollars11[0]}`,
		cents: `.${cents11[0]}`,
	},
	{
		id: 2,
		title: 'AplPay 7-Eleven',
		subtitle: 'Cresskill NJ | iPhone',
		dollars: `$${dollars11[1]}`,
		cents: `.${cents11[1]}`,
	},
	{
		id: 3,
		title: 'Facebook inc',
		subtitle: 'Pay day! Yay!',
		dollars: `$${dollars11[2]}`,
		cents: `.${cents11[2]}`,
	},
	{
		id: 4,
		title: 'Lencrafters',
		subtitle: 'Paramus NJ | Debit card',
		dollars: `$${dollars11[3]}`,
		cents: `.${cents11[3]}`,
	},
];

export const dollars10 = [10000, 12, 236, 320];
export const cents10 = [0, 2, 52, 73];

export const list10 = [
	{
		id: 1,
		title: 'Transfer from savings',
		subtitle: 'Buy a house (...4044)',
		dollars: `$${dollars10[0]}`,
		cents: `.${cents10[0]}`,
	},
	{
		id: 2,
		title: 'Starbucks',
		subtitle: 'Closter NJ | Debit card',
		dollars: `$${dollars10[1]}`,
		cents: `.${cents10[1]}`,
	},
	{
		id: 3,
		title: 'Stop and Shop',
		subtitle: 'Closter NJ | Debit card',
		dollars: `$${dollars10[2]}`,
		cents: `.${cents10[2]}`,
	},
	{
		id: 4,
		title: 'Lencrafters',
		subtitle: 'Paramus NJ | Debit card',
		dollars: `$${dollars10[3]}`,
		cents: `.${cents10[3]}`,
	},
];

export const listSavings = [
	{
		id: 1,
		title: 'End day balance - Jul 11',
		dollars: '$10,000',
	},
	{
		id: 2,
		title: 'Deposit',
		subtitle: 'Jul 11',
		dollars: '$2,000',
		cents: '.00',
	},
	{
		id: 3,
		title: 'Deposit',
		subtitle: 'Jul 11',
		dollars: '$2,000',
		cents: '.00',
	},
	{
		id: 4,
		title: 'Deposit',
		subtitle: 'Jul 11',
		dollars: '$2,000',
		cents: '.00',
	},
	{
		id: 5,
		title: 'Deposit',
		subtitle: 'Jul 11',
		dollars: '$2,000',
		cents: '.00',
	},
	{
		id: 6,
		title: 'Deposit',
		subtitle: 'Jul 11',
		dollars: '$2,000',
		cents: '.00',
	},
	{
		id: 7,
		title: 'End day balance - Jul 10',
		dollars: '$3,000',
		cents: '.00',
	},
	{
		id: 8,
		title: 'Deposit',
		subtitle: 'Jul 10',
		dollars: '$2,000',
		cents: '.00',
	},
	{
		id: 9,
		title: 'Deposit',
		subtitle: 'Jul 10',
		dollars: '$500',
		cents: '.00',
	},
	{
		id: 10,
		title: 'Deposit',
		subtitle: 'Jul 10',
		dollars: '$500',
		cents: '.00',
	},
];
