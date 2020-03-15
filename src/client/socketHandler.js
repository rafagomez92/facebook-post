
export default (socketClient, ui) => {
    socketClient.on('broadcastState', (data) => {
      console.log('broadcastState', data);
      ui.states.innerHTML += `<div>
        <p>${data.text}</p>
        <button onClick="window.ui.sendLike('${data.id}')">Like</button>
        <button onClick="window.ui.deletePost()">Eliminar</button>
      </div>`;
    });

    socketClient.on(sendUsers, (users) => {
        ui.users.innerHTML = '';
        usersPosts.forEach(user => {
          ui.usersPostsinnerHTML += `<p>${user.userName}</p>`;
        });
      });

      socketClient.on('start', (data) => {
        ui.usersPosts.innerHTML = '';
        data.users.forEach(user => {
          ui.usersPosts.innerHTML += `<p>${user.userName}</p>`;
        });
    });
    
      
  };