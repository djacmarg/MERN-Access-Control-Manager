//crypto packeage is required for this helper
const crypto = require("crypto");

//a simple random bytes generator, that uses crypto.randomBytes
exports.createdRandomBytes = () =>
new Promise((resolve, reject) => {
  /*
  30 being the number of bytes to be generated here,
  eg, 48, 64, or whatever...
  */
 crypto.randomBytes(30, (err, buff) => {
   if (err) reject(err);
   
   const token = buff.toString("hex");
   resolve(token);
  });
});

//this custom middleware will help send the error/feedback to user
exports.invokeError = (res, error, status = 401) => {
  //where status response code is 401
  res.status(status).json({ success: false, error });
};
