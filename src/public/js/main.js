const turnSelector = document.getElementById("turn-selector");
const resetButton = document.getElementById("reset");
const teams = ["x", "o"];
let currentTeam = teams[0];
const slots = [];
const slotsEvents = [];
for (let i = 0; i < 9; i++) {
  const slot = document.getElementById(i);
  slot.char = "placeholder";
  slotsEvents.push(slot.addEventListener("click", () => showSlot(slot)));
  slots.push(slot);
}

reset.addEventListener("click", () => clearGame(slots));

function showSlot(slot) {
  slot.children[0].style.display = "inline-block";

  if (slot.char === "placeholder") {
    if (currentTeam == teams[0]) {
      currentTeam = teams[1];
      slot.char = "x";
      slot.children[0].setAttribute(
        "src",
        "https://www.freeiconspng.com/thumbs/x-png/x-png-33.png"
      );
    } else {
      currentTeam = teams[0];
      slot.char = "o";
      slot.children[0].setAttribute(
        "src",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Blue_circle.png"
      );
    }
  }

  switch (currentTeam) {
    case "x":
      turnSelector.setAttribute(
        "src",
        "https://www.freeiconspng.com/thumbs/x-png/x-png-33.png"
      );
      break;
    case "o":
      turnSelector.setAttribute(
        "src",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Blue_circle.png"
      );
      break;
  }

  if (checkWin(slots) != "placeholder") {
    removeClickEvents(slotsEvents);
    setTimeout(() => {
      alert(`Winner: ${checkWin(slots)}`);
      clearGame(slots);
    }, 1000);
  }
}

function clearGame(slots) {
  currentTeam = teams[0];
  turnSelector.setAttribute(
    "src",
    "https://www.freeiconspng.com/thumbs/x-png/x-png-33.png"
  );
  for (let slot of slots) {
    slot.char = "placeholder";
    slot.children[0].style.display = "none";
    slot.children[0].setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    );
  }
}

function checkWin(slots) {
  const row1 = slots[0].char == slots[1].char && slots[1].char == slots[2].char;
  const row2 = slots[3].char == slots[4].char && slots[4].char == slots[5].char;
  const row3 = slots[6].char == slots[7].char && slots[7].char == slots[8].char;
  const column1 =
    slots[0].char == slots[3].char && slots[3].char == slots[6].char;
  const column2 =
    slots[1].char == slots[4].char && slots[4].char == slots[7].char;
  const column3 =
    slots[2].char == slots[5].char && slots[5].char == slots[8].char;
  const diagonal1 =
    slots[0].char == slots[4].char && slots[4].char == slots[8].char;
  const diagonal2 =
    slots[2].char == slots[4].char && slots[4].char == slots[6].char;

  if (row1) return slots[0].char;
  else if (row2) return slots[3].char;
  else if (row3) return slots[6].char;
  else if (column1) return slots[0].char;
  else if (column2) return slots[1].char;
  else if (column3) return slots[2].char;
  else if (diagonal1) return slots[0].char;
  else if (diagonal2) return slots[2].char;
}

function removeClickEvents(eventList) {
  for (let event of eventList) {
    removeEventListener("click", event);
  }
}
