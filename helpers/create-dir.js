const fs = require('fs').promises;
const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};
const createFalderIsExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
module.exports = createFalderIsExist;
