/* Function to execute try and catch  */

module.exports = theFunc => (req, res, next) => {
  /* 
    Passing the same function as it acts like try : Try this if not run catch 
    */
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
