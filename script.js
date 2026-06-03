// سلسلة الأذكار المتتالية اليدوية مع صياغة الجملة الإرشادية لكل قسم
const thikrChain = [
    { name: "سُبْحَانَ اللهِ 📿", cleanName: "سُبْحَانَ اللهِ", limit: 33 },
    { name: "الحَمْدُ للهِ 🤲", cleanName: "الحَمْدُ للهِ", limit: 33 },
    { name: "اللهُ أَكْبَرُ 🌟", cleanName: "اللهُ أَكْبَرُ", limit: 33 },
    { name: "لا إله إلا الله وحده لا شريك له ✨", cleanName: "التهليل", limit: 1 }
];

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

// دالة التحديث لبناء الجملة الإرشادية بخط صغير تحت الكلمة مباشرة
function updateThikrDisplay() {
    if (chainIndex < thikrChain.length) {
        const currentData = thikrChain[chainIndex];
        
        // 1. طباعة الكلمة الكبيرة
        document.getElementById("thikrTitle").innerText = currentData.name;
        
        // 2. صياغة وطباعة السطر الصغير المطلوب بالضبط تحت الكلمة مباشرة
        if(currentData.limit > 1) {
            document.getElementById("thikrInstruction").innerText = `قُل ${currentData.cleanName} ${currentData.limit} مرّة`;
        } else {
            document.getElementById("thikrInstruction").innerText = `قُلْهَا مَرَّةً وَاحِدَةً جَزَاكَ اللَّهُ خَيْرًا`;
        }
        
        // 3. طباعة رقم العداد الحالي الضخم بالأسفل
        document.getElementById("sebhaCount").innerText = counterValue;
    } else {
        document.getElementById("thikrTitle").innerText = "🎉 تم إنهاء السلسلة";
        document.getElementById("thikrInstruction").innerText = "تقبل الله صالح أعمالكم";
        document.getElementById("sebhaCount").innerText = "✓";
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

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const txt = document.getElementById("themeBtnText");
    if (savedTheme === "light") {
        document.body.classList.replace("dark-mode", "light-mode");
        if(txt) txt.innerText = "نهاري";
    }
    updateThikrDisplay();
});

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    sidebar.style.right = sidebar.style.right === "0px" ? "-280px" : "0px";
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
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

const duaaData = {
    rizq: { title: "أدعية طلب الرزق والتيسير", text: "«اللَّهُمَّ إنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا» <br><br> «اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ»" },
    shifa: { title: "أدعية الشفاء للمريض", text: "«اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا»" },
    faraj: { title: "أدعية تفريج الهم والكرب", text: "«لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ» <br><br> «اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالعَجْزِ وَالكَسَلِ، وَالبُخْلِ وَالْجُبْنِ»" }
};

function showDuaa(type) {
    document.getElementById('modalTitle').innerText = duaaData[type].title;
    document.getElementById('modalText').innerHTML = duaaData[type].text;
    document.getElementById('duaaModal').style.display = 'flex';
}

function closeModal() { document.getElementById('duaaModal').style.display = 'none'; }

function copyDuaa() {
    const htmlText = document.getElementById('modalText').innerHTML;
    const cleanText = htmlText.replace(/<br>/g, '\n').replace(/«/g, '').replace(/»/g, '');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = cleanText; document.body.appendChild(tempTextArea);
    tempTextArea.select(); tempTextArea.setSelectionRange(0, 99999);
    try { document.execCommand('copy'); alert("تم نسخ الدعاء بنجاح!"); } catch (err) { alert("فشل النسخ."); }
    document.body.removeChild(tempTextArea);
}
