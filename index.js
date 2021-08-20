const fs = require("fs");
const path = require("path");
let files = [];

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute);
    } else {
      files.push(absolute);
    }
  }
};

getFilesRecursively('.')
files = files.filter(file => {
  return file.endsWith('mp4') || file.endsWith('jpeg') || file.endsWith('jpg') || file.endsWith('png')
})

const htmlContent = files.map(file => {
  if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('png')) {
    return `
    <img style="width: 100%; height: auto; margin-bottom: 5px;" src="${file}"/>
    `;
  } else if (file.endsWith('.mp4')) {
    return `
    <video preload="false" width="100%" height="auto" controls style="margin-bottom: 5px;">
      <source src="${file}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    `;
  }
}).join('');

fs.writeFileSync('index.html', htmlContent)
console.log("Exported index.html")

let address ,os = require('os') ,ifaces = os.networkInterfaces();
for (let dev in ifaces) {
  const iface = ifaces[dev].filter(function(details) {
    return details.family === 'IPv4' && details.internal === false;
  });
  if(iface.length > 0) address = iface[0].address;
}
// Print the result
console.log('IP: ' + address);
