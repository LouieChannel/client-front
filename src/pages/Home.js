import React from 'react';

function Home() {
	return (
		<div>
			Home <br />
			<ul>
				<li>
					<a href="/login">Login Page</a>
				</li>
				<li>
					<a href="/sign_up">Sign up (NEW)</a>
				</li>
				<li>
					<a href="/logist">Logist</a>
				</li>
				<li>
					<a href="/driver">Driver Page</a>
				</li>
				<li>
					<a href="/create-task">Create task for driver</a>
				</li>
				<li>
					<a href="/update-task">Update task</a>
				</li>
			</ul>
		</div>
	);
}

export default Home;
