require('dotenv').config();
const BNET_ID = process.env.BNET_OAUTH_CLIENT_ID;
const BNET_SECRET = process.env.BNET_OAUTH_CLIENT_SECRET;

async function getServerToken() {
  try {
    const response = await fetch('https://us.battle.net/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${BNET_ID}:${BNET_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const token = await response.json();

    return token.access_token;
  }
  catch(error) {
    console.log("GETSERVERTOKEN(): ", error);
    return null;
  }
}

module.exports = { getServerToken };