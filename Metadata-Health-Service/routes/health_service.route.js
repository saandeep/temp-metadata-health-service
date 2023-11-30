const express = require('express');
const health_service = require('../services/health_service');
const router = new express.Router();
 
router.post('/api-health', async (req, res, next) => {
  let options = { 
  };

  options.apiHealth = req.body;

  try {
    const result = await health_service.postApiHealth(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.get('/api-health/:apiId', async (req, res, next) => {

  console.log("Routing Get API Health", req.params.apiId);

  let options = { 
    "apiId": req.params.apiId,
  };


  try {
    const result = await health_service.getApiHealthApiId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    console.log("Error Routing Get API Health", err);
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.post('/api-session', async (req, res, next) => {
  let options = { 
  };

  options.session = req.body;

  try {
    const result = await health_service.postApiSession(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

router.get('/api-session/:sessionId', async (req, res, next) => {

  console.log("Routing PUT Session ID");
  let options = { 
    "sessionId": req.params.sessionId,
  };


  try {
    const result = await health_service.getApiSessionSessionId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    console.log("Error Routing Get API Health", err);
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.put('/api-session/:sessionId', async (req, res, next) => {

  console.log("Routing PUT Session ID: ", req, req.params);
  let options = { 
    "sessionId": req.params.sessionId,
  };

  options.session = req.body;

  try {
    const result = await health_service.putApiSessionSessionId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    console.log("Error Routing PUT Session ID", err);
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;