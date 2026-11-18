const people = [
{name: "Райли Пирс",
role: "Главная героиня",
firstEpisode: 1,
facts: [{episode: 1,text: "Возвращается в Уиндроуз-Бей на свадьбу Амелии Фэйрчайлд. Была близка с Лили."},{episode: 1,text: "В подростковом возрасте писала стихи и играла на арфе."},{episode: 1,text: "После смерти Лили некоторое время провела в психиатрической клинике."}]},
{name: "Лили Фэйрчайлд",
role: "Покойная подруга Райли",
firstEpisode: 1,
facts: [{episode: 1,text: "Старшая сестра Амелии и близкая подруга Райли. Её смерть — центральное обстоятельство расследования."},{episode: 1,text: "Рисовала картины и должна была отправиться в школу-интернат в конце лета."}]},
{name: "Амелия Фэйрчайлд",
role: "Младшая сестра Лили",
firstEpisode: 1,
facts: [{episode: 1,text: "Младшая сестра Лили, невеста Оливера Эшфорда-Кинга."},{episode: 18,text: "Признаётся, что заказывала картины."}]},
{name: "Ксавье Кинг",
role: "Фельдшер скорой помощи",
firstEpisode: 1,
facts: [{episode: 1,text: "Знакомится с Райли после аварии."},{episode: 5,text: "Раскрывается история его травмы и видения Лили."}]},
{name: "Луна Митчелл",
role: "Подруга Райли, бас-гитаристка",
firstEpisode: 1,
facts: [{episode: 1,text: "Знает укромные места Уиндроуз-Бей и связана с музыкальной сценой города."},{episode: 2,text: "Знакомит Райли с музыкальным магазином и подпольным баром."},{episode: 6,text: "Возможная романтическая связь с Лили зависит от выбора игрока."}]},
{name: "Деклан Романо",
role: "Студент Гарварда",
firstEpisode: 1,
facts: [{episode: 1,text: "Друг семьи Фэйрчайлд. Амелия просит его присматривать за Райли."},
{episode: 6,text: "Раскрывается, почему Деклан особенно опекает Райли."},{episode: 13,text: "Райли замечает его с блокнотом Лили."}]},
{name: "Тиффани Романо",
role: "Сестра-близнец Деклана",
firstEpisode: 1,
facts: [{episode: 1,text: "Инфлюенсер, училась в Императорской академии. Конфликтует с Райли."},{episode: 8,text: "Раскрываются подробности давления со стороны матери."},{episode: 16,text: "Покупает портрет Райли на аукционе."}]},
{name: "Фабиан Рейес",
 role: "Механик и участник мотогонок",
 firstEpisode: 2,
 facts: [{episode: 2,text: "Знакомится с Райли после того, как едва не сбивает её на дороге."},{episode: 6,text: "В зависимости от выбора раскрывается его тайная связь с Лили."},{episode: 9,text: "Раскрываются подробности его прошлого и отношений с родителями."}]},
{name: "Джулиан Сандерс",
role: "Сын сенатора Сандерса",
firstEpisode: 4,
facts: [{episode: 4,text: "Знакомится с Райли. Намекает на планы Вивьен относительно него и сестёр Фэйрчайлд."}]},
{name: "Оливер Эшфорд-Кинг",
role: "Жених Амелии",
firstEpisode: 1,
facts: [{episode: 1,text: "Британец, жених Амелии Фэйрчайлд."},{episode: 13,text: "Оказывается у урны и пытается её подменить."}]},
{name: "Вивьен Фэйрчайлд",
role: "Мать Лили и Амелии",
firstEpisode: 1,
facts: [{episode: 1,text: "Заботится об имидже семьи, строго относится к Лили и тепло принимает Райли."},{episode: 7,text: "Просит Райли выступить на арфе и надевает на неё платье Лили."},{episode: 12,text: "Раскрывается, что Вивьен уходит из дома по ночам."}]},
{name: "Нао",
role: "Знакомый Луны",
firstEpisode: 2,
facts: [{episode: 2,text: "Знаком с Луной и передаёт ей свой номер телефона."}]},
{name: "Слейтер",
role: "Участник подпольных гонок",
firstEpisode: 5,
facts: [{episode: 5,text: "Вызывает Фабиана на гонку в «Костяном дворе»."},{episode: 10,text: "Его имя возникает в связи с расследованием и подозрительными обстоятельствами."},{episode: 17,text: "Фабиан участвует в гонке со Слейтером, поставив на кон ожерелье."}]},
{name: "Джо Хоторн",
role: "Шериф Уиндроуз-Бей",
firstEpisode: 1,
facts: [{episode: 1,text: "Спасает Райли после автомобильной аварии."}]},
{name: "Эмма Пак",
 role: "Знакомая Райли",
 firstEpisode: 2,
facts: [{episode: 2,text: "Помогает Райли выбраться из бассейна."}]},
{name: "Симона",
role: "Музыкантка",
firstEpisode: 9,
facts: [{episode: 9,text: "Выступает вместе с Луной."}]}];
const episodes = [
{number: 1,
title: "Название первой серии",
summary: "Краткое содержание первой серии.",
description: "Полное описание событий первой серии."},
{number: 2,
title: "Название второй серии",
summary: "Краткое содержание второй серии.",
description: "Полное описание событий второй серии."}];
const grid = document.getElementById("peopleGrid");
function render(q = "") {const selectedEpisode = Number(localStorage.getItem("waterlilyLastEpisode")) || 1;grid.innerHTML = "";people.filter(person =>person.firstEpisode <= selectedEpisode &&(person.name + " " + person.role).toLowerCase().includes(q.toLowerCase())).forEach(person => {const el = document.createElement("article");el.className = "card";
const visibleFacts = person.facts.filter(fact => fact.episode <= selectedEpisode);el.innerHTML = `<span class="tag">${person.role}</span><h3>${person.name}</h3><p>Материалы досье: ${visibleFacts.length}</p><button type="button">Подробнее</button><div class="detail">${visibleFacts.map(fact => `<p>${fact.text}</p>`).join("")}</div>`;
el.querySelector("button").addEventListener("click", () => {
el.querySelector(".detail").classList.toggle("open");});
grid.appendChild(el);});}render();document.getElementById("search").addEventListener("input", e => {render(e.target.value);});
document.querySelectorAll(".main-nav button").forEach(btn => {btn.addEventListener("click", () => {document.querySelectorAll(".main-nav button").forEach(x => {x.classList.remove("active");});document.querySelectorAll(".panel").forEach(x => {x.classList.remove("active");});btn.classList.add("active");                                                                                                 
const page = document.getElementById(btn.dataset.tab);if (page) {page.classList.add("active");}});});
const episodeGate = document.getElementById("episode-gate");
function selectEpisode(episode) {episode = Number(episode);if (episode < 1 || episode > 20) return;localStorage.setItem("waterlilyLastEpisode", episode);document.querySelectorAll("[data-view-episode]").forEach(button => {button.classList.toggle("active",Number(button.dataset.viewEpisode) === episode);});if (episodeGate){episodeGate.style.display = "none";}
render(document.getElementById("search").value);renderEpisodeDescription();}
// Кнопки серий под меню 
document.querySelectorAll("[data-view-episode]").forEach(button => {button.addEventListener("click", () => {selectEpisode(button.dataset.viewEpisode);});});
// Кнопки начального окна
document.querySelectorAll(".episode-gate-grid button").forEach(button => {button.addEventListener("click", () => {selectEpisode(button.dataset.episode);});});
// Восстановление последней выбранной серии
const savedEpisode = Number(localStorage.getItem("waterlilyLastEpisode"));if (savedEpisode >= 1 && savedEpisode <= 20) {selectEpisode(savedEpisode);}
function renderEpisodeDescription() {
const selectedEpisode = Number(localStorage.getItem("waterlilyLastEpisode")) || 1;
const episode = episodes.find(item => item.number === selectedEpisode);
if (!episode) return;
document.getElementById("episode-number").textContent =
`СЕРИЯ ${String(episode.number).padStart(2, "0")}`;
document.getElementById("episode-title").textContent = episode.title;
document.getElementById("episode-summary").textContent = episode.summary;
document.getElementById("episode-full-description").textContent =
episode.description;}renderEpisodeDescription();
