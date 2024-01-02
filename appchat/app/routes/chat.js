const caminho = require('path');
module.exports =(app)=>{
    app.get('/chat', (req,res)=>{
        res.sendFile(caminho.resolve('./app/views/chat.html'))
    })
}