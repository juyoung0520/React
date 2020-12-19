import React, {useRef, useState} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';


function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const {username, email} = inputs;

  const onChange = e => {
    const {name, value} = e.target; // e.target == 이벤트가 발생한 DOM, input DOM
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'juyoung',
        email: 'juyoung0520@naver.com',
        active: true
    },
    {
        id: 2,
        username: 'jinu',
        email: 'gle00@naver.com',
        active: false
    }
  ]);

  const nextId = useRef(3); //파라미터 .current의 기본값

  const onCreate = () => { 
    const user =  {
      id: nextId.current,
      username,
      email
    };

    //setUsers([...users, user]); //새로운 배열만들어서 기존 내용 복사 후, 다음 멤버 넣어줌 방법1
    setUsers(users.concat(user));

    setInputs({
      username:'',
      email:''
    });

    nextId.current += 1;
    console.log(nextId.current);   // 컴포넌트 리랜더링 x 바로 수정 조회 .current 수정, 조회
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id)); 
  };

  const onToggle = id => {
    setUsers(
      users.map(user => user.id === id ? {...user, active: !user.active} : user)
    );
  };

  return (
    <> {/*fragment 태그*/}
    <CreateUser 
      username={username} 
      email={email} 
      onChange={onChange} 
      onCreate={onCreate}
    />
    <UserList 
      users={users}
      onRemove={onRemove}
      onToggle={onToggle}/>
    </>
  );
}

export default App;
