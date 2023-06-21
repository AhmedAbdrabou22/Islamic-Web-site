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
    if (window.scrollY > 500) {
        scrollbtn.classList.add("active");
    } else {
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
                if (index == 3048) {
                    index = 2096;
                } else {
                    index++;
                }
                // changeHadith();
                fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${index}`)
                    .then(response => response.json())
                    .then(data => {
                        content.innerText = data.hadeeth
                    })
                number.innerText = `${index}-3048`
            })
            prev.addEventListener("click", () => {
                // index == 2096 ? index = 3048 : index--;
                if (index == 3048) {
                    index = 2962;
                } else {
                    index--
                }
                fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${index}`)
                    .then(response => response.json())
                    .then(data => {
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
scrollbtn.addEventListener("click", () => {
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
let Arr = ["الفجر", "الشروق", "الظهر", "العصر", "الغروب", "المغرب", "العشاء", "الامساك", "قيام الليل", "Firstthird", "Lastthird"]
getPrayTime();
function getPrayTime() {
    fetch("https://api.aladhan.com/v1/timingsByCity/15-04-2023?city=cairo&country=egypt&method=8")
        .then(respose => respose.json())
        .then(data => {
            cards.innerHTML = "";
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
bars.addEventListener("click", () => {
    scrollToggle.classList.toggle("active2")
})


let cardsZekr = document.querySelector(".cardsZekr");

fetch(`https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`)
    .then(response => response.json())
    .then(data => {
        let dataTasbeeh = data.تسابيح
        cardsZekr.innerHTML = "";
        for (let tasabeh in dataTasbeeh) {
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




//Api تفسير القران
let quranContentTafseer = document.querySelector(".quranTafseer .contentquran");
getApiQuran2()
function getApiQuran2() {
    fetch("https://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data => {
            let Surahss = data.data.surahs.references;
            let numberOfAyat = 114;
            for (let i = 0; i < numberOfAyat; i++) {
                quranContentTafseer.innerHTML += `
            <div class="surah2">
                    <p>${Surahss[i].name}</p>
                    <p>${Surahss[i].englishName}</p>
            </div>
            `
            }
            let surahsContainer2 = document.querySelectorAll(".surah2");
            let ayat_pop2 = document.querySelector(".ayat-pop2");
            let ayats2 = document.querySelector(".ayat2");
            surahsContainer2.forEach((tit, index) => {
                tit.addEventListener("click", () => {
                    ayat_pop2.classList.add("c");
                    fetch(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${index+1}`)
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data.result[0].translation);
                            ayats2.innerHTML = "";
                            let dataAyat = data.result.length;
                            let dataAyat2 = data.result;
                            console.log(dataAyat);
                            console.log(dataAyat2);
                            if(true){
                                for(let i = 0 ; i < dataAyat2.length ; i++){
                                    ayats2.innerHTML += `
                                    <h1> الايه  :  (${dataAyat2[i].aya}) ( ${dataAyat2[i].arabic_text}</h1>
                                    <p> تفسيرها :  (${dataAyat2[i].translation}</p>
                                `
                                }
                            }
                        })
                })
            })
            let close2 = document.querySelector(".a");
            console.log(close2);
            close2.addEventListener("click", () => {
                ayat_pop2.classList.remove("c")
                ayat_pop2.classList.remove("c2")
            })
        })
}




/*


const application = (index) => {
    switch (State[index]) {
        case 'Initial':
            clearDisplay()
            clearControls()

            addButton('record', 'record()', 'Start Recording')
            break;

        case 'Record':
            clearDisplay()
            clearControls()

            addMessage('Recording...')
            addButton('stop', 'stopRecording()', 'Stop Recording')
            break

        case 'Download':
            clearControls()
            clearDisplay()

            addAudio()
            addButton('record', 'record()', 'Record Again')
            break

        default:
            clearControls()
            clearDisplay()

            addMessage('Your browser does not support mediaDevices')
            break;
    }

}

const display = document.querySelector('.display')
const controllerWrapper = document.querySelector('.controllers')

const State = ['Initial', 'Record', 'Download']
let stateIndex = 0
let mediaRecorder, chunks = [], audioURL = ''

// mediaRecorder setup for audio
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices supported..')

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {'type': 'audio/wav; codecs=opus'})
            chunks = []
            audioURL = window.URL.createObjectURL(blob)
            document.querySelector('audio').src = audioURL

        }
    }).catch(error => {
        console.log('Following error has occured : ',error)
    })
}else{
    stateIndex = ''
    application(stateIndex)
}

const clearDisplay = () => {
    display.textContent = ''
}

const clearControls = () => {
    controllerWrapper.textContent = ''
}

const record = () => {
    stateIndex = 1
    mediaRecorder.start()
    application(stateIndex)
}

const stopRecording = () => {
    stateIndex = 2
    mediaRecorder.stop()
    application(stateIndex)
}

const downloadAudio = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = audioURL
    downloadLink.setAttribute('download', 'audio')
    downloadLink.click()
}

const addButton = (id, funString, text) => {
    const btn = document.createElement('button')
    btn.id = id
    btn.setAttribute('onclick', funString)
    btn.textContent = text
    controllerWrapper.append(btn)
}

const addMessage = (text) => {
    const msg = document.createElement('p')
    msg.textContent = text
    display.append(msg)
}

const addAudio = () => {
    const audio = document.createElement('audio')
    audio.controls = true
    audio.src = audioURL
    display.append(audio)
}



application(stateIndex)

*/






let chunks = [];

{/* // تحديد الإعدادات الخاصة بالتسجيل الصوتي */ }
const constraints = { audio: true };
const audio = document.querySelector('#audio');
const downloadLink = document.querySelector('#downloadLink');
let recorder;

function startRecording() {
    chunks = [];

    // بدء التسجيل الصوتي
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function (e) {
                chunks.push(e.data);
            };
            recorder.start();
        })
        .catch(function (err) {
            console.log('Error: ' + err);
        });
}

function stopRecording() {
    // إيقاف التسجيل الصوتي وتحويل البيانات إلى Blob
    recorder.onstop = function () {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        audio.src = URL.createObjectURL(blob);

        // تعيين اسم الملف وتحديث رابط التحميل
        // const datetime = new Date().toISOString().replace(/[-:.]/g, "");
        const datetime = "aboud"
        const filename = `audio-${datetime}.wav`;
        downloadLink.download = filename;
        downloadLink.href = URL.createObjectURL(blob);
        document.querySelector('#datetime').textContent = datetime;
    };

    recorder.stop();
}


// ستنشئ هذه الوظيفة عنصرًا `audio` يستخدم لتشغيل التسجيل الصوتي، وزرين لبدء وإيقاف التسجيل، وعنصر `a` لتحميل الملف الصوتي. يتم تحديث اسم الملف ورابط التحميل باستخدام التاريخ والوقت الحاليين، ويتم تحديث رابط التحميل بعد إيقاف التسجيل الصوتي وتحويل البيانات إلى `Blob`.