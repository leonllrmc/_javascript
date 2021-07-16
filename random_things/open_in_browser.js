/** 
 * ouvre [url] dans le navigateur
 * @param { string } url
 */
const openInBrowser = (url) => require('child_process').exec((process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open') + ' ' + url);
