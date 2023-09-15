import React from 'react';
import useInputs from '../hooks/useInputs';
import { useCtxDispatch, useCtxNextSeq } from '../contexts/FriendCtxProvider';
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
	border-radius: 2px;
	text-align: center;
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

function FriendAdd() {
	const [inputs, changeFn, emptyFn, $name] = useInputs({ name: '', phone: '' });
	const { name, phone } = inputs;

	const dispatch = useCtxDispatch();
	const nextSeq = useCtxNextSeq();

	return (
		<Container>
			<Form
				onSubmit={(evt) => {
					evt.preventDefault();
					// addFn(name, phone);
					if (name === '' || phone === '') {
						alert('이름 또는 폰번호가 입력되지 않았습니다.');
						$name.current.focus();
						return false;
					}
					dispatch({
						type: 'ADD',
						data: {
							seq: nextSeq.current++,
							name,
							phone,
							bef: false,
						},
					});
					emptyFn();
				}}
			>
				<label className="sr-only" htmlFor="name">
					이름 :
				</label>
				<InputName
					placeholder="친구이름"
					ref={$name}
					onChange={changeFn}
					type="text"
					id="name"
					value={name}
					autoFocus
				/>{' '}
				<label className="sr-only" htmlFor="phone">
					연락처 :
				</label>
				<InputPhone placeholder="연락처" onChange={changeFn} type="text" id="phone" value={phone} />
				<Button>확인</Button>
			</Form>
		</Container>
	);
}

export default FriendAdd;
