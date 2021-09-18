console.log("Hello Netflix");
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pug = require('pug');
import {createMenu} from './components/menu/menu.js';

console.log(pug.renderFile('./src/components/menu/menu.pug'));
console.log(createMenu())