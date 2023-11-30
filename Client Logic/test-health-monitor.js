const healthMonitor = require('./index.js');

var sessionDetails = {
    sessionId: 'ce2c0160-4dd4-11ee-83b1-c7a59acf3539',
    apiName: 'Scaffolded API: interface',
    apiId: '1615b10c-d3f5-4bd0-a1aa-fe4dd1e471a8',
    ApiCollectionUid: '27254826-600fad34-1aeb-4e37-86b8-aea2a275834d',
    collectionId: '27254826-6a0f584b-da2f-49c7-a5fe-0941e4fb1eb1',
    mockServerId: '0a0b2c5a-6887-4ba3-8d7f-466281cc7410',
    mockUrl: 'https://0a0b2c5a-6887-4ba3-8d7f-466281cc7410.mock.pstmn.io',
    envId: '27254826-ae8f4426-bc54-4302-a3d9-18bf24ea79f1'
  };

  var envId = sessionDetails.envId;
var collectionId = sessionDetails.collectionId;

var endCollectionRunCmd = "postman collection run " + collectionId + " -e " +  envId +   " -d config.json --disable-unicode";
healthMonitor.runCollection(endCollectionRunCmd, sessionDetails);