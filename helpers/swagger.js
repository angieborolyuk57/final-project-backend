const fs = require('fs/promises');
const path = require('path');

const swaggerDocs = async () => {
  return JSON.parse(await fs.readFile(`${path.resolve()}/swagger.json`));
};

module.exports = swaggerDocs;
