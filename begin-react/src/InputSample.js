import React, {useState, useRef} from 'react'

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });

    const nameInput = useRef();

    const {name, nickname} = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;  // e.target == 이벤트가 발생한 DOM, input DOM
        setInputs({
            ...inputs, //객체 수정할땐, 새로운 객체 만들어서 기존의 값 복사해준뒤 수정
            [name]: value // 변수 name 키를 value로 설정
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        nameInput.current.focus();
    };

    return (
        <div>
            <input 
                name="name"
                placeholder="이름" 
                onChange={onChange} 
                value={name}
                ref={nameInput}
            />  {/* 안드의 힌트 */}
            <input 
                name="nickname" 
                placeholder="닉네임" 
                onChange={onChange} 
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;