import React from 'react';
import App from './App';

function Hello({color, name}) {
return <div style={{
    color
}}>안녕 하세요 {name}</div>;
}

Hello.defaultProps = {
    name: '이름없음'
};
export default Hello;