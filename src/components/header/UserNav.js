import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/auth';
import { bindActionCreators } from 'redux';

import AuthService from '../../authService';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';

function UserNav(props) {
  const { user, setUser } = useContext(UserContext);
  
	useEffect(() => {
		console.log(user);
	}, [user]);

	let client = new AuthService();

	let handleSignOut = (event) => {
		client
			.logout(props.auth.token)
			.then((response) => {
				console.log(props.auth.token);
				// handle success
        localStorage.removeItem('auth');
        localStorage.removeItem('userData')
        props.actions.logout();
        setUser(null)
				props.history.push(props.location.pathname);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	let userNav = (
		<>
			<Navbar.Text className='font-weight-bold mx-3'>
				Welcome, Guest
			</Navbar.Text>
			<Nav.Link as={Link} to='/login' href='/login'>
				Sign in
			</Nav.Link>
			<Nav.Link as={Link} to='/register' href='/register'>
				Register
			</Nav.Link>
		</>
	);
	if (props.isAuthenticated) {
		userNav = (
			<>
				<Navbar.Text className='font-weight-bold mx-3'>
					Hello, {user?.firstName}
				</Navbar.Text>
				<Nav.Link
					as={Link}
					to={`/updateuser/${props.auth.email}`}
					href={`/updateuser/${props.auth.email}`}
				>
					{' '}
					Edit Profile
				</Nav.Link>
				<Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
			</>
		);
	}

	return userNav;
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UserNav));
