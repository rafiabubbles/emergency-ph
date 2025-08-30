// script.js

// Navbar counters
const heartCount = document.querySelector("#heartCount");
const coinCount = document.querySelector("#coinCount");
const copyCount = document.querySelector("#copyCount");

// Call history + clear button
const callHistoryContainer = document.querySelector(".flex.flex-col.gap-2.text-sm");
const clearBtn = document.querySelector("section button");

// ---------------- Heart Functionality ----------------
document.querySelectorAll(".bg-white button.text-gray-400")
  .forEach(btn =>
    btn.addEventListener("click", () => {
      heartCount.textContent = +heartCount.textContent + 1;
      btn.classList.toggle("text-red-400");
    })
  );

// ---------------- Call Functionality ----------------
let coins = +coinCount.textContent;

document.querySelectorAll(".bg-green-600")
  .forEach(btn =>
    btn.addEventListener("click", () => {
      if (coins < 20) return alert("Not enough coins to make a call!");

      const card = btn.closest("div.bg-white");
      const serviceName = card.querySelector(".font-semibold").textContent;
      const serviceNumber = card.querySelector(".text-2xl").textContent;

      coins -= 20;
      coinCount.textContent = coins;

      alert(`Calling ${serviceName} at ${serviceNumber}...`);

      callHistoryContainer.insertAdjacentHTML("beforeend", `
        <div class="flex justify-between">
          <span class="text-gray-700">${serviceName} (${serviceNumber})</span>
          <span class="text-gray-400">${new Date().toLocaleTimeString()}</span>
        </div>
      `);
    })
  );

// ---------------- Copy Button Functionality ----------------
let copies = 2;

document.querySelectorAll(".bg-white button.flex-1.bg-white")
  .forEach(btn =>
    btn.addEventListener("click", () => {
      const card = btn.closest("div.bg-white");
      const serviceNumber = card.querySelector(".text-2xl").textContent;

      navigator.clipboard.writeText(serviceNumber).then(() => {
        alert(`Copied ${serviceNumber} to clipboard!`);

        copies++;
        copyCount.textContent = `${copies} ${copies === 1 ? "copy" : "copies"}`;
      });
    })
  );

// ---------------- Clear History ----------------
clearBtn.addEventListener("click", () => callHistoryContainer.innerHTML = "");
