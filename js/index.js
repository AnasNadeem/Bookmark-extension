const BASE_API = "http://127.0.0.1:8000/api";
const SITE_API = `${BASE_API}/site`;
const TAG_API = `${BASE_API}/tag`;

const siteLinkSidebar = document.getElementById("siteLinkSidebar");
const tagLinkSidebar = document.getElementById("tagLinkSidebar");

const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};

// GET SITE
const getSite = async () => {
  const user = await readLocalStorage("user");
  const token = user.token;
  console.log(token);
  const headersData = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };
  const headersMethodGet = { method: "GET", headers: headersData };
  fetch(SITE_API, headersMethodGet)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.forEach((site) => {
        siteLinkSidebar.innerHTML += `
        <li class="link" id="site${site.id}">
          <div class="row">
            <i class="fa-solid fa-bars-progress icon"></i>
            <span class="rowTitle">${site.name}</span>
          </div>
        </li>
        `;
      });
    });
};

// GET TAG
const getTags = async () => {
  const user = await readLocalStorage("user");
  const token = user.token;
  const headersData = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };
  const headersMethodGet = { method: "GET", headers: headersData };
  fetch(TAG_API, headersMethodGet)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.forEach((tag) => {
        tagLinkSidebar.innerHTML += `
        <li class="link" id="tag${tag.id}">
          <div class="row">
            <span class="icon">#</span>
            <!-- <i class="fa-solid fa-tag icon"></i> -->
            <span class="rowTitle">${tag.name}</span>
          </div>
        </li>
        `;
      });
    });
};

window.onload = () => {
  getSite();
  getTags();
};
