import { getRandomFact } from "./api.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const engineSelect = document.querySelector("#search-engine");
const factElement = document.querySelector("#random-fact");
const newFactButton = document.querySelector('#random-fact-button');

const websites = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://www.duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
}

engineSelect.value = localStorage.getItem("search-engine") || "google";
input.focus();

engineSelect.addEventListener("change", () => {
    localStorage.setItem("search-engine", engineSelect.value);
});



document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) {
        event.preventDefault();
        input.focus();
    }
});

const factData = await getRandomFact();
factElement.textContent = factData.text;

newFactButton.addEventListener("click", async () => {
    newFactButton.disabled = true;
    factElement.textContent = "Loading a fact...";

    try {
        const factData = await getRandomFact();
        factElement.textContent = factData.text;
    }
    finally {
        newFactButton.disabled = false;
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();


    if (!query) return;

    try {
        let urlString;

        if (
            query.startsWith("http://") ||
            query.startsWith("https://")
        ) {
            urlString = query;
        } 
        else {
            urlString = `https://${query}`;
        }

        const url = new URL(urlString);

        if (url.hostname.includes(".")) {
            window.location.href = url.href;
            return;
        }
    } catch {
        
    }


       window.location.href = `${websites[engineSelect.value]}${encodeURIComponent(query)}`; 
    
});
