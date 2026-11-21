const episodes = [
{number: 1, title: "Название первой серии", summary: "Краткое содержание первой серии.", description: "Полное описание событий первой серии."},
{number: 2, title: "Название второй серии", summary: "Краткое содержание второй серии.", description: "Полное описание событий второй серии."},
{number: 3, title: "Название третьей серии", summary: "Краткое содержание третьей серии.", description: "Полное описание событий третьей серии."},
{number: 4, title: "Название четвёртой серии", summary: "Краткое содержание четвёртой серии.", description: "Полное описание событий четвёртой серии."},
{number: 5, title: "Название пятой серии", summary: "Краткое содержание пятой серии.", description: "Полное описание событий пятой серии."},
{number: 6, title: "Название шестой серии", summary: "Краткое содержание шестой серии.", description: "Полное описание событий шестой серии."},
{number: 7, title: "Название седьмой серии", summary: "Краткое содержание седьмой серии.", description: "Полное описание событий седьмой серии."},
{number: 8, title: "Название восьмой серии", summary: "Краткое содержание восьмой серии.", description: "Полное описание событий восьмой серии."},
{number: 9, title: "Название девятой серии", summary: "Краткое содержание девятой серии.", description: "Полное описание событий девятой серии."},
{number: 10, title: "Название десятой серии", summary: "Краткое содержание десятой серии.", description: "Полное описание событий десятой серии."},
{number: 11, title: "Название одиннадцатой серии", summary: "Краткое содержание одиннадцатой серии.", description: "Полное описание событий одиннадцатой серии."},
{number: 12, title: "Название двенадцатой серии", summary: "Краткое содержание двенадцатой серии.", description: "Полное описание событий двенадцатой серии."},
{number: 13, title: "Название тринадцатой серии", summary: "Краткое содержание тринадцатой серии.", description: "Полное описание событий тринадцатой серии."},
{number: 14, title: "Название четырнадцатой серии", summary: "Краткое содержание четырнадцатой серии.", description: "Полное описание событий четырнадцатой серии."},
{number: 15, title: "Название пятнадцатой серии", summary: "Краткое содержание пятнадцатой серии.", description: "Полное описание событий пятнадцатой серии."},
{number: 16, title: "Название шестнадцатой серии", summary: "Краткое содержание шестнадцатой серии.", description: "Полное описание событий шестнадцатой серии."},
{number: 17, title: "Название семнадцатой серии", summary: "Краткое содержание семнадцатой серии.", description: "Полное описание событий семнадцатой серии."},
{number: 18, title: "Название восемнадцатой серии", summary: "Краткое содержание восемнадцатой серии.", description: "Полное описание событий восемнадцатой серии."},
{number: 19, title: "Название девятнадцатой серии", summary: "Краткое содержание девятнадцатой серии.", description: "Полное описание событий девятнадцатой серии."},
{number: 20, title: "Название двадцатой серии", summary: "Краткое содержание двадцатой серии.", description: "Полное описание событий двадцатой серии."}];
const grid = document.getElementById("peopleGrid");
function render(q = "") {const selectedEpisode = Number(localStorage.getItem("waterlilyLastEpisode")) || 1;grid.innerHTML = "";people.filter(person =>person.firstEpisode <= selectedEpisode &&(person.name + " " + person.role).toLowerCase().includes(q.toLowerCase())).forEach(person => {const el = document.createElement("article");el.className = "card";
const visibleFacts = person.facts.filter(fact => fact.episode <= selectedEpisode);el.innerHTML = `<span class="tag">${person.role}</span><h3>${person.name}</h3><p>Материалы досье: ${visibleFacts.length}</p><button type="button">Подробнее</button><div class="detail">${visibleFacts.map(fact => `<p>${fact.text}</p>`).join("")}</div>`;
el.querySelector("button").addEventListener("click", () => {
el.querySelector(".detail").classList.toggle("open");});
grid.appendChild(el);});}render();document.getElementById("search").addEventListener("input", e => {render(e.target.value);});
document.querySelectorAll(".main-nav button").forEach(btn => {btn.addEventListener("click", () => {document.querySelectorAll(".main-nav button").forEach(x => {x.classList.remove("active");});document.querySelectorAll(".panel").forEach(x => {x.classList.remove("active");});btn.classList.add("active");                                                                                                 
const page = document.getElementById(btn.dataset.tab);if (page) {page.classList.add("active");}});});
const episodeGate = document.getElementById("episode-gate");
function selectEpisode(episode) {episode = Number(episode);
if (episode < 1 || episode > 20) return;
localStorage.setItem("waterlilyLastEpisode", episode);
document.querySelectorAll("[data-view-episode]").forEach(button => {button.classList.toggle("active",Number(button.dataset.viewEpisode) === episode);});
if (episodeGate) {episodeGate.style.display = "none";}
closeEpisodeModal();
render(document.getElementById("search").value);renderEpisodeDescription();}
// Кнопки серий под меню 
document.querySelectorAll("[data-view-episode]").forEach(button => {button.addEventListener("click", () => {selectEpisode(button.dataset.viewEpisode);});});
// Кнопки начального окна
document.querySelectorAll(".episode-gate-grid button").forEach(button => {button.addEventListener("click", () => {selectEpisode(button.dataset.episode);});});
function renderEpisodeDescription() {
const selectedEpisode = Number(localStorage.getItem("waterlilyLastEpisode")) || 1;
const episode = episodes.find(item => item.number === selectedEpisode);
if (!episode) return;
document.getElementById("episode-number").textContent =
`СЕРИЯ ${String(episode.number).padStart(2, "0")}`;
document.getElementById("episode-title").textContent = episode.title;
document.getElementById("episode-summary").textContent = episode.summary;
document.getElementById("episode-full-description").textContent = episode.description;
document.getElementById("episode-full-description").style.display = "none";
document.getElementById("episode-details-button").textContent = "Читать полное описание";}
renderEpisodeDescription();
const episodeDetailsButton = document.getElementById("episode-details-button");
const episodeFullDescription = document.getElementById("episode-full-description");
if (episodeDetailsButton && episodeFullDescription) {
episodeDetailsButton.addEventListener("click", () => {
const isHidden = getComputedStyle(episodeFullDescription).display === "none";
episodeFullDescription.style.display = isHidden ? "block" : "none";
episodeDetailsButton.textContent = isHidden? "Свернуть описание": "Читать полное описание";});}
const episodeDetailsToggle = document.getElementById("episode-details-toggle");
const episodeDescription = document.getElementById("episode-description");
const episodeModalClose = document.getElementById("episode-modal-close");
function closeEpisodeModal() {if (!episodeDescription) return;
episodeDescription.classList.remove("open");
if (episodeDetailsToggle) {episodeDetailsToggle.querySelector("span").textContent = "⌄";}}
if (episodeDetailsToggle && episodeDescription) {episodeDetailsToggle.addEventListener("click", () => {episodeDescription.classList.add("open");
episodeDetailsToggle.querySelector("span").textContent = "⌃";});}
if (episodeModalClose) {episodeModalClose.addEventListener("click", closeEpisodeModal);}
if (episodeDescription) {episodeDescription.addEventListener("click", (event) => {if (event.target === episodeDescription) {closeEpisodeModal();}});}
document.addEventListener("keydown", (event) => {if (event.key === "Escape") {closeEpisodeModal();}});
// Восстановление последней выбранной серии
const savedEpisode = Number(localStorage.getItem("waterlilyLastEpisode"));
if (savedEpisode >= 1 && savedEpisode <= 20) {selectEpisode(savedEpisode);}
