module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/health-service', require('./routes/health_service.route'));

};
