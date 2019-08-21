import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
const ProfileActions = () => {
	return (
		<div>
			<Link to="/edit-profile">
				<Button basic color="blue">
					Edit Profile
				</Button>
			</Link>
			<Link to="/books">
				<Button basic color="blue">
					Find Books
				</Button>
			</Link>
		</div>
	);
};

export default ProfileActions;
