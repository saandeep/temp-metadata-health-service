const axios = require('axios');
const { exec } = require("child_process");
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/health-service/api-session/a8996a20-4d46-11ee-8e92-5d985a4e94e2',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        
        sessionDetails = response.data;
    })
    .catch((error) => {
        console.log(error);
    });

 var endCollectionRunCmd = 'postman collection run 27254826-bb6b2576-390c-46a4-b9b1-20a0ef87233f -e 27254826-181fa7c2-1178-4138-a546-d7082b632f64 --disable-unicode'
    // await new Promise((resolve) => {
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

            var responseTime = stdout.substring(stdout.indexOf('average response time'));
            responseTime = responseTime.substring(responseTime.indexOf('|'));

            var healthInfo = stdout.substring(stdout.indexOf('test-scripts'));
            var parts = healthInfo.split('|');
            console.log(parts);
            healthInfo = parts[0] + "; Passed: " + parts[1].trim() +  "; Failed: " + parts[2].trim() + " Passed"

            console.log("response time and health info: ", responseTime, healthInfo);
            // resolve(`stdout: ${stdout}`);
        });
    // });
    