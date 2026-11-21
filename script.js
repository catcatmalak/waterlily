const people = window.peopleData || [];
const episodes = window.episodesData || [];
const clues = window.cluesData || [];
const story = window.storyData || [];
const grid = document.getElementById("peopleGrid");
const cluesGrid = document.getElementById("clues-container");
const storyGrid = document.getElementById("story-container");
function renderClues() {
if (!cluesGrid) return;
const selectedEpisode =Number(localStorage.getItem("waterlilyLastEpisode")) || 1;
cluesGrid.innerHTML = "";
clues.filter(clue => clue.revealEpisode <= selectedEpisode).forEach(clue => {
const card = document.createElement("article");
card.className = "card";
card.innerHTML = `<span class="tag">${clue.status}</span><h3>${clue.name}</h3><p>${clue.type}</p><p>${clue.description}</p><p><strong>Связанные персонажи:</strong> ${clue.relatedPeople.join(", ")}</p>`;
cluesGrid.appendChild(card);});}
function renderStory() {if (!storyGrid) return;
const selectedEpisode =Number(localStorage.getItem("waterlilyLastEpisode")) || 1;
storyGrid.innerHTML = "";
story.filter(event => event.revealEpisode <= selectedEpisode).forEach(event => {
const card = document.createElement("article");card.className = "card";
card.innerHTML = `<span class="tag">${event.type}</span><h3>${event.title}</h3><p>${event.description}</p><span class="tag">Серия ${event.episode}</span>`;storyGrid.appendChild(card);});}
function render(q = "") {if (!grid) return;
const selectedEpisode =Number(localStorage.getItem("waterlilyLastEpisode")) || 1;
grid.innerHTML = "";
people.filter(person =>
person.firstEpisode <= selectedEpisode &&(person.name + " " + person.role).toLowerCase().includes(q.toLowerCase())).forEach(person => {
const el = document.createElement("article");el.className = "card";
const visibleFacts = person.facts.filter(
fact => fact.episode <= selectedEpisode);
el.innerHTML = `<span class="tag">${person.role}</span><h3>${person.name}</h3><p>Материалы досье: ${visibleFacts.length}</p><button type="button">Подробнее</button><div class="detail">
${visibleFacts.map(fact => `<p>${fact.text}</p>`).join("")}</div>`;
el.querySelector("button").addEventListener("click", () => {
el.querySelector(".detail").classList.toggle("open");});
grid.appendChild(el);});}
render();
renderClues();
renderStory();
const searchInput = document.getElementById("search");
if (searchInput) {searchInput.addEventListener("input", e => {render(e.target.value);});}
document.querySelectorAll(".main-nav button").forEach(btn => {btn.addEventListener("click", () => {document.querySelectorAll(".main-nav button").forEach(x => {x.classList.remove("active");});
document.querySelectorAll(".panel").forEach(x => {x.classList.remove("active");});btn.classList.add("active");
const page = document.getElementById(btn.dataset.tab);
if (page) {page.classList.add("active");}});});
const episodeGate = document.getElementById("episode-gate");
function selectEpisode(episode) {episode = Number(episode);
if (episode < 1 || episode > 20) return;localStorage.setItem("waterlilyLastEpisode", episode);
document.querySelectorAll("[data-view-episode]").forEach(button => {button.classList.toggle("active",
Number(button.dataset.viewEpisode) === episode);});
if (episodeGate) {episodeGate.style.display = "none";}
closeEpisodeModal();
render(document.getElementById("search")?.value || "");
renderClues();
renderStory();
renderEpisodeDescription();}
// Кнопки серий под меню
document.querySelectorAll("[data-view-episode]").forEach(button => {button.addEventListener("click", () => {selectEpisode(button.dataset.viewEpisode);});});
// Кнопки начального окна
document.querySelectorAll(".episode-gate-grid button").forEach(button => {
button.addEventListener("click", () => {selectEpisode(button.dataset.episode);});});
function renderEpisodeDescription() {
const selectedEpisode = Number(localStorage.getItem("waterlilyLastEpisode")) || 1;
const episode = episodes.find(item => item.number === selectedEpisode);
if (!episode) return;
document.getElementById("episode-number").textContent =`СЕРИЯ ${String(episode.number).padStart(2, "0")}`;
document.getElementById("episode-title").textContent = episode.title;
document.getElementById("episode-summary").textContent = episode.summary;
document.getElementById("episode-full-description").textContent = episode.description;
document.getElementById("episode-full-description").style.display ="none";
document.getElementById("episode-details-button").textContent = "Читать полное описание";
}renderEpisodeDescription();
const episodeDetailsButton = document.getElementById("episode-details-button");
const episodeFullDescription = document.getElementById("episode-full-description");
if (episodeDetailsButton && episodeFullDescription) {episodeDetailsButton.addEventListener("click", () => {
const isHidden =getComputedStyle(episodeFullDescription).display === "none";
episodeFullDescription.style.display =isHidden ? "block" : "none";episodeDetailsButton.textContent = isHidden ? "Свернуть описание" : "Читать полное описание";});}
const episodeDetailsToggle = document.getElementById("episode-details-toggle");
const episodeDescription = document.getElementById("episode-description");
const episodeModalClose = document.getElementById("episode-modal-close");
function closeEpisodeModal() {
if (!episodeDescription) return;episodeDescription.classList.remove("open");
if (episodeDetailsToggle) {episodeDetailsToggle.querySelector("span").textContent = "⌄";}}
if (episodeDetailsToggle && episodeDescription) {
episodeDetailsToggle.addEventListener("click", () => {
episodeDescription.classList.add("open");
episodeDetailsToggle.querySelector("span").textContent = "⌃";});}
if (episodeModalClose) {episodeModalClose.addEventListener("click", closeEpisodeModal);}
if (episodeDescription) {
episodeDescription.addEventListener("click", event => {
if (event.target === episodeDescription) {closeEpisodeModal();}});}
document.addEventListener("keydown", event => {if (event.key === "Escape") {closeEpisodeModal();}});
// Восстановление последней выбранной серии
const savedEpisode =Number(localStorage.getItem("waterlilyLastEpisode"));
if (savedEpisode >= 1 && savedEpisode <= 20) {selectEpisode(savedEpisode);}

