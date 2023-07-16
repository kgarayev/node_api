const genRandomString = (len = 8) => {
  let res = "";
  const charSelection =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";

  const charSelectionLen = charSelection.length;

  for (let i = 0; i < len; i++) {
    res += charSelection.charAt(Math.floor(Math.random() * charSelectionLen));
  }

  return res;
};

module.exports = { genRandomString };
