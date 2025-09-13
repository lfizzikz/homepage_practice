const COINS = ["bitcoin", "ethereum"];
const API = `https://api.coincap.io/v3/assets?ids=${COINS.join(",")}`;
const COINCAP_TOKEN =
  "49be133b3a1dde9c6b1b6b824b818eb7cc291c887806d726ca15023e1faa5956";

const fmtPrice = (n) =>
  Number(n).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
const fmtPct = (n) => `${Number(n).toFixed(2)}%`;

function renderRow(asset) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
      <div>
        <strong class="text-uppercase">${asset.symbol}</strong>
        <div class="text-muted small">${asset.name}</div>
      </div>
      <div class="text-end">
        <div>${fmtPrice(asset.priceUsd)}</div>
        <div class="${Number(asset.changePercent24Hr) >= 0 ? "text-success" : "text-danger"} small">
          ${fmtPct(asset.changePercent24Hr)}
        </div>
      </div>
    `;
  return li;
}

async function loadPrices() {
  try {
    const res = await fetch(API, {
      headers: { Authorization: `Bearer ${COINCAP_TOKEN}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const json = await res.json();

    const list = document.getElementById("crypto-list");
    list.innerHTML = "";
    json.data.forEach((asset) => list.appendChild(renderRow(asset)));

    document.getElementById("updated-at").textContent =
      `Updated: ${new Date().toLocaleTimeString()}`;
  } catch (err) {
    document.getElementById("updated-at").textContent = "Error loading prices";
    console.error("Price load failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPrices();
  setInterval(loadPrices, 30_000);
});
