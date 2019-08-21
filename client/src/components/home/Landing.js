import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { Button, Container, Header, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import books from '../../image/books.PNG';

class Landing extends Component {
	UNSAFE_componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			<Container textAlign="center">
				<Content>
					<Grid centered columns={2}>
						<Grid.Row centered>
							<Opacity>
								<Header as="h1">Book Club</Header>
								<Header as="h3">
									Create a profile, read and discuss with others about your
									favorite books
								</Header>
								<Button color="blue" as={Link} to="/register">
									Sign Up
								</Button>
								<Button color="blue" as={Link} to="/login">
									Login
								</Button>
							</Opacity>
						</Grid.Row>
					</Grid>
				</Content>
			</Container>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);

const Content = styled.div`
	background-image: url(${books});
	height: 100vh
	width: 100%;
`;

const Opacity = styled.div`
	background: rgba(255, 255, 255, 0.6);
	width: 50%;
`;
