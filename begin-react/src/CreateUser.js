import React, {useContext, useRef, useCallback} from 'react';
import {UserDisPatch} from './App';
import useInputs from './useInputs';


function CreateUser() {
    const [{username, email}, onChange, reset] = useInputs({
        username: '',
        email: ''
    });
    const nextId = useRef(3);
    const dispatch = useContext(UserDisPatch);
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

    return (
        <div>
            <input 
                name="username"
                palceholder="계정명"
                onChange={onChange}
                value={username}
            />
             <input 
                name="email"
                palceholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
};

export default React.memo(CreateUser); //React.memo 컴포넌트 리렌더링 방지