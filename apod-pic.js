const NASA_KEY = "5k12uYRPQNJ3arSH2fysI6oo4zXPt1l1OkoWIrZM";
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

async function loadAPOD() {
  try {
    const res = await fetch(APOD_URL);
    if (!res.ok) throw new Error("Failed to load APOD");
    const data = await res.json();

    // Set image and title
    document.getElementById("apod-img").src = data.url;
    document.getElementById("apod-title").innerText = data.title;
  } catch (err) {
    console.error(err);
    document.getElementById("apod-title").innerText = "Error loading APOD";
  }
}

document.addEventListener("DOMContentLoaded", loadAPOD);
