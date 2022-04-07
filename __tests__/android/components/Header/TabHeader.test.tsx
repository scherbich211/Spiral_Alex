import React from 'react';
import {waitFor, render, cleanup} from '@testing-library/react-native';
import TabHeader from '../../../../src/components/Header/TabHeader';
import { Text } from 'react-native';
import Typography from '../../../../src/components/Typography';

jest.mock('react-native', function () {
	const reactNative = jest.requireActual('react-native');
	jest.spyOn(reactNative.Platform, 'select').mockImplementation(() => 'android');
	reactNative.Platform.OS = 'android';
	return reactNative;
});

describe('Tab Header', () => {
	afterEach(cleanup);

	it('Render', async () => {
		const Header = await waitFor(() =>
			render(<TabHeader />),
		);
		expect(Header).toBeDefined();
		expect(Header).toMatchSnapshot();
		Header.unmount();
	});

	it('Render & headerText', async () => {
		const Header = await waitFor(() =>
			render(<TabHeader headerText='Home'/>),

		);
		const textShow = await Header.getByText('Home')
		expect(textShow).toBeDefined();
		expect(Header).toMatchSnapshot();
		Header.unmount();
	});

	it('Render & children', async () => {
		const Header = await waitFor(() =>
			render(<TabHeader><Typography>Test</Typography></TabHeader>),

		);
		const children = await Header.getByText('Test')
		expect(children).toBeDefined();
		expect(Header).toMatchSnapshot();
		Header.unmount();
	});

	it('Render & beforeText', async () => {
		const Header = await waitFor(() =>
			render(<TabHeader beforeText={<Typography testID='Test'>Test</Typography>}></TabHeader>),

		);
		const beforeText = await Header.queryByTestId('Test')
		expect(beforeText).toBeDefined();
		expect(Header).toMatchSnapshot();
		Header.unmount();
	});

	it('Render & headerText & headerStyle & beforeText', async () => {
		const Header = await waitFor(() =>
			render(
			<TabHeader 
				headerStyle={{backgroundColor: 'red'}} 
				headerText='Home' 
				beforeText={<Typography testID='Test'>Test</Typography>}
			>
			</TabHeader>),
		);
		const textShow = await Header.getByText('Home')
		expect(textShow).toBeDefined();
		const beforeText = await Header.queryByTestId('Test')
		expect(beforeText).toBeDefined();
		expect(Header.getByText('Home')).toHaveStyle({backgroundColor: 'red'})
		expect(Header).toMatchSnapshot();
		Header.unmount();
	});
});
