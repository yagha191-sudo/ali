// تشغيل الاتصال الحي بفايربيس فور فتح الموقع
const firebaseConfig = {
    apiKey: "AIzaSyBrGTJnMD7fDH4G4-w6cCc-864Z31g1TT8",
    authDomain: "athkar-app-ddba2.firebaseapp.com",
    databaseURL: "https://firebaseio.com",
    projectId: "athkar-app-ddba2",
    storageBucket: "athkar-app-ddba2.firebasestorage.app",
    messagingSenderId: "996299888457",
    appId: "1:996299888457:web:ea2ba329abd9db4709ac98"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let thikrChain = [
    { name: "سُبْحَانَ اللهِ 📿", cleanName: "سُبْحَانَ اللهِ", limit: 33 },
    { name: "الحَمْدُ للهِ 🤲", cleanName: "الحَمْدُ للهِ", limit: 33 }
];

function loadLiveSettings() {
    database.ref('settings').on('value', (snapshot) => {
        const data = snapshot.val();
        if(data) {
            if(data.themeColor) {
                document.querySelector("header").style.backgroundColor = data.themeColor;
                document.querySelectorAll(".btn").forEach(b => b.style.backgroundColor = data.themeColor);
            }
            if(data.bgImage) {
                document.body.style.backgroundImage = `url('${data.bgImage}')`;
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
            }
        }
    });

    database.ref('thikr').on('value', (snapshot) => {
        const data = snapshot.val();
        if(data) {
            thikrChain = Object.values(data);
            updateThikrDisplay();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadLiveSettings();
});


let chainIndex = 0; 
let counterValue = 0; 

function openSebhaModal() {
    document.getElementById("sebhaModal").style.display = "flex";
    document.getElementById("mainContentWrapper").classList.add("blur-active");
    updateThikrDisplay();
}

function closeSebhaModal() {
    document.getElementById("sebhaModal").style.display = "none";
    document.getElementById("mainContentWrapper").classList.remove("blur-active");
}

function updateThikrDisplay() {
    const titleElement = document.getElementById("thikrTitle");
    const instructionElement = document.getElementById("thikrInstruction");
    const countElement = document.getElementById("sebhaCount");

    if (chainIndex < thikrChain.length) {
        const currentData = thikrChain[chainIndex];
        if (titleElement) titleElement.innerText = currentData.name;
        
        if (instructionElement) {
            if (currentData.limit > 1) {
                instructionElement.innerText = `قُل ${currentData.cleanName} ${currentData.limit} مرّة`;
            } else {
                instructionElement.innerText = `قُلْهَا مَرَّةً وَاحِدَةً جَزَاكَ اللَّهُ خَيْرًا`;
            }
        }
        
        if (countElement) countElement.innerText = counterValue;
    } else {
        if (titleElement) titleElement.innerText = "🎉 تم إنهاء السلسلة";
        if (instructionElement) instructionElement.innerText = "تقبل الله صالح أعمالكم";
        if (countElement) countElement.innerText = "✓";
    }
}

function handleSebhaClick() {
    if (chainIndex >= thikrChain.length) {
        resetChain();
        return;
    }

    const currentThikr = thikrChain[chainIndex];
    counterValue++; 
    
    if (counterValue >= currentThikr.limit) {
        chainIndex++; 
        counterValue = 0; 
    }
    
    updateThikrDisplay(); 
}

function resetChain() {
    chainIndex = 0;
    counterValue = 0;
    updateThikrDisplay();
}

function toggleTheme() {
    const body = document.body;
    const txt = document.getElementById("themeBtnText");
    if (body.classList.contains("dark-mode")) {
        body.classList.replace("dark-mode", "light-mode");
        if(txt) txt.innerText = "نهاري";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.replace("light-mode", "dark-mode");
        if(txt) txt.innerText = "ليلي";
        localStorage.setItem("theme", "dark");
    }
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) {
        sidebar.style.right = sidebar.style.right === "0px" ? "-280px" : "0px";
    }
    if (overlay) {
        overlay.style.display = overlay.style.display === "block" ? "none" : "block";
    }
}

function shareSite() {
    const shareText = `أدعوكم لزيارة موقع الأذكار والسبحة المتتالية الذكية: ${window.location.href}`;
    window.open(`https://whatsapp.com{encodeURIComponent(shareText)}`, '_blank');
}

function reduceCount(element) {
    let numElement = element.querySelector('.num');
    if (numElement) {
        let currentCount = parseInt(numElement.innerText);
        if (!isNaN(currentCount) && currentCount > 1) {
            numElement.innerText = currentCount - 1;
        } else {
            numElement.innerText = "تم بحمد الله";
            element.style.opacity = "0.35";
        }
    }
}

function resetAllBottomCards() {
    document.querySelectorAll('.card').forEach(card => {
        const numElement = card.querySelector('.num');
        if(numElement) {
            numElement.innerText = numElement.getAttribute('data-max');
            card.style.opacity = "1";
        }
    });
    alert("تم إعادة شحن جميع الأذكار السفلية!");
}

const duaaData = {
    rizq: { title: "أدعية طلب الرزق والتيسير", text: "«اللَّهُمَّ إنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا» <br><br> «اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ»" },
    shifa: { title: "أدعية الشفاء للمريض", text: "«اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا»" },
    faraj: { title: "أدعية تفريج الهم والكرب", text: "«لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ» <br><br> «اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالعَجْزِ وَالكَسَلِ، وَالبُخْلِ وَالْجُبْنِ»" }
};

function showDuaa(type) {
    const titleElement = document.getElementById('modalTitle');
    const textElement = document.getElementById('modalText');
    const modalElement = document.getElementById('duaaModal');
    
    if (titleElement) titleElement.innerText = duaaData[type].title;
    if (textElement) textElement.innerHTML = duaaData[type].text;
    if (modalElement) modalElement.style.display = 'flex';
}

function closeModal() { 
    const modalElement = document.getElementById('duaaModal');
    if (modalElement) modalElement.style.display = 'none'; 
}

function copyDuaa() {
    const htmlText = document.getElementById('modalText').innerHTML;
    const cleanText = htmlText.replace(/<br>/g, '\n').replace(/«/g, '').replace(/»/g, '');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = cleanText; document.body.appendChild(tempTextArea);
    tempTextArea.select(); tempTextArea.setSelectionRange(0, 99999);
    try { document.execCommand('copy'); alert("تم نسخ الدعاء بنجاح!"); } catch (err) { alert("فشل النسخ."); }
    document.body.removeChild(tempTextArea);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const txt = document.getElementById("themeBtnText");
    if (savedTheme === "light") {
        document.body.classList.replace("dark-mode", "light-mode");
        if(txt) txt.innerText = "نهاري";
    }
    updateThikrDisplay();
});
