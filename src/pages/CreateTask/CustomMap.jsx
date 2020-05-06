import React, { useEffect } from 'react';

export default function CustomMap({ route }) {
	let myMap;
	let multiRoute;

	useEffect(() => {
		createMap();
		setTimeout(() => {
			console.log(route);
			addRoute(route);
		}, 1000);

		// eslint-disable-next-line
	}, []);

	function createMap() {
		function init() {
			myMap = new window.ymaps.Map(
				'map',
				{
					center: [55.750625, 37.626],
					zoom: 7,
					controls: [],
				},
				{
					buttonMaxWidth: 300,
				}
			);
		}

		window.ymaps.ready(init);
	}

	function addRoute(arr) {
		if (multiRoute && myMap) {
			removeRoute();
		}

		multiRoute = new window.ymaps.multiRouter.MultiRoute(
			{
				referencePoints: arr,
				params: {
					results: 2,
				},
			},
			{
				boundsAutoApply: true,
			}
		);
		if (myMap) {
			myMap.geoObjects.add(multiRoute);
		}
	}

	function removeRoute() {
		myMap.geoObjects.remove(multiRoute);
	}

	return (
		<>
			<div id="map" style={{ width: '100%', height: '100%' }} />
		</>
	);
}
