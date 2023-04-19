import { getActiveTab, generateTags, BOOKMARK_API } from "./utils.js";

const formUrl = document.getElementById("url");
const formTitle = document.getElementById("title");
const formTags = document.getElementById("tags");
const tagsSuggestion = document.getElementById("tagsSuggestion");
const closeBtn = document.getElementById("closeBtn");

const currentTab = await getActiveTab();
formUrl.value = currentTab.url;
formTitle.value = currentTab.title;

// Suggested tags based on site title
const suggestiveTags = generateTags(currentTab.title);
for (const tag of suggestiveTags) {
    const tagElement = document.createElement("p");
    tagElement.classList.add("tag");
    tagElement.innerText = tag.toLowerCase();
    tagsSuggestion.appendChild(tagElement);
}

tagsSuggestion.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag")) {
        formTags.value += e.target.innerText + ", ";
        e.target.remove();
    }
});

closeBtn.addEventListener("click", () => {
    window.close();
});


const bookmarkFormId = document.getElementById('bookmarkFormId');
const messageAlert = document.getElementById('messageAlert');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');


bookmarkFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('url').value;
    const titleInput = document.getElementById('title').value;
    const tagsInput = document.getElementById('tags').value;

    if (!urlInput || !titleInput) {
        errorMsg.innerHTML = 'Please enter your url and title';
    }

    console.log(urlInput, titleInput, tagsInput);
    const bookmarkData = {
        'url': urlInput,
        'title': titleInput,
        'tags': tagsInput
    }

    const header = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(bookmarkData)
    }

    fetch(BOOKMARK_API, header)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        return Promise.reject(response);
    })
    .then(data => {
        successMsg.innerHTML = data.message;
        messageAlert.classList.add('alert-success');
        messageAlert.classList.remove('alert-danger');
        messageAlert.classList.remove('d-none');
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            errorMsg.innerHTML = err.error;
            messageAlert.classList.add('alert-danger');
            messageAlert.classList.remove('alert-success');
            messageAlert.classList.remove('d-none');
        })
    })
});