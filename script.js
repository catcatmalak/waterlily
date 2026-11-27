const people = window.peopleData || [];
const episodes = window.episodesData || [];
const clues = window.cluesData || [];
const story = window.storyData || [];
const theoriesData = window.theoriesData || {};
const grid = document.getElementById("peopleGrid");
const cluesGrid = document.getElementById("clues-container");
const storyGrid = document.getElementById("story-container");
const theoriesContainer = document.getElementById("theories-container");
function getSelectedEpisode() {
const savedEpisode = Number(localStorage.getItem("waterlilyLastEpisode"));
if (Number.isInteger(savedEpisode) &&savedEpisode >= 1 &&savedEpisode <= 23){
return savedEpisode;}
return 1;}
function createElement(tag, className, text) {
const element = document.createElement(tag);
if (className) element.className = className;
if (text !== undefined && text !== null) {element.textContent = text;}
return element;}
function appendList(parent, title, items) {if (!items || !items.length) return;
const heading = createElement("h4", "", title);parent.appendChild(heading);
const list = document.createElement("ul");items.forEach(item => {
const li = createElement("li", "", item);list.appendChild(li);});
parent.appendChild(list);}
function renderClues() {
if (!cluesGrid) return;
const selectedEpisode = getSelectedEpisode();
cluesGrid.innerHTML = "";clues
.filter(clue => clue.revealEpisode <= selectedEpisode)
.forEach(clue => {
const card = createElement("article", "card");
card.appendChild(createElement("span", "tag", clue.status));
card.appendChild(createElement("h3", "", clue.name));
card.appendChild(createElement("p", "", clue.type));
card.appendChild(createElement("p", "", clue.description));
if (clue.relatedPeople && clue.relatedPeople.length) {
card.appendChild(
createElement(
"p",
"",
"Связанные персонажи: " + clue.relatedPeople.join(", ")));}
cluesGrid.appendChild(card);});}
function renderStory() {
if (!storyGrid) return;
const selectedEpisode = getSelectedEpisode();storyGrid.innerHTML = "";
story
.filter(event => event.revealEpisode <= selectedEpisode)
.forEach(event => {
const card = createElement("article", "card");
card.appendChild(createElement("span", "tag", event.type));
card.appendChild(createElement("h3", "", event.title));
card.appendChild(createElement("p", "", event.description));
card.appendChild(
createElement("span", "tag", "Серия " + event.episode));
storyGrid.appendChild(card);});}
function renderTimeline() {
const container = document.getElementById("timeline-container");
if (!container) return;
const selectedEpisode = getSelectedEpisode();
const events = (window.timelineData || []).filter(event => Number(event.revealEpisode) <= selectedEpisode);container.innerHTML = "";
if (events.length === 0) {container.textContent = "Пока нет доступных событий.";
return;}events.forEach(event => {
const card = createElement("article", "card timeline-card");card.appendChild(createElement("span", "tag", event.category || "Событие"));
const dateText = [event.period,event.when,event.precision].filter(Boolean).join(" · ");
if (dateText) {card.appendChild(createElement("p", "timeline-date", dateText));}card.appendChild(createElement("h3", "", event.title));card.appendChild(createElement("p", "", event.description));
if (event.eventEpisode) {card.appendChild(createElement("span","tag","Событие: серия " + event.eventEpisode));}
if (event.status) {card.appendChild(createElement("span", "tag", event.status));}
if (event.people && event.people.length) {card.appendChild(createElement("p","timeline-people","Связанные персонажи: " + event.people.join(", ")));}
if (event.note) {card.appendChild(createElement("p", "timeline-note", event.note));}
container.appendChild(card);});}
function render(q = "") {
if (!grid) return;
const selectedEpisode = getSelectedEpisode();
grid.innerHTML = "";
people
.filter(person =>
person.firstEpisode <= selectedEpisode &&
(person.name + " " + person.role)
.toLowerCase()
.includes(q.toLowerCase()))
.forEach(person => {
const card = createElement("article", "card");
const visibleFacts = person.facts.filter(
fact => fact.episode <= selectedEpisode);
card.appendChild(createElement("span", "tag", person.role));
card.appendChild(createElement("h3", "", person.name));
card.appendChild(
createElement("p", "", "Материалы досье: " + visibleFacts.length));
const button = createElement("button", "", "Подробнее");
button.type = "button";
const details = createElement("div", "detail");
visibleFacts.forEach(fact => {
details.appendChild(createElement("p", "", fact.text));});
button.addEventListener("click", () => {
details.classList.toggle("open");});
card.append(button, details);
grid.appendChild(card);});}
// Теории и открытые вопросы
function renderTheories() {
if (!theoriesContainer) return;
const selectedEpisode = getSelectedEpisode();
theoriesContainer.innerHTML = "";
function addSection(title) {
const section = document.createElement("div");
section.className = "theory-section";
section.appendChild(createElement("h3", "", title));
theoriesContainer.appendChild(section);
return section;}
function addCard(parent, item, category) {const card = createElement("article", "card");
if (category) {card.appendChild(createElement("span", "tag", category));}
if (item.status) {card.appendChild(createElement("span", "tag", item.status));}card.appendChild(createElement("h3", "", item.title));
if (item.formulation) {card.appendChild(createElement("p", "", item.formulation));}
if (item.description) {card.appendChild(createElement("p", "", item.description));}
if (item.arguments) {appendList(card, "Аргументы", item.arguments);}
if (item.counterarguments) {appendList(card, "Контраргументы", item.counterarguments);}
if (item.facts) {appendList(card, "Что известно", item.facts);}
if (item.unknowns) {appendList(card, "Что ещё предстоит выяснить", item.unknowns);}
if (item.notes) {card.appendChild(createElement("p", "", item.notes));}
if (item.keyEpisodes && item.keyEpisodes.length) {const visibleEpisodes = item.keyEpisodes.filter(episode => episode <= selectedEpisode);
if (visibleEpisodes.length) {card.appendChild(
createElement(
"span",
"tag",
"Связанные серии: " + visibleEpisodes.join(", ")));}}
if (item.revealEpisode) {card.appendChild(
createElement(
"span",
"tag",
"Доступно с серии " + item.revealEpisode));}
parent.appendChild(card);}
// Теории
const theories = (theoriesData.theories || []).filter(item => item.revealEpisode <= selectedEpisode);
if (theories.length) {const section = addSection("Теории и версии");theories.forEach(item => {addCard(section, item, item.category);});}
// Открытые вопросы
const questions = (theoriesData.questions || []).filter(item => item.revealEpisode <= selectedEpisode);
if (questions.length) {
const section = addSection("Открытые вопросы");questions.forEach(item => {
const card = createElement("article", "card");
card.appendChild(createElement("span", "tag", item.category));
card.appendChild(createElement("h3", "", item.title));appendList(card, "Что известно", item.facts);appendList(card, "Что неизвестно", item.unknowns);
if (item.relatedTheories && item.relatedTheories.length) {const relatedNames = item.relatedTheories.map(id => (theoriesData.theories || []).find(theory => theory.id === id)).filter(theory => theory && theory.revealEpisode <= selectedEpisode).map(theory => theory.title);appendList(card, "Связанные теории", relatedNames);}
if (item.notes) {card.appendChild(createElement("p", "", item.notes));}
if (item.keyEpisodes) {const visibleEpisodes = item.keyEpisodes.filter(episode => episode <= selectedEpisode);
if (visibleEpisodes.length) {
card.appendChild(
createElement(
"span",
"tag",
"Связанные серии: " + visibleEpisodes.join(", ")));}}
section.appendChild(card);});}
// Темы для обсуждения
const topics = (theoriesData.discussionTopics || []).filter(item => item.revealEpisode <= selectedEpisode);
if (topics.length) {const section = addSection("Темы для обсуждения");topics.forEach(item => addCard(section, item));}
// Опросы
const polls = (theoriesData.polls || []).filter(item => item.revealEpisode <= selectedEpisode);
if (polls.length) {const section = addSection("Опросы");
polls.forEach(item => {
const card = createElement("article", "card");card.appendChild(createElement("h3", "", item.title));appendList(card, "Варианты ответа", item.options);section.appendChild(card);});}
// Вопросы читателям
const readerQuestions = theoriesData.readerQuestions || [];
if (readerQuestions.length) {const section = addSection("Вопросы читателям");appendList(section, "", readerQuestions);}
// Материалы расследования
const materials = (theoriesData.sourceMaterials || []).filter(item => item.revealEpisode <= selectedEpisode);
if (materials.length) {const section = addSection("Материалы расследования");materials.forEach(item => addCard(section, item));}
// Уровни спойлеров
const spoilerLevels = theoriesData.spoilerLevels || [];
if (spoilerLevels.length) {const section = addSection("Уровни спойлеров");
spoilerLevels.forEach(item => {
const card = createElement("article", "card");
card.appendChild(createElement("h3", "", item.title));
card.appendChild(createElement("p", "", item.description));
card.appendChild(
createElement("span", "tag", "До серии " + item.throughEpisode));section.appendChild(card);});}
// Правила публикации
const rules = theoriesData.publicationRules || [];
if (rules.length) {const section = addSection("Правила публикации");appendList(section, "Правила", rules);}
// Принципы интерпретации
const notes = theoriesData.interpretationNotes || [];
if (notes.length) {const section = addSection("Как читать материалы расследования");appendList(section, "Важные замечания", notes);}
if (!theoriesContainer.children.length) {theoriesContainer.textContent = "Пока нет доступных материалов.";}}
// Архив документов
function renderDocuments() {
const container = document.getElementById("documents-container");
const selectedEpisode = getSelectedEpisode();
const documents = (window.documentsData || []).filter(item => {
const match = String(item.episode || "").match(/1x(\d+)/);
const revealEpisode = Number(item.revealEpisode ?? (match ? match[1] : NaN));
return Number.isFinite(revealEpisode) &&revealEpisode <= selectedEpisode;});
const selectedEpisode = getSelectedEpisode();
const documents = (window.documentsData || []).filter(item => {
const match = String(item.episode || "").match(/1x(\d+)/);
const revealEpisode = Number(item.revealEpisode ?? (match ? match[1] : NaN));
return Number.isFinite(revealEpisode) &&revealEpisode <= selectedEpisode;});
if (!container) return;container.innerHTML = "";
documents.forEach(item => {
const card = createElement("article", "card");
card.appendChild(createElement("span", "tag", item.category));
card.appendChild(createElement("h3", "", item.title));
if (item.episode) {card.appendChild(createElement("span", "tag", item.episode));}
if (item.discoverer) {card.appendChild(createElement("p", "", "Обнаружил: " + item.discoverer));}
if (item.status) {card.appendChild(createElement("p", "", "Статус: " + item.status));}
if (item.description) {card.appendChild(createElement("p", "", item.description));}
if (Array.isArray(item.details)) {appendList(card, "Подробности", item.details);} else if (item.details) {card.appendChild(createElement("p", "", item.details));}
if (item.note) {card.appendChild(createElement("p", "", item.note));}
container.appendChild(card);});
if (!documents.length) {container.textContent = "В архиве пока нет документов.";}}
// Первоначальная отрисовка
render();
renderClues();
renderTimeline();
renderStory();
renderTheories();
renderDocuments();
// Поиск персонажей
const searchInput = document.getElementById("search");
if (searchInput) {searchInput.addEventListener("input", event => {render(event.target.value);});}
// Переключение вкладок
document.querySelectorAll(".main-nav button").forEach(button => {
button.addEventListener("click", () => {
document.querySelectorAll(".main-nav button").forEach(item => {
item.classList.remove("active");});
document.querySelectorAll(".panel").forEach(panel => {
panel.classList.remove("active");});
button.classList.add("active");
const page = document.getElementById(button.dataset.tab);
if (page) {page.classList.add("active");}});});
// Переходы с главной страницы
document.querySelectorAll(".home-card").forEach(button => {button.addEventListener("click", () => {document.querySelectorAll(".main-nav button").forEach(item => {item.classList.remove("active");});
document.querySelectorAll(".panel").forEach(panel => {panel.classList.remove("active");});
const page = document.getElementById(button.dataset.tab);
if (page) {page.classList.add("active");}
const navButton = document.querySelector('.main-nav button[data-tab="' + button.dataset.tab + '"]');
if (navButton) {navButton.classList.add("active");}});});
// Выбор серии
const episodeGate = document.getElementById("episode-gate");
function selectEpisode(episode) {episode = Number(episode);
if (episode < 1 || episode > 23) return;
localStorage.setItem("waterlilyLastEpisode", episode);
document.querySelectorAll("[data-view-episode]").forEach(button => {
button.classList.toggle("active",Number(button.dataset.viewEpisode) === episode);});
const gate = document.getElementById("episode-gate");
if (gate) {gate.classList.add("is-hidden");}
closeEpisodeModal();
render(document.getElementById("search")?.value || "");
renderClues();
renderStory();
renderTimeline();
renderTheories();
renderEpisodeDescription();
renderDocuments();}
// Кнопки серий под меню
document.querySelectorAll("[data-view-episode]").forEach(button => {
button.addEventListener("click", () => {
selectEpisode(button.dataset.viewEpisode);});});
// Кнопки начального окна
document.querySelectorAll(".episode-gate-grid button").forEach(button => {
button.addEventListener("click", () => {selectEpisode(button.dataset.episode);});});
// Описание серии
function renderEpisodeDescription() {
const selectedEpisode = getSelectedEpisode();
const episode = episodes.find(item => item.number === selectedEpisode);
if (!episode) return;
const number = document.getElementById("episode-number");
const title = document.getElementById("episode-title");
const summary = document.getElementById("episode-summary");
const description = document.getElementById("episode-full-description");
const detailsButton = document.getElementById("episode-details-button");
if (number) {number.textContent ="СЕРИЯ " + String(episode.number).padStart(2, "0");}
if (title) title.textContent = episode.title;
if (summary) summary.textContent = episode.summary;
if (description) {description.textContent = episode.description;description.style.display = "none";}
if (detailsButton) {detailsButton.textContent = "Читать полное описание";}}
renderEpisodeDescription();
// Кнопка полного описания серии
const episodeDetailsButton = document.getElementById("episode-details-button");
const episodeFullDescription = document.getElementById("episode-full-description");
if (episodeDetailsButton && episodeFullDescription) {episodeDetailsButton.addEventListener("click", () => {
const isHidden = getComputedStyle(episodeFullDescription).display === "none";episodeFullDescription.style.display = isHidden ? "block" : "none";episodeDetailsButton.textContent = isHidden
? "Свернуть описание"
: "Читать полное описание";});}
// Модальное окно описания серии
const episodeDetailsToggle = document.getElementById("episode-details-toggle");
const episodeDescription = document.getElementById("episode-description");
const episodeModalClose = document.getElementById("episode-modal-close");
function closeEpisodeModal() {
if (!episodeDescription) return;episodeDescription.classList.remove("open");
if (episodeDetailsToggle) {
const span = episodeDetailsToggle.querySelector("span");
if (span) span.textContent = "⌄";}}
if (episodeDetailsToggle && episodeDescription) {episodeDetailsToggle.addEventListener("click", () => {episodeDescription.classList.add("open");
const span = episodeDetailsToggle.querySelector("span");
if (span) span.textContent = "⌃";});}
if (episodeModalClose) {episodeModalClose.addEventListener("click", closeEpisodeModal);}
if (episodeDescription) {episodeDescription.addEventListener("click", event => {
if (event.target === episodeDescription) {closeEpisodeModal();}});}document.addEventListener("keydown", event => {
if (event.key === "Escape") {closeEpisodeModal();}});
// Восстановление последней выбранной серии
const savedEpisode = Number(localStorage.getItem("waterlilyLastEpisode"));
if (savedEpisode >= 1 && savedEpisode <= 23) {selectEpisode(savedEpisode);}





