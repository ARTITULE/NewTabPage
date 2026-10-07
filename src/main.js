
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const engineSelect = document.querySelector("#search-engine");

const websites = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://www.duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
}

engineSelect.value = localStorage.getItem("search-engine") || "google";

engineSelect.addEventListener("change", () => {
    localStorage.setItem("search-engine", engineSelect.value);
});

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
