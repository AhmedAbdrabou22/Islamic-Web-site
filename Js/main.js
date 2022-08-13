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
let index = 0;

hadithChange();
function hadithChange() {
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
        .then(response => response.json())
        .then(data => {
            var Hadith = data.data.hadiths;
            changeHadith()
            next.addEventListener("click", () => {
                // index == 299 ? index = 0 : index++;
                if(index == 299){
                    index = 0;
                }else{
                    index++;
                }
                changeHadith();
            })
            prev.addEventListener("click", () => {
                index == 0 ? index = 299 : index--;
                changeHadith();
            })

            function changeHadith() {
                content.innerText = Hadith[index].arab;
                number.innerText = `${index + 1}-300`
            }
        })
}

$('.main').ripples();




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
let Arr = ["الفجر","الشروق","الظهر","العصر","الغروب","المغرب","العشاء","الامساك","قيام الليل"]
getPrayTime();
function getPrayTime() {
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
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
                    <p>${Arr[index]}</p>
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

