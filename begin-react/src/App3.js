import React, {useRef, useReducer, useMemo, useCallback, createContext} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
        id: 1,
        username: 'juyoung',
        email: 'juyoung0520@naver.com',
        active: true
    },
    {
        username: 'jinu',
        email: 'gle00@naver.com',
        active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };

    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
            ? {...user, active: !user.active}
            : user
          )
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };

    default:
      throw new Error('Unhandled action');
  }
}

export const UserDisPatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const {username, email} = form;
  const nextId = useRef(3);
  const {users} = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]); 

  const count = useMemo(() => countActiveUsers(users), [users]);
 
  return (
    <UserDisPatch.Provider value={dispatch}>
    <CreateUser 
      username={username} 
      email={email} 
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users={users} />
    <div>활성 사용자 수: {count}</div>
    </UserDisPatch.Provider>
  );
}

export default App;
