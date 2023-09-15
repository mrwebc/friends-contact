import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialState = {
	editing: false,
	editSeq: 0,
	friends: [
		{ seq: '1', name: '둘리', phone: '010-1254-8526', bef: true },
		{ seq: '2', name: '또치', phone: '010-3245-7896', bef: false },
		{ seq: '3', name: '하니', phone: '010-8956-7412', bef: true },
		{ seq: '4', name: '마이콜', phone: '010-5647-9856', bef: false },
		{ seq: '5', name: '도우너', phone: '010-7532-9854', bef: true },
	],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return {
				...state,
				friends: state.friends.concat(action.data),
			};

		case 'EDITING':
			console.log(action.data.editing);
			return {
				...state,
				editing: action.data.editing,
				editSeq: action.data.editSeq,
			};

		case 'EDIT':
			return {
				...state,
				editing: !state.editing,
				friends: state.friends.map((friend) =>
					friend.seq !== state.editSeq ? friend : { ...friend, ...action.data }
				),
			};

		case 'DEL':
			return {
				...state,
				friends: state.friends.filter((friend) => friend.seq !== action.data.seq),
			};

		case 'BEF':
			return {
				...state,
				friends: state.friends.map((friend) =>
					friend.seq !== action.data.editSeq ? friend : { ...friend, bef: !friend.bef }
				),
			};

		default:
			return state;
	}
};

let CtxState = createContext(null);
export const useCtxState = () => {
	const context = useContext(CtxState);
	// console.log('context=', context); //null
	if (!context) throw new Error('Provider 랩핑을 하지 않았습니다.');
	return context;
};

const CtxDispatch = createContext(null);
export const useCtxDispatch = () => {
	const context = useContext(CtxDispatch);
	if (!context) throw new Error('Provider로 랩핑을 하지 않았습니다.');
	return context;
};

const CtxNextSeq = createContext();
export const useCtxNextSeq = () => {
	const context = useContext(CtxNextSeq);
	if (!context) throw new Error('Provider로 감싸지 않았습니다.');
	return context;
};

function FriendCtxProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const nextSeq = useRef(6);

	return (
		<div>
			<CtxState.Provider value={state}>
				<CtxDispatch.Provider value={dispatch}>
					<CtxNextSeq.Provider value={nextSeq}>{children}</CtxNextSeq.Provider>
				</CtxDispatch.Provider>
			</CtxState.Provider>
		</div>
	);
}

export default FriendCtxProvider;
