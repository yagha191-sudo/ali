// كود تشغيل السبحة الإلكترونية
let sebhaCounter = 0;
function incrementSebha() {
    sebhaCounter++;
    document.getElementById('sebhaCount').innerText = sebhaCounter;
}
function resetSebha() {
    sebhaCounter = 0;
    document.getElementById('sebhaCount').innerText = sebhaCounter;
}

// كود إنقاص عداد الذكر عند النقر
function reduceCount(element) {
    let numElement = element.querySelector('.num');
    if (numElement) {
        let currentCount = parseInt(numElement.innerText);
        if (!isNaN(currentCount)) {
            if (currentCount > 1) {
                numElement.innerText = currentCount - 1;
            } else {
                numElement.innerText = "تم بحمد الله";
                element.style.opacity = "0.5";
                element.style.backgroundColor = "#e2ece9";
                element.style.borderRightColor = "#888";
            }
        }
    }
}

// قاعدة بيانات نصوص الأدعية المستجابة
const duaaData = {
    rizq: {
        title: "أدعية طلب الرزق والتيسير",
        text: "«اللَّهُمَّ إنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا» <br><br> «اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ»"
    },
    shifa: {
        title: "أدعية الشفاء للمريض",
        text: "«اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا»"
    },
    faraj: {
        title: "أدعية تفريج الهم والكرب",
        text: "«لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ» <br><br> «اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ»"
    }
};

// وظائف فتح وإغلاق نافذة الأدعية
function showDuaa(type) {
    document.getElementById('modalTitle').innerText = duaaData[type].title;
    document.getElementById('modalText').innerHTML = duaaData[type].text;
    document.getElementById('duaaModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('duaaModal').style.display = 'none';
}

// كود نسخ النص الذكي للهواتف
function copyDuaa() {
    const htmlText = document.getElementById('modalText').innerHTML;
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
        alert("عذراً، لم تنجح عملية النسخ.");
    }
    
    document.body.removeChild(tempTextArea);
}
