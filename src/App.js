import React from 'react';
import FriendContainer from './containers/FriendContainer';
import FriendCtxProvider from './contexts/FriendCtxProvider';

function App(props) {
	return (
		<FriendCtxProvider>
			<FriendContainer />
		</FriendCtxProvider>
	);
}

export default App;
