const BASE_API = "http://127.0.0.1:8000/api";
const SITE_API = `${BASE_API}/site`;
const TAG_API = `${BASE_API}/tag`;
const BOOKMARK_API = `${BASE_API}/bookmark`;

const siteLinkSidebar = document.getElementById("siteLinkSidebar");
const tagLinkSidebar = document.getElementById("tagLinkSidebar");
const bookmarkTbody = document.getElementById("bookmarkTbody");
const breadcrumbList = document.getElementById("breadcrumbList");
const searchInput = document.getElementById("searchInput");

// HELPER FUNCTIONS
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

const resetBreadcrumb = () => {
  breadcrumbList.innerHTML = `
    <li class="breadcrumbItem" id="breadcrumbShowAllBookmark">All Bookmarks</li>
  `;
};

// GET SITE
const getSite = async () => {
  const user = await readLocalStorage("user");
  const token = user.token;
  const headersData = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };
  const headersMethodGet = { method: "GET", headers: headersData };

  fetch(SITE_API, headersMethodGet)
    .then((resp) => {
      return resp.json();
    })
    .then( data => {
      data.forEach((site) => {
        siteLinkSidebar.innerHTML += `
        <li class="link row siteRow" id="site${site.id}">
          <i class="fa-solid fa-bars-progress icon"></i>
          <span class="rowTitle">${site.name}</span>
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
    .then( data => {
      data.forEach((tag) => {
        tagLinkSidebar.innerHTML += `
        <li class="link row tagRow" id="tag${tag.id}">
          <span class="icon">#</span>
          <!-- <i class="fa-solid fa-tag icon"></i> -->
          <span class="rowTitle">${tag.name}</span>
        </li>
        `;
      });
    });
};

// GET BOOKMARK
const getBookmarks = async () => {
  const user = await readLocalStorage("user");
  const token = user.token;
  const headersData = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };
  const headersMethodGet = { method: "GET", headers: headersData };

  fetch(BOOKMARK_API, headersMethodGet)
    .then( resp => {
      return resp.json();
    })
    .then( data => {
      bookmarkTbody.innerHTML = "";
      data.forEach((bookmark) => {
        bookmarkTbody.innerHTML += bookmarkRowTemplate(bookmark);
      });
    });
};

window.onload = () => {
  getSite();
  getTags();
  getBookmarks();
};

// ALL EVENT LISTENERS
bookmarkTbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("trashIcon")) {
    const id = e.target.parentElement.parentElement.id.replace("bookmark", "");
    deleteBookmark(id);
  }
});

siteLinkSidebar.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("link")) {
    const id = e.target.parentElement.id.replace("site", "");
    const name = e.target.parentElement.querySelector(".rowTitle").innerText;
    getSiteBookmarks(id, name);
  }
});

tagLinkSidebar.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("link")) {
    const id = e.target.parentElement.id.replace("tag", "");
    const name = e.target.parentElement.querySelector(".rowTitle").innerText;
    getTagBookmarks(id, name);
  }
});

breadcrumbList.addEventListener("click", (e) => {
  if (e.target.id === "breadcrumbShowAllBookmark") {
    resetBreadcrumb();
    getBookmarks();
  }
});

// DELETE BOOKMARK
const deleteBookmark = async (id) => {
  let bookmarkElem = document.getElementById(`bookmark${id}`);
  const user = await readLocalStorage("user");
  const token = user.token;
  const headersData = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };

  const headersMethodDelete = {method:'DELETE', headers: headersData}
  fetch(`${BOOKMARK_API}/${id}`, headersMethodDelete)
  .then( resp => {
    if (resp.ok){
      bookmarkElem.remove()
      return resp;
    }
  })
}

// GET SITE BOOKMARKS
const getSiteBookmarks = async (id, name) => {
  const user = await readLocalStorage("user");
  const token = user.token;
  const headersData = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  const headersMethodGet = { method: "GET", headers: headersData };

  fetch(`${SITE_API}/${id}/bookmarks`, headersMethodGet)
    .then((resp) => {
      return resp.json();
    })
    .then( data => {
      bookmarkTbody.innerHTML = "";
      data.forEach( bookmark => {
        bookmarkTbody.innerHTML += bookmarkRowTemplate(bookmark);
      });
  });
  resetBreadcrumb();
  breadcrumbList.innerHTML += `<li class="breadcrumbItem">${name}</li>`;
};

// GET TAG BOOKMARKS
const getTagBookmarks = async (id, name) => {
  const user = await readLocalStorage("user");
  const token = user.token;
  const headersData = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  const headersMethodGet = { method: "GET", headers: headersData };

  fetch(`${TAG_API}/${id}/bookmarks`, headersMethodGet)
    .then((resp) => {
      return resp.json();
    })
    .then( data => {
      bookmarkTbody.innerHTML = "";
      data.forEach( bookmark => {
        bookmarkTbody.innerHTML += bookmarkRowTemplate(bookmark);
      });
  });
  resetBreadcrumb();
  breadcrumbList.innerHTML += `<li class="breadcrumbItem">${name}</li>`;
}

// TEMPLATE
const bookmarkRowTemplate = (bookmark) => {
  return `
  <tr id="bookmark${bookmark.id}">
    <td>${bookmark.title}</td>
    <td>
      <a href="${bookmark.url}" target="_blank">
        ${bookmark.url}
      </a>
    </td>
    <td>
      <ul class="tableTags">
        ${bookmark.tags.map((tag) => {
          return `<li class="tableTag">#${tag.name}</li>`;
        })}
      </ul>
    </td>
    <td>
      <i class="fas fa-edit"></i>
      <i class="fa-solid fa-trash trashIcon"></i>
    </td>
  </tr>
  `;
}

// SEARCH in TAGS and SITES
searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const siteRow = document.querySelectorAll(".siteRow");
  const tagRow = document.querySelectorAll(".tagRow");

  siteRow.forEach((row) => {
    const rowTitle = row.querySelector(".rowTitle").innerText.toLowerCase();
    if (rowTitle.indexOf(searchValue) > -1) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  tagRow.forEach((row) => {
    const rowTitle = row.querySelector(".rowTitle").innerText.toLowerCase();
    if (rowTitle.indexOf(searchValue) > -1) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// RESET DISPLAY OF TAGS AND SITES when search input is empty
searchInput.addEventListener("search", (e) => {
  const searchValue = e.target.value.toLowerCase();
  if (searchValue === "") {
    resetDisplay();
  }
});

const resetDisplay = () => {
  const siteRow = document.querySelectorAll(".siteRow");
  const tagRow = document.querySelectorAll(".tagRow");
  siteRow.forEach((row) => {
    row.style.display = "";
  });
  tagRow.forEach((row) => {
    row.style.display = "";
  });
}
