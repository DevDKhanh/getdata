import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './Home';
import Test2 from './Test2';
import CalendarTest from './Calendar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Test2 />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
