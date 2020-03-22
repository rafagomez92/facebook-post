import connection from './connection';
import { matchHash, createToken } from './hasher'

export default io => socket => {
  console.log('start sockets');

  socket.on('doLogin', (data) => {    
    connection.query('select * from users where userName = ?', [data.userName], (err, result) => {
      if (!err) {
        if (result.length === 1) {
          if (matchHash(data.password, result[0].pass)) {
            const token = createToken({
              userName: data.userName
            });

            io.emit('successLogin', token);
          } else {
            console.log('failedLogin', 'invalid credentials')
            io.emit('failedLogin', 'invalid credentials');
          }
        } else {
          console.log('failedLogin', 'user not found')
          io.emit('failedLogin', 'user not found');
        }
      } else {
        console.log('failedLogin', err.message)
        io.emit('failedLogin', err.message);
      }
    });
  });

  socket.on('sendState', (data) => {
    connection.query('insert into states (text, userName, status) values (?, ?, ?)', [data.text, data.userName, data.status],
    (err, result) => {
      if(!err) {
        io.emit('broadcastState', data);
      }
    })            
  });


  socket.on('sendLike', (data) => {
    connection.query('insert into states (like) values (?)', [like+1]);
  })

  socket.on('deletePost', (data) => {
    connection.query('update states set text="" where id = (?)', [data.id],
    (err, result) => {
      if(!err) {
        io.emit('broadcastState', data);
      }
    })            
  })
};