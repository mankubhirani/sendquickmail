const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// add this code
const whitelist = ['https://example-djer.onrender.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

// end 
app.use(cors(corsOptions));

app.use(express.static(__dirname+'/dist/send-quick-mail'));

app.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/dist/send-quick-mail/index.html');
})

app.listen(process.env.PORT || 8080);