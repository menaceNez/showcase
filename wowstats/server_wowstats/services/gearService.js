var bnetToken = require('./bnet_server_tok.js');
/* 
  First query /data/wow/search/item?...
  to get media /data/wow/media/item/{itemid}?...
  to get stats /data/wow/item/{itemid}
*/
function Gearpiece(name, itemID, mediaID, invintory_type, subclass_name, required_level, quality) {
  this.name = name;
  this.itemID = itemID;
  this.mediaID = mediaID;
  this.invintory_type = invintory_type;
  this.subclass_name = subclass_name;
  this.required_level = required_level;
  this.quality = quality;
}

// async function doAccess() {
//   let token = await bnetToken.getServerToken();

//   const ret = await fetch('https://us.api.blizzard.com/data/wow/item-class/2/item-subclass/7?namespace=static-classic-us&locale=en_US', {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// }

async function queryByName(name, className) {
  try {
    let token = await bnetToken.getServerToken();

    // let page = 1;

    // just added item_class.id=2||4
    let searchEndpointRes = await fetch(`https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=${name}&item_class.id=2||4&orderby=name&_page=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let results = (await searchEndpointRes.json()).results;

    let gearpieces = [];
    // console.log("######## start filter ########");
    const resultsFiltered = filterWepArmor(results, className);
    // console.log("######## end filter ########");
    // console.log("######## extracting Gearpices ########");
    gearpieces = extractGearpieces(resultsFiltered, token);
    // console.log("######## finished extracting Gearpices ########");

    // request more pages ( Slower )
    // if (resultsFiltered.length <= 50) { // get second page of data if not enough
    //   page++;
    //   let response2 = await fetch(`https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=${name}&orderby=name:asc&_page=${page}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });

    //   let results2 = (await response2.json()).results;
    //   let gearpieces2 = extractGearpieces(filterWepArmor(results2, className));

    //   gearpieces = gearpieces.concat(gearpieces2);
    // }

    // limit number of pages to reudce the need to query media:
    // console.log("Do we slim?: ", gearpieces.length);
    while(gearpieces.length > 25) {
      gearpieces.pop();
      // console.log("Yes we slim: ", gearpieces.length);
    }

    // console.log("######## verifying Media ########");
    mediaGear = await extractValidMedia(gearpieces, token);
    // console.log("######## finished verifying Media ########");

    return mediaGear;
  }
  catch (error) {
    console.log("Error in queryByName: ", error);
    return null;
  }
}

async function queryMedia(id, token) {
  let mediaFetchRes = await fetch(`https://us.api.blizzard.com/data/wow/media/item/${id}?namespace=static-classic-us&locale=en_US`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("loading media...");

  return await mediaFetchRes.json();
}

async function queryItemStats(itemID) {
  const token = await bnetToken.getServerToken();
  try {
    const itemStats = await fetch(`https://us.api.blizzard.com/data/wow/item/${itemID}?namespace=static-classic-us&locale=en_US`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const ret = await itemStats.json();

    // console.log(ret);

    return ret;
  }
  catch(error) {
    console.log("queryItemStats() error: ", error);
    return null;
  }
}

function filterWepArmor(results, className) {
  // console.log("################ Initial len: => ", results.length);
  switch (String(className).toLowerCase()) {
    case 'mage':
      let weapons = results.filter(obj => /*(obj.data.item_class.id === 2) &&*/
      (obj.data.item_subclass.id === 7 ||
        obj.data.item_subclass.id === 10 ||
        obj.data.item_subclass.id === 15)
      );
      // console.log("################### DECREMENT: weapons => ", weapons.length);
      let armor = results.filter(obj => /*(obj.data.item_class.id === 4) &&*/
      (obj.data.item_subclass.id === 1 ||
        obj.data.item_subclass.id === 0 ||
        obj.data.item_subclass.id === 5));
      // console.log("###################### Armor Decrement: => ", armor.length);

      let mageRet = weapons.concat(armor);

      return mageRet;
    case 'warrior':
      let wep = results.filter(obj => 
        (obj.data.item_class.id === 2) &&
        (obj.data.item_subclass.id !== 9 &&
        obj.data.item_subclass.id !== 11 &&
        obj.data.item_subclass.id !== 12 &&
        obj.data.item_subclass.id !== 19));
      // console.log("################### DECREMENT: weapons => ", wep.length);

      let arm = results.filter(obj => 
        (obj.data.item_class.id === 4) && // armor class -> select specific subclass
        (obj.data.item_subclass.id !== 7 &&
        obj.data.item_subclass.id !== 8 &&
        obj.data.item_subclass.id !== 9 &&
        obj.data.item_subclass.id !== 10 &&
        obj.data.item_subclass.id !== 11));
      // console.log("###################### Armor Decrement: => ", arm.length);

      let warriorRet = wep.concat(arm);

      return warriorRet;
  }

}

async function extractValidMedia(gearpieces, token) {
  mediaGear = [];

  for (let gp of gearpieces) {
    let media = await queryMedia(gp.mediaID, token);
    if (media && !(media.code)) {
      let resp = (await fetch(media.assets[0].value));

      if (resp.status === 200) {
        gp.mediaLink = media.assets[0].value;
        mediaGear.push(gp);
      }
    }
  }

  return mediaGear;
}

function extractGearpieces(resultsFiltered) {
  let gearpieces = []

  resultsFiltered.forEach((obj) => {

    let gp = new Gearpiece(obj.data.name.en_US, obj.data.id,
      obj.data.media.id, obj.data.inventory_type.name.en_US,
      obj.data.item_subclass.name.en_US, obj.data.required_level,
      obj.data.quality.name.en_US);

    gearpieces.push(gp);
  });

  return gearpieces;
}

module.exports = { queryByName, queryMedia, queryItemStats };