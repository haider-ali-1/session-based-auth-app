import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = (url) => {
  return dirname(fileURLToPath(url));
};

export { __dirname };
