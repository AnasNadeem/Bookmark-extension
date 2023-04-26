export async function getActiveTab() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
    return tabs[0];
}

export function generateTags(title) {
    const tags = title.split(" ");
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'for', 'nor', 'so', 'yet', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'if', 'into', 'are', 'like', 'than', 'via', 'with', 'without', 'after', 'along', 'from', 'is', 'near', 'off', 'onto', 'out', 'over', 'past', 'under', 'within', 'about', 'above', 'across', 'against', 'amid', 'among', 'around', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'concerning', 'considering', 'despite', 'down', 'during', 'except', 'excepting', 'excluding', 'following', 'inside', 'minus', 'next', 'opposite', 'outside', 'per', 'plus', 'regarding', 'round', 'save', 'since', 'through', 'toward', 'towards', 'underneath', 'unlike', 'until', 'upon', 'according', 'ahead', 'apart', 'aside', 'away', 'back']
    tags.forEach((tag, index) => {
        tags[index] = tag.replace(/[^a-zA-Z0-9@]/g, "");
    });
    const filteredTags = tags.filter(tag => {
        return tag.length >= 3 && tag.length <= 25 && !commonWords.includes(tag.toLowerCase());
    });
    return [... new Set(filteredTags)];
}
