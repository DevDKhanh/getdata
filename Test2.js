import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { text } from './text';
import { View, Text } from 'react-native';

const Test2 = () => {
	const listDay = ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'];
	const genesisDate = '16/08/2021';
	const [dataSubject, setDataSubject] = useState([]);
	useEffect(() => {
		var formData = new FormData();
		formData.append(
			'__EVENTTARGET',
			'ctl00$ContentPlaceHolder1$ctl00$rad_ThuTiet',
		);
		formData.append('__VIEWSTATE', text);
		formData.append(
			'ctl00$ContentPlaceHolder1$ctl00$rad_ThuTiet',
			'rad_ThuTiet',
		);

		axios
			.post(
				`http://daotao.vnua.edu.vn/default.aspx?page=thoikhoabieu&sta=1&id=637737`,
				formData,
				{
					withCredentials: true,
					Cookie: 'ASP.NET_SessionId=4pw0tt2ullollq55tqyt2u3d',
					'Content-type': 'multipart/form-data',
				},
			)
			.then(response => {
				if (response) {
					let $ = cheerio.load(response.data);
					let col = [];
					const data = [];
					$('.grid-roll2 > table').each((index, elm) => {
						$ = cheerio.load(elm);
						$('tbody > tr > td').each(function (i, e) {
							let links = $(e).text();
							if (links.includes('DSSV')) {
								const listWeeks = getDateToWeek(
									col[13],
									genesisDate,
								);
								const dayStudy = getStudy(listWeeks, col[8]);
								const convertObject = {
									maMH: col[0],
									tenMH: col[1],
									nhom: col[2],
									thu: col[8],
									tietBatDau: col[9],
									soTiet: col[10],
									phong: col[11],
									ngayHoc: dayStudy,
								};
								data.push(convertObject);
								col = [];
							} else {
								col.push(links);
							}
						});
					});
					setDataSubject([...data]);
				}
			})
			.catch(function (e) {
				console.log(e);
			});
		return () => setDataSubject([]);
	}, []);

	const getDateToWeek = (str, start) => {
		const splitGenesisDate = start.split('/');
		const listWeek = [];
		const convert = `${splitGenesisDate[1]}/${splitGenesisDate[0]}/${splitGenesisDate[2]}`;
		let dateStudy = Number(new Date(convert));
		const list = str.split('');
		list.forEach(item => {
			if (
				typeof Number(item) == 'number' &&
				Number(item) == Number(item)
			) {
				listWeek.push(dateStudy);
			}
			dateStudy = dateStudy + 86400000 * 7;
		});

		return listWeek;
	};

	const getStudy = (list, day) => {
		let days = [];
		for (let item of list) {
			let currentDay = item;
			for (let i = 1; i <= 7; i++) {
				const newDay = new Date(currentDay);
				if (listDay[newDay.getDay()] == day) {
					days.push(newDay.toLocaleDateString('en-GB'));
				}
				currentDay += 86400000;
			}
		}
		return days;
	};

	return (
		<View>
			{console.log(dataSubject)}
			<Text>Hello</Text>
		</View>
	);
};

export default Test2;
