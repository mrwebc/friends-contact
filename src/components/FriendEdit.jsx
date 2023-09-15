import React from 'react';
import useInputs from '../hooks/useInputs';
import { useCtxDispatch, useCtxState } from '../contexts/FriendCtxProvider';
import styled from 'styled-components';

const Container = styled.div`
	padding: 10px;
	background-color: #8e9aff;
`;

const Form = styled.form`
	display: flex;
	justify-content: center;
`;

const Input = styled.input.attrs({ autoComplete: 'off' })`
	border: none;
	outline: none;
	padding: 10px 5px;
	text-align: center;
	border-radius: 2px;
`;

const InputName = styled(Input)`
	width: 50vw;
`;
const InputPhone = styled(Input)`
	width: 20vw;
	min-width: 80px;
	margin: 0 16px;
	text-align: center;
`;

const Button = styled.button`
	border: none;
	outline: none;
	padding: 10px 15px;
	color: #fff;
	background-color: #6c7aff;
	border-radius: 4px;
	cursor: pointer;
`;

function FriendEdit() {
	const { editSeq, friends } = useCtxState();

	const editIdx = friends.findIndex((friend) => friend.seq === editSeq);

	const { name: name_, phone: phone_ } = friends[editIdx];

	const [inputs, changeFn, emptyFn, $name] = useInputs({ name: name_, phone: phone_ });
	const { name, phone } = inputs;

	const dispatch = useCtxDispatch();
	return (
		<Container>
			<Form
				onSubmit={(evt) => {
					evt.preventDefault();
					if (name === '' || phone === '') {
						alert('이름 또는 폰번호가 입력되지 않았습니다.');
						$name.current.focus();
						return false;
					}
					dispatch({
						type: 'EDIT',
						data: {
							name,
							phone,
						},
					});
					emptyFn();
				}}
			>
				<label className="sr-only" htmlFor="name">
					이름 :
				</label>
				<InputName ref={$name} onChange={changeFn} type="text" id="name" value={name} autoFocus />{' '}
				<label className="sr-only" htmlFor="phone">
					연락처 :
				</label>
				<InputPhone onChange={changeFn} type="text" id="phone" value={phone} />
				<Button>확인</Button>
			</Form>
		</Container>
	);
}

export default FriendEdit;
