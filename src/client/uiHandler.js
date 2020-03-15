export default socketClient => {
    const stateText = document.getElementById('state-text');
    const sendState = document.getElementById('send-state');
    const states = document.getElementById('states');
    const users = document.getElementById('usersPosts');
  
    sendState.addEventListener('click', () => {
      console.log('sendState', stateText.value);
      if (stateText.value.length > 0) {
        socketClient.emit('sendState', stateText.value);
      }
    });
  
    const sendLike = (id) => {
      console.log(id);
    }
  
    return {
      sendLike,
      states
    }
  };