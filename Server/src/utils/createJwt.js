/* -------------------------------------------------------------------------- */
/*                                  New Token                                 */
/* -------------------------------------------------------------------------- */

const jwt = require("jsonwebtoken");

function getJwt(p) {
  console.log("inside jwt");
  console.log(process.env.SECRET);

  return new Promise((resolve, reject) => {
    jwt.sign(p, process.env.SECRET, (err, token) => {
      if (err) reject("error");
      resolve(token);
    });
  });
}

module.exports = { getJwt };
