import request from 'request';
import uuidv4 from 'uuid/v4';
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

function removeLineBreaksAll(input) {
    return input.replace(/\r?\n/g, ' ');
}

function addLineBreaksPerPeriod(input) {
    return input.split('.');
}

function translateJapaneseFromEnglish(input) {
    input.forEach(function (line) {
        let options = {
            method: 'POST',
            baseUrl: 'https://api.cognitive.microsofttranslator.com/',
            url: 'translate',
            qs: {
                'api-version': '3.0',
                'to': 'ja'
            },
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            body: [{
                'text': line
            }],
            json: true,
        };

        request.post(options, function (err, res, body) {
            let text = body[0]['translations'][0]['text'];
            // console.log(text);
            fs.appendFile('output.txt', text+'\n', function (err) {
                if (err)
                    console.log(err);
            });
        });
    });


}

function start(input) {
    // // 空ファイルで初期化
    // fs.writeFile('output.txt', '', function (err) {
    //     if (err)
    //         console.log(err);
    // });

    input = removeLineBreaksAll(input);
    input = addLineBreaksPerPeriod(input);
    translateJapaneseFromEnglish(input);
}

const subscriptionKey = process.env.TRANSLATOR_TEXT_KEY;
if (!subscriptionKey) {
    throw new Error('Environment variable for your subscription key is not set.')
}

let input = fs.readFileSync('/dev/stdin', 'utf8');
start(input);