import { getActiveTab, generateTags } from "../utils.js";

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
