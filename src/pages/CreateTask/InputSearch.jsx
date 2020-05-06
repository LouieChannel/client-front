import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function InputSearch(props) {
	let suggestView;

	const [value, setValue] = useState([]);
	const [remove, setRemove] = useState(true);

	useEffect(() => {
		if (!remove) {
			setRemove(true);
		}
	}, [remove]);

	function createMapInstance() {
		function init() {
			suggestView = new window.ymaps.SuggestView('suggest');

			suggestView.events.add('select', function (e) {
				window.ymaps.geocode(e.get('item').value).then(function (res) {
					console.log(res.geoObjects.get(0).geometry._coordinates);
					setValue(res.geoObjects.get(0).geometry._coordinates);
					// myMap.setBounds(res.geoObjects.get(0).properties.get('boundedBy'));
				});
			});
		}

		window.ymaps.ready(init);
	}

	function handleClick() {
		props.onChange(value);
		setValue([]);
		setRemove(false);
	}

	useEffect(() => {
		createMapInstance();
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			{console.log(remove)}

			<TextField
				id="suggest"
				margin="normal"
				label="Поиск адреса"
				variant="outlined"
				style={{ width: '100%', maxWidth: '350px' }}
			/>

			<Button variant="outlined" color="primary" onClick={handleClick}>
				Добавить
			</Button>
		</div>
	);
}
