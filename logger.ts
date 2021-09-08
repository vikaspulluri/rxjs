import * as chalk from 'chalk';

const arr = [chalk.blue, chalk.yellow, chalk.green, chalk.magenta, chalk.cyan, chalk.blueBright, chalk.yellowBright, chalk.greenBright, chalk.magentaBright, chalk.cyanBright];
export const log = (message) => {
  const fn = arr[Math.floor(Math.random() * arr.length)];
  message = typeof message === 'object' ? JSON.stringify(message) : message;
  console.log(fn.call(this, message));
  return null;
}

// export const call = (obj, fn) => (log(obj.name) || obj[fn].call(this));
export const exec = (obj) => {
  for(let key in obj) {
    if (typeof obj[key] === 'function') {
      log(`${obj.name} => ${key}`);
      obj[key].call(this);
    }
  }
}