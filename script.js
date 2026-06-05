// 1. تعريف مصفوفة الأذكار الافتراضية أولاً لمنع أخطاء التحميل
let thikrChain = [
    { name: "سُبْحَانَ اللهِ 📿", cleanName: "سُبْحَانَ اللهِ", limit: 33 },
    { name: "الحَمْدُ للهِ 🤲", cleanName: "الحَمْدُ للهِ", limit: 33 }
];

// 2. تعريف متغيرات العدادات في الأعلى لمنع خطأ الـ ReferenceError
let chainIndex = 0; 
let counterValue = 0; 

// 3. تعريف بيانات الأدعية لمنع خطأ Cannot access 'duaaData'
const duaaData = {
    rizq: { title: "أدعية طلب الرزق والتيسير", text: "«اللَّهُمَّ إنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا» <br><br> «اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ»" },
    shifa: { title: "أدعية الشفاء للمريض", text: "«اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا»" },
    faraj: { title: "أدعية تفريج الهم والكرب", text: "«لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ» <br><br> «اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالعَجْزِ وَالكَسَلِ، وَالبُخْلِ وَالْجُبْنِ»" }
};

// 4. تهيئة Firebase وتأمين قواعد البيانات
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 5. دالة جلب الإعدادات والأذكار الحية من Firebase
function loadLiveSettings() {
    database.ref('settings').on('value', (snapshot) => {
        const data = snapshot.val();
        if(data) {
            if(data.themeColor) {
                const header = document.querySelector("header");
                if (header) header.style.backgroundColor = data.themeColor;
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

// 6. التحكم في شاشة (Modal) السبحة المتتالية
function openSebhaModal() {
    const modal = document.getElementById("sebhaModal");
    const wrapper = document.getElementById("mainContentWrapper");
    if(modal) modal.style.display = "flex";
    if(wrapper) wrapper.classList.add("blur-active");
    updateThikrDisplay();
}

function closeSebhaModal() {
    const modal = document.getElementById("sebhaModal");
    const wrapper = document.getElementById("mainContentWrapper");
    if(modal) modal.style.display = "none";
    if(wrapper) wrapper.classList.remove("blur-active");
}

// 7. تحديث النصوص العدادات داخل واجهة السبحة
function updateThikrDisplay() {
    const titleElement = document.getElementById("thikrTitle");
    const instructionElement = document.getElementById("thikrInstruction");
    const countElement = document.getElementById("sebhaCount");

    if (thikrChain && thikrChain.length > 0 && chainIndex < thikrChain.length) {
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

// 8. معالجة النقرات على عداد السبحة الذكية
function handleSebhaClick() {
    if (!thikrChain || thikrChain.length === 0) return;

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

// 9. نظام المظهر الداكن والفاتح وتخزينه في المتصفح
function toggleTheme() {
    const body = document.body;
    const txt = document.getElementById("themeBtnText");
    
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        if(txt) txt.innerText = "نهاري";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
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

// 10. مشاركة الموقع عبر الواتساب
function shareSite() {
    const shareText = `أدعوكم لزيارة موقع الأذكار والسبحة المتتالية الذكية: ${window.location.href}`;
    window.open(`https://whatsapp.com{encodeURIComponent(shareText)}`, '_blank');
}

// 11. عداد الكروت السفلية للأذكار اليومية
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
            const maxVal = card.getAttribute('data-max') || "1";
            numElement.innerText = maxVal;
            card.style.opacity = "1";
        }
    });
    alert("تم إعادة شحن جميع الأذكار السفلية!");
}

// 12. نظام النوافذ المنبثقة للأدعية المأثورة
function showDuaa(type) {
    const titleElement = document.getElementById('modalTitle');
    const textElement = document.getElementById('modalText');
    const modalElement = document.getElementById('duaaModal');
    
    if (titleElement && duaaData[type]) titleElement.innerText = duaaData[type].title;
    if (textElement && duaaData[type]) textElement.innerHTML = duaaData[type].text;
    if (modalElement) modalElement.style.display = 'flex';
}

function closeModal() { 
    const modalElement = document.getElementById('duaaModal');
    if (modalElement) modalElement.style.display = 'none'; 
}

function copyDuaa() {
    const textElement = document.getElementById('modalText');
    if(!textElement) return;
    
    const htmlText = textElement.innerHTML;
    const cleanText = htmlText.replace(/<br>/g, '\n').replace(/«/g, '').replace(/»/g, '');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = cleanText; 
    document.body.appendChild(tempTextArea);
    tempTextArea.select(); 
    tempTextArea.setSelectionRange(0, 99999);
    
    try { 
        document.execCommand('copy'); 
        alert("تم نسخ الدعاء بنجاح!"); 
    } catch (err) { 
        alert("فشل النسخ."); 
    }
    document.body.removeChild(tempTextArea);
}

// 13. بدء التشغيل الأولي بعد جاهزية الواجهة تماماً
document.addEventListener("DOMContentLoaded", () => {
    loadLiveSettings();
    
    const savedTheme = localStorage.getItem("theme");
    const txt = document.getElementById("themeBtnText");
    
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if(txt) txt.innerText = "نهاري";
    } else {
        document.body.classList.add("dark-mode");
        if(txt) txt.innerText = "ليلي";
    }
    updateThikrDisplay();
});
