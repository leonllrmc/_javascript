require('child_process').exec((process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open') + ' ' + url);//open 'url' in the browser
