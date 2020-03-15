export default (io, posts, users) => socket => {

    io.emit('start', { posts, users });    
    
    socket.on('sendState', (text) => {      
        const date = Date.now();
      const data = {
        text,
        id: socket.id,
        date
      }
      posts.push(text);      
      io.emit('broadcastState', data);
    });
    
    socket.on('sendUser', (userName) => {    
      if (!users.find(u => u.user === userName || u.id === socket.id)) {
        users.push({
          id: socket.id,
          userName
        });
        io.emit('broadcastUser', userName);
      }
    });

    socket.on('sendLikes', (data) => {
        const like = users.find(u => u.user === userName);
        const counter = 0;
        if (like) {
            counter++;
        }        
        io.emit('broadcastState', posts);
    })

}
  

