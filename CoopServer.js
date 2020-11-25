//js file containing wrapper to communicate with
//Azure function

const axios = require("axios");

let baseURL = "http://localhost:7071/api/HttpTrigger?"
//let baseURL = "https://tkdcoop.azurewebsites.net/api/HttpTrigger?";

let users = [];

let elections = [];

let matches = [];



async function getEventFile(eventId) {
  let baseImageURL = "https://tkdcoop.blob.core.windows.net/event-files/";
  try {
    let file = await axios.get(baseImageURL + eventId);
    return file.data;
  } catch {
    //return 'images/default.jpg'
    return "error";
  }
}

async function getEventImage(eventId) {
  let baseImageURL = "https://tkdcoop.blob.core.windows.net/event-images/";
  try {
    image = await axios.get(baseImageURL + eventId + "?" + Math.random());
    return image.data;
  } catch {
    //Should add a new default image for events
    return defaultImg;
  }
}



//Get an updated election
async function getElections(force = false) {
    try {
        let info = await axios.get(
            baseURL + `type=getElections&force=${force}`,
            {},
            {}
        );
        elections = info.data;
    }
    catch {
        elections = []
    }
  return elections;
}


//Gets the balance of a user earned from selling his cards.
async function getAthleteBalance(user) {
  let info = await axios.get(
    baseURL + `type=getAthleteBalance&user=${user}`,
    {},
    {}
  );
  info = JSON.parse(info.request.response);
  return info;
}

 async function getOpenLeagues() {
  let info = await axios.get(baseURL + "type=getOpenLeagues", {}, {});
  info = JSON.parse(info.request.response);
  return info;
}

async function getClosedLeagues() {
  let info = await axios.get(baseURL + "type=getClosedLeagues", {}, {});
  info = JSON.parse(info.request.response);
  return info;
}

 async function getUserByAddress(address) {
  if (users.length === 0) {
    await getAllUsers();
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].userAddress === address) {
      return users[i];
    }
  }
}



 async function getAllUsers() {
    try {
        let info = await axios.get(baseURL + "type=getAllUsers", {}, {});
        users = info.data;
      return users;
    } catch (err) {
        console.log(err)
      return [];
    }
  }

 async function getAllMatches() {
  if (matches.length > 0) {
    return matches;
  } else {
    try {
      let info = await axios.get(baseURL + "type=getAllMatches", {}, {});
      matches = info.data;
      return matches;
    } catch {
      return [];
    }
  }
}



 async function getEvent(eventId) {
  let info = await axios.get(
    baseURL + `type=getEvent&eventId=${eventId}`,
    {},
    {}
  );
  info = JSON.parse(info.request.response);
  if (!info.endDate) {
    info.endDate = info.startDate;
  }
  return info;
}







module.exports = {getAllMatches, getAllUsers, getElections}