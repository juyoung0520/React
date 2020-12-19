import React from 'react';

function User({user, onRemove, onToggle}) {
    return (
        <div>
            <b
                style={{
                    cursor:'pointer',
                    color: user.active ? 'green' : 'black'
                }}  //리액트에서 스타일 객체 변수 넣어줌(html에선 인라인 style="color:")
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b> 
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button> {/*onRemove(user.id) 하면 안됨 랜더링 되자마자 실행됨. 함수명만 넣는것처럼 매개변수 주려면 함수만들어야됨*/}
        </div>
    );
}; //한 파일에 여러 컴포넌트 있어도 됨

function UserList({users, onRemove, onToggle}) {

    return (
        <div>
            {
                users.map(user => 
                    <User 
                        user={user} 
                        key={user.id}
                        onRemove={onRemove}
                        onToggle={onToggle}
                    />
                )
            } {/*배열 렌더링시 key 있어야 효율적 (밖의 중괄호{}는 변수이기 때문에!)*/} 
        </div>
    );
}

export default UserList;