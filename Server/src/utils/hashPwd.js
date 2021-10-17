/* -------------------------------------------------------------------------- */
/*                              Hashing Password                              */
/* -------------------------------------------------------------------------- */

const bcrypt = require("bcryptjs");

async function hashPwd(plainText) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(plainText, salt);
  return hashed;
}

async function compareHashPwd(plainText, hash) {
  console.log("plainText: " + plainText);
  console.log("hash: " + hash);
  const isMatch = await bcrypt.compare(plainText, hash);
  return isMatch;
}

module.exports = { hashPwd, compareHashPwd };
