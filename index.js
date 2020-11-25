const server = require("./CoopServer");
const fs = require("fs");

const backup = async () => {
  console.log("Starting Backup");

  let dir = Date.now().toString();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let users = await server.getAllUsers();
  let elections = await server.getElections();
  let matches = await server.getAllMatches();

  fs.writeFile(`${dir}//users.json`, JSON.stringify(users), err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Users file written");
  });
  fs.writeFile(`${dir}/elections.json`, JSON.stringify(elections), err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Elections file written");
  });

  fs.writeFile(`${dir}/matches.json`, JSON.stringify(matches), err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Matches file written");
  });
};


// Interval in seconds of how long you wish to run the app. 
setInterval(backup, 604800);
