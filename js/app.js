const subjects = [
  {
    name: "नई तालीम एवं अनुभवात्मक अधिगम",
    subs: [{ name: "मुख्य विषय", units: 5 }]
  },
  {
    name: "शिक्षा का दार्शनिक परिप्रेक्ष्य",
    subs: [{ name: "मुख्य विषय", units: 5 }]
  },
  {
    name: "Pedagogy",
    subs: [
      { name: "Hindi", units: 5 },
      { name: "English", units: 5 },
      { name: "Social Science", units: 5 },
      { name: "Mathematics", units: 5 },
      { name: "Science", units: 5 }
    ]
  }
];

const $ = id => document.getElementById(id);
const subjectSelect = $("subject");
const subSelect = $("subSubject");
const unitSelect = $("unit");
const chapterSelect = $("chapter");
const sectionSelect = $("section");

function fill(select, items) {
  select.replaceChildren();
  items.forEach(item => {
    const option = document.createElement("option");
    option.value = item.value ?? item;
    option.textContent = item.label ?? item;
    select.appendChild(option);
  });
}

function currentSubject() {
  return subjects.find(s => s.name === subjectSelect.value);
}
function currentSub() {
  return currentSubject()?.subs.find(s => s.name === subSelect.value);
}
function updateSubs() {
  fill(subSelect, currentSubject().subs.map(s => s.name));
  updateUnits();
}
function updateUnits() {
  const count = currentSub()?.units ?? 5;
  fill(unitSelect, Array.from({ length: count }, (_, i) => ({
    value: String(i + 1), label: `Unit ${i + 1}`
  })));
  updateChapters();
}
function updateChapters() {
  fill(chapterSelect, Array.from({ length: 5 }, (_, i) => ({
    value: String(i + 1), label: `Chapter ${i + 1}`
  })));
  updateSections();
}
function updateSections() {
  fill(sectionSelect, Array.from({ length: 5 }, (_, i) => ({
    value: String(i + 1), label: `Section ${i + 1}`
  })));
  renderContent();
}
function renderContent() {
  const subject = subjectSelect.value;
  const sub = subSelect.value;
  const unit = unitSelect.value;
  const chapter = chapterSelect.value;
  const section = sectionSelect.value;
  $("pageTitle").textContent = subject;
  $("breadcrumb").textContent = `${subject} → ${sub} → Unit ${unit} → Chapter ${chapter} → Section ${section}`;
  $("sectionTitle").textContent = `${sub} · Unit ${unit} · Chapter ${chapter} · Section ${section}`;
  $("sectionDescription").textContent =
    `यह ${subject} के अंतर्गत ${sub}, Unit ${unit}, Chapter ${chapter}, Section ${section} के लिए content template है। वास्तविक notes और syllabus सामग्री बाद में जोड़ी जा सकती है।`;
  $("yearDisplay").textContent = $("year").value;
  $("sessionDisplay").textContent = $("session").value;
  $("resourceTitle").textContent = "अतिरिक्त सामग्री";
  $("resourceDescription").textContent = "Assignment, Practical, Report या Teaching Practice खोलने के लिए ऊपर विकल्प चुनें।";
}

fill(subjectSelect, subjects.map(s => s.name));
updateSubs();

subjectSelect.addEventListener("change", updateSubs);
subSelect.addEventListener("change", updateUnits);
unitSelect.addEventListener("change", updateChapters);
chapterSelect.addEventListener("change", updateSections);
sectionSelect.addEventListener("change", renderContent);
$("year").addEventListener("change", renderContent);
$("session").addEventListener("change", renderContent);

document.querySelectorAll("[data-resource]").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.resource;
    $("resourceTitle").textContent = type;
    const descriptions = {
      Assignment: "यहाँ चुने गए विषय और अध्याय के असाइनमेंट, प्रश्न तथा जमा करने की जानकारी जोड़ी जाएगी।",
      Practical: "यहाँ Practical activities, प्रयोग, observation और practical file की जानकारी जोड़ी जाएगी।",
      Report: "यहाँ project report, field report, internship report और report template जोड़े जा सकते हैं।",
      Teaching: "यहाँ lesson plan, teaching practice, classroom observation और reflective journal जोड़े जा सकते हैं।"
    };
    $("resourceDescription").textContent = `${descriptions[type]} Academic Year: ${$("year").value}; Session: ${$("session").value}.`;
  });
});

let utterance;
$("speakBtn").addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    $("sectionDescription").textContent = "इस browser में text-to-speech उपलब्ध नहीं है।";
    return;
  }
  window.speechSynthesis.cancel();
  utterance = new SpeechSynthesisUtterance(
    `${$("pageTitle").textContent}. ${$("sectionTitle").textContent}. ${$("sectionDescription").textContent}`
  );
  utterance.lang = /[ऀ-ॿ]/.test(utterance.text) ? "hi-IN" : "en-IN";
  utterance.rate = Number($("speed").value);
  window.speechSynthesis.speak(utterance);
});
$("stopBtn").addEventListener("click", () => {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
});
$("speed").addEventListener("input", () => {
  $("speedValue").textContent = `${Number($("speed").value).toFixed(1)}×`;
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.cancel();
  }
});
