const fs = require('firebase-admin');
const serviceAccount = require('../api-universe-971cb9d4d8b6.json');
fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});
const db = fs.firestore();

module.exports = {
  
  /**
  * 

  * @param options.apiHealth.idThe unique identifier of a session

  */
  postApiHealth: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    var apiId = options.apiHealth.apiId;
    console.log("api ID", apiId);

    var data = {
        "id": apiId,
      },
      status = '200';

      const apiHealthRef = db.collection('api-health').doc(apiId);
      
      const response = await apiHealthRef.set(options.apiHealth, { merge: true });
      data.response = response;

    return {
      status: status,
      data: data
    };  
  },

  /**
  * 
  * @param options.apiId The unique identifier of the spacecraft 

  */
  getApiHealthApiId: async (options) => {

    var apiId = options.apiId;
    console.log("api ID", apiId)

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    const apiHealthRef = db.collection('api-health').doc(apiId);
    var apiHealth = {};
    const doc = await apiHealthRef.get();
    if (!doc.exists) {
      
      
      console.log('No such document!');
    } else {
      apiHealth = doc.data();
      console.log('Document data:', doc.data());
    }

    
    var data = {
        "id": "<ApiId>",
      },
      status = '200';

    return {
      status: status,
      data: apiHealth
    };  
  },

  /**
  * 

  * @param options.session.id requiredThe unique identifier of a session

  */
  postApiSession: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    console.log("Creating Session");
    var sessionId = options.session.id;
    var data = {
        "id": options.session.id,
      },
      status = '201';

      var sessionJson = {
        "sessionId": sessionId
      };
      console.log("Creating Session: ", sessionJson);

      //const apiSessionRef = db.collection("api-session").doc(options.session.id);
      //const response = await apiHealthRef.get();
      const apiSessionRef = db.collection("api-session").doc(sessionId);
      console.log("Got Session Reg: ", apiSessionRef);

      const response = await apiSessionRef.set(sessionJson, { merge: true });
      
      console.log("Response ", response);
      return {
      status: status,
      data: data,
      response: response
    };  
  },

  /**
  * 
  * @param options.sessionId The unique identifier of the spacecraft 
  * @param options.session.id requiredThe unique identifier of a session

  */
  putApiSessionSessionId: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    console.log("Updating Session with session id", sessionId);
    var sessionId = options.sessionId;
    var data = {
        "id": sessionId,
      },
      status = '201';

      var sessionJson = options.session;
      delete sessionJson.id;
      sessionJson["sessionId"] = sessionId;
      console.log("Updating Session: ", sessionJson);

      //const apiSessionRef = db.collection("api-session").doc(options.session.id);
      //const response = await apiHealthRef.get();
      const apiSessionRef = db.collection("api-session").doc(sessionId);
      console.log("Got Session Ref: ", apiSessionRef);

      const response = await apiSessionRef.update(sessionJson);
      data.response = response;
      
      console.log("Response ", response);
      return {
      status: status,
      data: data
    };   
  },
  /**
  * 
  * @param options.sessionId The unique identifier of the spacecraft 
  * @param options.session.id requiredThe unique identifier of a session

  */
  getApiSessionSessionId: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    console.log("Getting Session");
    var sessionId = options.sessionId;
    var data = {},
      status = '201';

      
      

      //const apiSessionRef = db.collection("api-session").doc(options.session.id);
      //const response = await apiHealthRef.get();
      const apiSessionRef = db.collection("api-session").doc(sessionId);
      console.log("Got Session Ref: ", apiSessionRef);

      const doc = await apiSessionRef.get(sessionId);
      if (!doc.exists) {
      
      
        console.log('No such document!');
      } else {
        data = doc.data();
        console.log('Document data:', doc.data());
      }
      
      
      return {
      status: status,
      data: data
    };   
  },
};


