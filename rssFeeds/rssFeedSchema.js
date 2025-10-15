/**
 * Author Gavin Stankovsky
 * Breif Overview:
 *  Fetch() from feedURL -> get_mappings(): creates feedObj, instantiates: mapping, name, endpoint
 *  Then fetch() url/sid/name and store in feedObj.response 
 *  use feedObj as paralell array with the drop down menu 
 *  load first feed and store the rest into feedObj's as they load
 *  
 */


const feedURL = 'http://138.49.184.106:3000/api/v1/feeds';

const feedObj_arr = [];

class FeedObject {
    constructor(mapping, name, endpoint, response) {
        this.mapping = mapping;
        this.name = name;
        this.endpoint = endpoint;
        this.response = response;
    }
}
/** Start main body: */
fetch_feed_schema(feedURL).then((fs) => {
    const feedobjs = get_mappings(feedURL, fs.feeds, fs.sid);

    fetch_endpoints(feedobjs).then((responses) => {
        document.getElementById("load_button").addEventListener("click", () => {
            const idx = document.getElementById("select-names").value;
            // clear list, add new items
            document.getElementById("content-feed").innerHTML = "";
            generate_li_items(idx, responses);

        });
    });

})
.catch((err) => console.log(err));

/** End of main function body */

async function fetch_feed_schema(url) {
    try {
        const data = await fetch(url);
        if (!data.ok) { throw new Error(data.ok) }

        const json = await data.json();

        return json;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function fetch_endpoints() {
    let first_loaded = false;
    let i = 0;

    for (const attr of feedObj_arr) {
        feedObj_arr[i].response = (await (await fetch(attr.endpoint)).json());

        if (first_loaded === false) {
            /* Load the first page. */
            first_loaded = true;
            generate_li_items(0);
        }
        i++;
    }
}

function fill_select_names(val, feed_name) {
    const name_dropdown = document.getElementById("select-names");
    const name_option = document.createElement("option");

    // throw the names into <select> drop down menu
    name_option.textContent = feed_name;
    name_option.value = val;
    name_dropdown.appendChild(name_option);
}


function get_mappings(url, feeds, sid) {

    for (const val in feeds) {
        const name = feeds[val].name;
        const mapping = feeds[val].mapping;
        const endpoint = url + '/' + sid + '/' + name;

        // Array of: https://.../sid/feed.name
        feedObj_arr.push(new FeedObject(mapping, name, endpoint, null));
        fill_select_names(val, name);
    }

    return feedObj_arr;
}

function generate_li_items(idx) {
    const items = feedObj_arr[idx].response.items;
    const content = feedObj_arr[idx].mapping.contentSnippet;
    const title = feedObj_arr[idx].mapping.title;
    const pubDate = feedObj_arr[idx].mapping.pubDate;

    for (const item of items) {
        const ul = document.getElementById("content-feed");

        const li_element = document.createElement("li");
        ul.appendChild(li_element);

        const list_container = document.createElement("div");
        li_element.appendChild(list_container);
        list_container.className = "list_container";

        const subdiv_title = document.createElement("div");
        list_container.appendChild(subdiv_title);
        subdiv_title.className = "subdiv_title";
        subdiv_title.textContent = item[`${title}`]; 

        const subdiv_date = document.createElement("div");
        list_container.appendChild(subdiv_date);
        subdiv_date.className = "subdiv_date";
        subdiv_date.textContent = item[`${pubDate}`]; 

        const subdiv_body = document.createElement("div");
        list_container.appendChild(subdiv_body);
        subdiv_body.className = "subdiv_body";
        subdiv_body.textContent = item[`${content}`];
    }
}
