let notes = getSavedNotes();

const user = {
  name: "Mohammad",
  age: 25,
};

// Filters Decleration
const filters = {
  searchText: "",
  sortBy: "byEdited",
};
document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});
document.querySelector("#filter-by").addEventListener("change", function (e) {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", function (e) {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  console.log(notes);

  saveNotes(notes);
  location.assign(`/notes-app/edit.html#${id}`);
});

window.addEventListener("storage", function (e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
