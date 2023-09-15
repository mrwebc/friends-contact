import React from 'react';
import { useCtxDispatch, useCtxState } from '../contexts/FriendCtxProvider';
import styled from 'styled-components';

const ListItem = styled.li`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 80vw;
	max-width: 800px;
	margin: 0 auto;
	padding: 24px 0;
	border-bottom: 1px solid #ccc;

	&:last-child {
		border-bottom: none;
	}
`;

const Span = styled.span`
	padding: 0 10px;
	text-align: center;
	/* outline: 1px solid red; */
`;

const Seq = styled(Span)`
	width: 10px;
`;

const Name = styled(Span)`
	flex: 1;
	width: 80px;
	cursor: pointer;
`;

const Phone = styled(Span)`
	flex: 2;
	width: 80px;
`;

const Button = styled.button`
	padding: 5px 10px;
	cursor: pointer;
`;

const BtnEdit = styled(Button)`
	margin: 0 5px;
`;

const FriendItem = ({ friend, no }) => {
	const { editing } = useCtxState();
	const dispatch = useCtxDispatch();

	return (
		<ListItem>
			<Seq>{no}</Seq>
			<Name
				className={friend.bef && 'on'}
				onClick={() => {
					dispatch({
						type: 'BEF',
						data: {
							editSeq: friend.seq,
						},
					});
				}}
			>
				{friend.name}
			</Name>
			<Phone>{friend.phone}</Phone>
			<BtnEdit
				disabled={editing}
				onClick={() => {
					dispatch({
						type: 'EDITING',
						data: {
							editing: !editing,
							editSeq: friend.seq,
						},
					});
				}}
			>
				수정
			</BtnEdit>
			<Button
				disabled={editing}
				onClick={() => {
					dispatch({
						type: 'DEL',
						data: {
							seq: friend.seq,
						},
					});
				}}
			>
				삭제
			</Button>
		</ListItem>
	);
};

const List = styled.ul``;

function FriendList() {
	const { friends } = useCtxState();

	return (
		<List>
			{friends.map((friend, idx) => {
				return <FriendItem friend={friend} no={idx + 1} key={friend.seq} />;
			})}
		</List>
	);
}

export default FriendList;
