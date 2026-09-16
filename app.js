const addBtn = document.querySelector("#addBtn");
const noteInput = document.querySelector("#noteInput");
const notesContainer = document.querySelector("#notesContainer");

// localStorage se notes load karo
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Page load pe saved notes dikhao
window.addEventListener("load", () => {
  renderNotes();
});

// Add button click
addBtn.addEventListener("click", () => {
  let text = noteInput.value.trim();

  if (text === "") {
    alert("Note khali hai — kuch likhen!");
    return;
  }

  notes.push(text);
  saveToLocalStorage();
  renderNotes();
  noteInput.value = "";
});

// Notes screen pe dikhao
function renderNotes() {
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    notesContainer.innerHTML =
      "<p style='text-align:center; color:gray;'>Your notes will show up here ✨</p>";
    return;
  }

  notes.forEach((note, index) => {
    let card = document.createElement("div");
    card.classList.add("note-card");

    card.innerHTML = `
      <p>${note}</p>
      <button class="delete-btn" data-index="${index}">🗑️</button>
    `;

    notesContainer.append(card);
  });

  // Delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let index = btn.getAttribute("data-index");
      notes.splice(index, 1);
      saveToLocalStorage();
      renderNotes();
    });
  });
}

// localStorage mein save karo
function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
