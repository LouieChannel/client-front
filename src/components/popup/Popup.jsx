import React from 'react';
import './style.css';

function Popup(props) {
	if (!props.visible) {
		return null;
	}
	return (
		<div className="popup">
			<div className="popup_inner pulse">
				{props.children}
				<div onClick={props.onClose} className="close">
					<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M13.0285 1.98073L1.99146 13.0052L2.91016 13.925L13.9472 2.90048L13.0285 1.98073Z"
							fill="black"
						/>
						<path
							d="M2.91361 2.0483L1.99438 2.96753L13.0251 13.9983L13.9444 13.0791L2.91361 2.0483Z"
							fill="black"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default Popup;
