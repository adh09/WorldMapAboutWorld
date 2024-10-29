
function getInfo(nat) {
    var request = new XMLHttpRequest();
    request.open('GET', '/data/'+nat);
    request.send();
    request.onload = function() {
        let data = JSON.parse(request.response);
        document.getElementById('country_name').innerHTML = data[0].population;
    }
}
/*웹타이틀 클릭시 새로고침*/
function Refresh() {
    location.reload(true);
}

let popup = document.querySelector("#popup");
let buttons = document.querySelectorAll(".button");
let menubar = document.querySelectorAll(".menubar");
let countrys = document.querySelectorAll(".country_text");
let populations = document.querySelectorAll(".population_text");
let territorys = document.querySelectorAll(".territory_text");
let rankings = document.querySelectorAll(".ranking_popup");

let cat = 0;
let ord = 0;

//검색

function Get_Data()  {
    const name = document.getElementById('search').value;
    // name을 index.js로 보내기
    fetch("/search/?val="+name)
    .then((response) => response.json())
    .then((data) => {
        rct = document.querySelector('#result');
        rct.innerHTML = `\
                <table id = "search_list">\
                        <tr class = "search_table">\
                            <th scope="col">name</th>\
                            <th scope="col">population</th>\
                            <th scope="col">territory</th>\
                        </tr>\
                        <tr class = "search_table">\
                            <th>${data.name}</th>\
                            <th>${data.population}</th>\
                            <th>${data.territory} km2</th>
                        </tr>\
                </table>\
            `;
    });
  }


//랜덤

function getRandom(min, max)
{
    fetch("/getRandom")
    .then((response) => response.json())
    .then((data) => {
        rct = document.querySelector('#randomCountry');
        rct.innerHTML = `\
                <h3 id= "random_name">Nation: ${data.name}</h3>\
                <h3 id= "random_popu">Population: ${data.population}</h3>\
                <h3 id= "random_terr">Territory: ${data.territory} km2</h3>\
            `;
    });

}

//팝업

function Change_popup(idx) {
    let info = JSON.parse(idx);
    console.log(idx);
    document.querySelector("#country_name").textContent = info.name;
    document.querySelector("#population").textContent = "Population: " + info.population;
    document.querySelector("#territory").textContent = "Territory: " + info.territory + " km2 ";
    Openpopup();
}
function Hidepopup() {
    popup.classList.remove("open-popup");
}
function Openpopup() {
    popup.classList.add("open-popup");
}


function Hide_ranking() {
    rankings.forEach(hide_rank => hide_rank.classList.remove("show-ranking"));
}
function func_ranking() {
    console.log(ord, cat);
    document.getElementById("ranking_explain").innerText= (((cat == 1) ? "population  " : "territory  ") + ((ord == 1) ? "A to Z" : "Z to A"));
    fetch(`/population?order=${ord}&category=${cat}`)
    .then((population) => population.json())
    .then((popul) => {
        console.log(popul);
        cont = document.querySelector("#ranking_info");
        cont.innerHTML = "";
        let idx = 1;
        popul.forEach( nat => {
            cont.innerHTML += `${idx++}. ${nat.name}</br>`;
        });
        rankings.forEach(show_rank => show_rank.classList.add("show-ranking"));
    });
}

//메뉴바

function show_menu() {
    menubar.forEach( menu => menu.classList.add("open-menubar"));
}
function hide_menu() {
    menubar.forEach( menu => menu.classList.remove("open-menubar"));
}

//메뉴바 기능

function reset() {
    buttons.forEach(button => button.classList.remove("hide-button"));
    countrys.forEach(text => text.classList.remove("show-country"));
    populations.forEach(text => text.classList.remove("show-population"));
    territorys.forEach(text => text.classList.remove("show-territory"));
}
function func_countryname() {
    buttons.forEach(button => button.classList.add("hide-button"));
    countrys.forEach(text => text.classList.add("show-country"));
    populations.forEach(text => text.classList.remove("show-population"));
    territorys.forEach(text => text.classList.remove("show-territory"));
}
function func_population() {
    buttons.forEach(button => button.classList.add("hide-button"));
    populations.forEach(text => text.classList.add("show-population"));
    countrys.forEach(text => text.classList.remove("show-country"));
    territorys.forEach(text => text.classList.remove("show-territory"));
}
function func_territory() {
    buttons.forEach(button => button.classList.add("hide-button"));
    territorys.forEach(text => text.classList.add("show-territory"));

    countrys.forEach(text => text.classList.remove("show-country"));
    populations.forEach(text => text.classList.remove("show-population"));
}

//화이트, 다크 모드

let day_night = document.querySelector(':root');

let imgs = document.querySelector('WorldMap');

function day() {
    day_night.classList.remove("day-night-mode");
}
function night() {
    day_night.classList.add("day-night-mode");
}