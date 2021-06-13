const express = require('express')
const jwt = require('jsonwebtoken')
const PORT =80
;

const app = express();

app.get('/api', (req,  res)=>{
    res.json({
        message: 'Welcome to the API'
    });
});
app.post('/api/posts', verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey',  (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post Created!',
                authData
            })
        }

    });
    
})

app.post('/api/login', (req, res)=>{
    // mock user
    const user = {
        id : 1,
        username: 'bilal',
        email: 'bilal@gmail.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: "2h"}, (err, token) => {
        res.json({
            token
        });
    });    
});

// Format of token
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res , next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        // split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();

    }else{
        // forbidden
        res.sendStatus(403);

    }
}
app.listen(PORT, () => console.log(`Server started on ${PORT}`))
