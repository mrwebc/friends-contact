import React from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import FriendList from '../components/FriendList';
import FriendAdd from '../components/FriendAdd';
import { useCtxState } from '../contexts/FriendCtxProvider';
import FriendEdit from '../components/FriendEdit';

const GlobalStyle = createGlobalStyle`
	*{margin: 0;padding: 0;}
	ul,ol,li{list-style: none;}
	.sr-only{position: absolute;left:-9999px;}
	.on{color:blue;font-weight: 600;}
`;

const ccAlign = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
`;

const Container = styled.div``;
const Header = styled.header``;
const Title = styled(ccAlign)`
	font-weight: 500;
	font-size: 24px;
`;

const Section = styled.section`
	padding: 10px 0;
`;

const Footer = styled(ccAlign)`
	height: 50px;
	font-size: 12px;
	border-top: 1px solid #ccc;
`;

function FriendContainer(props) {
	const editing = useCtxState().editing;

	return (
		<>
			<GlobalStyle />
			<Container>
				<Header>
					<Title as={'h1'}>친구 연락처 - {editing ? '수정' : '등록'}</Title>
					{editing ? <FriendEdit /> : <FriendAdd />}
				</Header>

				<Section>
					<FriendList />
				</Section>

				<Footer as={'footer'}>&copy;Designed by 홍길동</Footer>
			</Container>
		</>
	);
}

export default FriendContainer;
