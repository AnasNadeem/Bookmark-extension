import { getActiveTab, generateTags} from "./utils.js";
import { BOOKMARK_API, TAGS_IN_API } from "./constants.js";

// const formUrl = document.getElementById("url");
const formTitle = document.getElementById("title");
const formTags = document.getElementById("tags");
const tagsSuggestion = document.getElementById("tagsSuggestion");
const closeBtn = document.getElementById("closeBtn");
const bookmarkFormId = document.getElementById('bookmarkFormId');
const messageAlert = document.getElementById('messageAlert');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');
const formTitleHeading = document.getElementById('formTitleHeading');
const easemylinkTitleId = document.getElementById('easemylinkTitleId');

let existingBookmarkId = null; 
let user = {}
chrome.storage.local.get('user', (data) => {
    user = data.user;
});

const currentTab = await getActiveTab();
const urlInput = currentTab.url;
// formUrl.value = currentTab.url;
formTitle.value = currentTab.title;

// Check if bookmark exist with same url
const getApiHeader = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `${user.token}`
    },
}
const existingBookmark = await fetch(`${BOOKMARK_API}?url=${currentTab.url}`, getApiHeader);
if (existingBookmark.ok) {
    let existingBookmarkData = await existingBookmark.json();
    if (existingBookmarkData.length > 0){
        existingBookmarkData = existingBookmarkData[0];
        existingBookmarkId = existingBookmarkData.id;
        // formUrl.value = existingBookmarkData.url;
        formTitle.value = existingBookmarkData.title;
        formTitleHeading.innerText = "Edit Bookmark";
        const tags = existingBookmarkData.tags.map(tag => tag.name).join(", ");
        formTags.value = tags + ", ";
    }
}

// Suggested tags based on site title
const suggestiveTags = generateTags(currentTab.title);

// const tagsInBody = {
//     name: suggestiveTags
// }
// const tagsInHeader = {
//     method: 'PUT',
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `${user.token}`
//     },
//     body: JSON.stringify(tagsInBody)
// }
// const usedTags = await fetch(TAGS_IN_API, tagsInHeader);
// if (usedTags.ok) {
//     const usedTagsData = await usedTags.json();
//     console.log(usedTagsData);
//     for (const tag of usedTagsData) {
//         if (suggestiveTags.includes(tag)) {
//             suggestiveTags.splice(suggestiveTags.indexOf(tag), 1);
//         }
//     }
// }
for (let tag of suggestiveTags) {
    tag = tag.toLowerCase();
    if (formTags.value.includes(tag)) {
        continue;
    }
    const tagElement = document.createElement("p");
    tagElement.classList.add("tag");
    tagElement.innerText = tag;
    tagsSuggestion.appendChild(tagElement);
}

tagsSuggestion.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag")) {
        formTags.value += e.target.innerText + ", ";
        e.target.remove();
    }
});

easemylinkTitleId.addEventListener("click", (e) => {
    if (e.target.nodeName==="H1") {
        chrome.tabs.create({url: chrome.runtime.getURL('./index.html')});
    }
});

bookmarkFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    // const urlInput = document.getElementById('url').value;
    const titleInput = document.getElementById('title').value;
    const tagsInput = document.getElementById('tags').value;

    if (!urlInput || !titleInput) {
        errorMsg.innerHTML = 'Please enter your url and title';
    }

    let tags = tagsInput.split(',').map(tag => tag.trim());
    tags = [...new Set(tags)];
    let tagList = [];
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] === '') {
            tags.splice(i, 1);
            continue;
        }
        const tag = {'name': tags[i].toLowerCase()}
        tagList.push(tag);
    }

    const bookmarkData = {
        'url': urlInput,
        'title': titleInput,
        'tags': tagList
    }
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${user.token}`
        },
        body: JSON.stringify(bookmarkData)
    }

    let bookmarkApi = BOOKMARK_API;
    let successMsgValue = 'Bookmark added successfully';
    if (existingBookmarkId) {
        bookmarkData.id = existingBookmarkId;
        header.method = 'PUT';
        bookmarkApi = `${BOOKMARK_API}/${existingBookmarkId}`;
        successMsgValue = 'Bookmark updated successfully';
    }else{
        header.method = 'POST';
    }

    fetch(bookmarkApi, header)
    .then(resp => {
        if (resp.ok){
            return resp.json()
        }
        return Promise.reject(resp);
    })
    .then(data => {
        successMsg.innerHTML = successMsgValue;
        errorMsg.innerHTML = '';
        messageAlert.style.display = 'block';
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            for (const [key, value] of Object.entries(err)) {
                errorMsg.innerHTML += `${key}: ${value}`;
            }
            successMsg.innerHTML = '';
            messageAlert.style.display = 'block';
        })
    })
});

closeBtn.addEventListener("click", () => {
    window.close();
});