

export async function getRandomFact() {

    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return { text: "Could not load a fact." }
    }

    
}
