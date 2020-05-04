const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

const TOKEN = localStorage.getItem('access_token');

const statuses = [
	{
		id: 1,
		value: 'холостой ход',
	},
	{
		id: 2,
		value: 'перевоз груза',
	},
	{
		id: 3,
		value: 'погрузка груза',
	},
	{
		id: 4,
		value: 'выгрузка груза',
	},
	{
		id: 5,
		value: 'двигатель выключен',
	},
];

const conditions = [
	{
		id: 1,
		value: 'перевоз груза',
	},
	{
		id: 2,
		value: 'Заменить ковш',
	},
	{
		id: 3,
		value: 'Надеть ковш',
	},
	{
		id: 4,
		value: 'Снять ковш',
	},
	{
		id: 5,
		value: 'Перемешать ковшом материалы',
	},
];

export { conditions, statuses, BASE_URL, TOKEN };
