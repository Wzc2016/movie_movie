import React, { useContext, useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import '../style/index.scss';
import { Context } from '../context';

const userState = (username) => {
  const [user, setUsername] = useState(username);
  return [user, setUsername];
}

const generateUid = () => {
  return new Date().getTime() + '' + Math.floor(Math.random() * 999 + 1);
};

const App = (props) => {
  // 获取context中的数据
  const { state, dispatch } = useContext(Context);
  // 输入输出用户名
  const [user, setUsername] = userState();
  const handleLogin = () => {
    const uid = generateUid();
    const username = user ? user : `Visitor${uid}`;
    dispatch({ type: 'login', payload: { uid, username } });
    state.socket.emit('login', { uid, username });
  };
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      handleLogin();
    }
    return false;
  };
  return (
    <div>
      {state.uid ? (
        // 已登录
        <ChatRoom uid={state.uid} username={state.username} socket={state.socket} />
      ) : (
        // 登录界面
        <div className="login-box">
          <h2>Log in</h2>
          <div className="input">
            <input
              type="text"
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="submit">
            <button type="button" onClick={handleLogin}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;