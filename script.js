// مصفوفة الأذكار التلقائية للسبحة
const sebhaPhrases = [
    { text: "الحمد لله", target: 33 },
    { text: "سبحان الله", target: 33 },
    { text: "الله أكبر", target: 33 },
    { text: "لا إله إلا الله وحده لا شريك له", target: 1 }
];

let currentPhraseIndex = 0; let currentCounter = 0; let globalTotalCounter = 0; 

// دالة تفعيل الوضع الليلي
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function openSebhaModal() { document.getElementById('sebhaModal').style.display = 'flex'; updateSebhaUI(); }
function closeSebhaModal() { document.getElementById('sebhaModal').style.display = 'none'; }

function updateSebhaUI() {
    const current = sebhaPhrases[currentPhraseIndex];
    document.getElementById('sebhaCount').innerText = currentCounter;
    document.getElementById('currentPhrase').innerText = current.text;
    document.getElementById('phraseTargetText').innerText = `المطلوب: ${current.target} مرة`;
    document.getElementById('totalCount').innerText = globalTotalCounter;
    const progressPercent = (currentCounter / current.target) * 100;
    document.getElementById('progressBar').style.width = `${progressPercent}%`;
}

function incrementSebha() {
    const current = sebhaPhrases[currentPhraseIndex];
    currentCounter++; globalTotalCounter++;
    if (currentCounter >= current.target) {
        currentCounter = 0; currentPhraseIndex++; 
        if (currentPhraseIndex >= sebhaPhrases.length) {
            currentPhraseIndex = 0; globalTotalCounter = 0; 
            alert("أحسنت! تم إكمال دورة التسبيح كاملة، وتمت إعادة الضبط تلقائياً.");
            closeSebhaModal();
        }
        const modalContent = document.querySelector('#sebhaModal .modal-content');
        modalContent.classList.add('flash-effect');
        setTimeout(() => modalContent.classList.remove('flash-effect'), 400);
    }
    updateSebhaUI();
}

function resetSebha() { currentPhraseIndex = 0; currentCounter = 0; globalTotalCounter = 0; updateSebhaUI(); }

// كود عداد أذكار البطاقات
function reduceCount(element) {
    let numElement = element.querySelector('.num');
    if (numElement) {
        let currentCount = parseInt(numElement.innerText);
        if (!isNaN(currentCount)) {
            if (currentCount > 1) { numElement.innerText = currentCount - 1; } 
            else {
                numElement.innerText = "✓ تم";
                element.style.opacity = "0.4";
                element.style.backgroundColor = "#e2ece9";
            }
        }
    }
}

// قاعدة بيانات الأدعية الموسعة الجديدة بالكامل
const duaaData = {
    rizq: { title: "أدعية طلب الرزق والتيسير", text: "«اللَّهُمَّ إنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا» <br><br> «اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ»" },
    shifa: { title: "أدعية الشفاء للمريض", text: "«اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا»" },
    faraj: { title: "أدعية تفريج الهم والكرب", text: "«لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ» <br><br> «اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ...»" },
    mait: { title: "أدعية للمتوفى (الميت)", text: "«اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ»" },
    najah: { title: "أدعية النجاح والتوفيق", text: "«اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزَنَ إِذَا شِئْتَ سَهْلًا» <br><br> «رَبِّ اشْرَحْ لِي صَدْرِي* وَيَسِّرْ لِي أَمْرِي»" },
    safar: { title: "دعاء السفر والركوب", text: "«سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ» <br><br> «اللَّهُمَّ إنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى»" }
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
    try { document.execCommand('copy'); alert("تم نسخ الدعاء بنجاح!"); } catch (err) { alert("عذراً، فشل النسخ."); }
    document.body.removeChild(tempTextArea);
}
