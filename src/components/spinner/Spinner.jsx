import React from 'react';
import './style.css';

function Spinner(props) {
	return (
		<div className="sk-chase">
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
		</div>
	);
}

export default Spinner;
