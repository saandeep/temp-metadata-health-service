const uuid = require('uuid');
const { exec } = require("child_process");
var fs = require("fs");
const config = require('./config.json');
const axios = require('axios');
const { resolveObjectURL } = require('buffer');

const scaffoldingCollectionId = '27254826-8f7bea1a-4639-40fe-a977-5818ad88f4ec';


var sessionId = uuid.v1();
var sessionDetails = {};
var postmanApiKey = config[0]['postman-api-key'];

console.log("Session ID: ", sessionId);
config[0]['sessionUrl'] = config[0]['sessionUrlBase'] + sessionId

console.log("Config: ", config, postmanApiKey);

var postmanLoginCmd = 'postman login --with-api-key ' + postmanApiKey;

var scaffoldingCollectionCmd = "postman collection run " + scaffoldingCollectionId +  " -d config.json --disable-unicode";
var postSessionURL = "http://localhost:3000/health-service/api-session";
var getSessionURL = "http://localhost:3000/health-service/api-session/" + sessionId;
var updateHealthURL = 'http://localhost:3000/health-service/api-health'

console.log("Postman Login Command: ", postmanLoginCmd)


sessionDetails = createCollection(function(sessionDetails){

    var envId = sessionDetails.envId;
var collectionId = sessionDetails.collectionId;

var endCollectionRunCmd = "postman collection run " + collectionId + " -e " +  envId +   " -d config.json --disable-unicode";
runCollection(endCollectionRunCmd, sessionDetails);

});

// var sessionDetails = {
//     sessionId: 'ce2c0160-4dd4-11ee-83b1-c7a59acf3539',
//     apiName: 'Scaffolded API: interface',
//     apiId: '1615b10c-d3f5-4bd0-a1aa-fe4dd1e471a8',
//     ApiCollectionUid: '27254826-600fad34-1aeb-4e37-86b8-aea2a275834d',
//     collectionId: '27254826-6a0f584b-da2f-49c7-a5fe-0941e4fb1eb1',
//     mockServerId: '0a0b2c5a-6887-4ba3-8d7f-466281cc7410',
//     mockUrl: 'https://0a0b2c5a-6887-4ba3-8d7f-466281cc7410.mock.pstmn.io',
//     envId: '27254826-ae8f4426-bc54-4302-a3d9-18bf24ea79f1'
//   };

//   var envId = sessionDetails.envId;
// var collectionId = sessionDetails.collectionId;

// var endCollectionRunCmd = "postman collection run " + collectionId + " -e " +  envId +   " -d config.json --disable-unicode";
// runCollection(endCollectionRunCmd, sessionDetails);





async function runCollection(endCollectionRunCmd){

    var healthInfo; 
    var responseTime; 

    await new Promise((resolve) => {
        exec(endCollectionRunCmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);

            responseTime = stdout.substring(stdout.indexOf('average response time'));
            responseTime = responseTime.substring(0,responseTime.indexOf('|')-3);

            responseTime = responseTime.replace(/[^a-zA-Z0-9 ]/g, "")

            healthInfo = stdout.substring(stdout.indexOf('test-scripts'));
            healthInfo - healthInfo.replace(/[^a-zA-Z0-9 ]/g, "")
            var parts = healthInfo.split('|');
            healthInfo = parts[0] + "; Passed: " + parts[1] +  "; Failed: " + parts[2];

            console.log("response time and health info: ", responseTime, healthInfo);
            resolve(`stdout: ${stdout}`);
        });
    });

    await new Promise((resolve) => {

        let data = JSON.stringify({
            "apiId": sessionDetails.apiId,
            "runInPostman": sessionDetails.runInPostman,
            "mock": {
                "responseTime":responseTime,
                "health": healthInfo
            }
        });
    
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: updateHealthURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data : data
          };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                resolve(JSON.stringify(response.data));
                sessionDetails = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    
    });  


}

async function createCollection(callback) {

    await new Promise((resolve) => {

        let data = JSON.stringify({
            "id": sessionId
          });
    
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: postSessionURL,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept': 'application/json', 
              'X-Api-Key': '{{apiKey}}'
            },
            data : data
          };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                resolve(JSON.stringify(response.data));
                sessionDetails = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    
    });    

await new Promise((resolve) => {
    fs.writeFile("./config.json", JSON.stringify(config), (err) => {
        if (err) console.log(err);
        resolve("Successfully Written to File.");
    });
});

await new Promise((resolve) => {
    exec(postmanLoginCmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            resolve(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            resolve(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        resolve(`stdout: ${stdout}`);
    });
});

await new Promise((resolve) => {
    exec(scaffoldingCollectionCmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            resolve(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            resolve(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        resolve(`stdout: ${stdout}`);
    });
});

await new Promise((resolve) => {

    

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: getSessionURL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            resolve(JSON.stringify(response.data));
            sessionDetails = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

});

console.log("Session Details: ", sessionDetails);
callback(sessionDetails);

}


