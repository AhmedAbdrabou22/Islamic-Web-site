let btnButton = document.querySelector(".btn");
let ahadith = document.querySelector(".ahadith")
btnButton.addEventListener("click", () => {
    ahadith.scrollIntoView({
        behavior: "smooth"
    })
})

let fixedNav = document.querySelector(".header")
let scrollbtn = document.querySelector(".scrollbtn")
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        fixedNav.classList.add("sticky");
    } else {
        fixedNav.classList.remove("sticky");
    }
    if(window.scrollY > 500){
        scrollbtn.classList.add("active");
    }else{
        scrollbtn.classList.remove("active");
    }
})

// Api Ahadith 
let ahadithContent = document.getElementById("ahadithContent");
let content = document.getElementById("content");
let next = document.querySelector(".btns .next");
let prev = document.querySelector(".btns .prev");
let number = document.querySelector(".btns .number");
let index = 2962;

hadithChange();
function hadithChange() {
    fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${index}`)
        .then(response => response.json())
        .then(data => {
            content.innerText = data.hadeeth
            // var Hadith = data.data.hadiths;
            changeHadith()
            next.addEventListener("click", () => {
                // index == 3048 ? index = 0 : index++;
                if(index == 3048){
                    index = 2096;
                }else{
                    index++;
                }
                // changeHadith();
                fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${index}`)
                .then(response => response.json())
                .then(data =>{
                    content.innerText = data.hadeeth
                })
                number.innerText = `${index}-3048`
            })
            prev.addEventListener("click", () => {
                // index == 2096 ? index = 3048 : index--;
                if(index == 3048){
                    index = 2962;
                }else{
                    index--
                }
                fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${index}`)
                .then(response => response.json())
                .then(data =>{
                    content.innerText = data.hadeeth
                })
                number.innerText = `${index}-3048`
                // changeHadith();
                // hadithChange();
            })

            function changeHadith() {
                // content.innerText = data.hadeeth;
                number.innerText = `${index}-3048`
            }
        })
}

// $('.main').ripples();




let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");
links.forEach(link => {
    link.addEventListener("click", () => {
        let target = link.dataset.filter;
        sections.forEach(section => {
            if (section.classList.contains(target)) {
                section.scrollIntoView({
                    behavior: "smooth"
                })
            }
        })
    })
})

let main = document.querySelector(".main")
scrollbtn.addEventListener("click",()=>{
    main.scrollIntoView({
        behavior: "smooth"
    })
})


/*Apis Quran*/
let quranContent = document.querySelector(".quran .content");
getApiQuran()
function getApiQuran() {
    fetch("https://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data => {
            let Surahss = data.data.surahs.references;
            let numberOfAyat = 114;
            for (let i = 0; i < numberOfAyat; i++) {
                quranContent.innerHTML += `
            <div class="surah">
                    <p>${Surahss[i].name}</p>
                    <p>${Surahss[i].englishName}</p>
            </div>
            `
            }
            let surahsContainer = document.querySelectorAll(".surah");
            let ayat_pop = document.querySelector(".ayat-pop");
            let ayats = document.querySelector(".ayat");
            surahsContainer.forEach((tit, index) => {
                tit.addEventListener("click", () => {
                    ayat_pop.classList.add("active");
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            ayats.innerHTML = "";
                            let dataAyat = data.data.ayahs;
                            dataAyat.forEach((aya) => {
                                ayats.innerHTML += `
                            <p>(${aya.numberInSurah})-${aya.text}</p>
                        `
                            })
                        })
                })
            })
            let close = document.querySelector(".close");
            close.addEventListener("click", () => {
                ayat_pop.classList.remove("active")
                ayat_pop.classList.remove("active2")
            })
        })
}

//PrayTime Api

let cards = document.querySelector(".cards");
let Arr = ["الفجر","الشروق","الظهر","العصر","الغروب","المغرب","العشاء","الامساك","قيام الليل" , "Firstthird" , "Lastthird"]
getPrayTime();
function getPrayTime() {
    fetch("https://api.aladhan.com/v1/timingsByCity/15-04-2023?city=cairo&country=egypt&method=8")
        .then(respose => respose.json())
        .then(data => {
            cards.innerHTML="";
            let index = -1;
            let times = data.data.timings;
            for (let time in times) {
                index++;
                cards.innerHTML +=
                    `
                <div class="card">
                    <div class="circle">
                        <p>${times[time]}</p>
                    </div>
                    <p>${time}</p>
                </div>
            `
            }
        })
}

let bars = document.querySelector(".bars");
let scrollToggle = document.querySelector(".header ul");
bars.addEventListener("click",()=>{
    scrollToggle.classList.toggle("active2")
})


let cardsZekr = document.querySelector(".cardsZekr");

fetch(`https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`)
.then(response => response.json())
.then(data =>{
    console.log(data);
    let dataTasbeeh = data.تسابيح
    cardsZekr.innerHTML="";
    for(let tasabeh in dataTasbeeh){
        cardsZekr.innerHTML +=
        `
    <div class="cardZekr">
        <div class="circle">
            <p style="color:black"><span style="color:black">قول</span> ${dataTasbeeh[tasabeh].content} &nbsp; ${dataTasbeeh[tasabeh].count} مره: </p>
            <p>${dataTasbeeh[tasabeh].description}</p>
        </div>
    </div>
`
    }
})
