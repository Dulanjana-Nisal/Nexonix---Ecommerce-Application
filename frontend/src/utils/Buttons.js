//hide search result box
export function hideSearchBox(selectContent) {
    if (selectContent.current) {
        selectContent.current.style.display = "none"
    }
}

//display search result box
export function displaySearchBox(selectContent) {
    if (selectContent.current) {
        selectContent.current.style.display = "block"
    }
}