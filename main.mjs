import {exec} from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
app.set('port', (process.env.PORT || 8000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', 'views');
app.engine('html', ejs.renderFile);
app.engine('css', ejs.renderFile);
app.set('view engine', 'html');
app.set('view engine', 'css');

// Run Server
app.listen(app.get('port'), function () {
    console.log('server launched');
});

// ルートページ
app.get('/', function (req, res) {
    res.header('Content-Type', 'text/html;charset=utf-8');
    res.status(200);
    res.render('index.html', {
        result: ''
    });
});

app.post('/', function (req, res) {
    res.header('Content-Type', 'text/html;charset=utf-8');
    res.status(200);

    let text = req.body.input;
    text = startReshape(text);
    res.render('index.html', {
        result: text
    });
});


function removeLineBreaksAll(input) {
    return input.replace(/\r?\n/g, ' ');
}

function addLineBreaksPerPeriod(input) {
    let array = input.split('.');

    let output = '';
    array.forEach(function (item) {
        output += item + '.\n\n';
    });
    return output;
}

function copyToClipboard(output){
    exec('echo "' + output +'" | pbcopy');
}

function startReshape(input) {
    if (typeof input === "string") {
        input = removeLineBreaksAll(input);
        let output = addLineBreaksPerPeriod(input);
        copyToClipboard(output);
        return output;
    }
    else {
        return ''
    }
}