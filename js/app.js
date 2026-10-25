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

const examSelector = document.getElementById("examType");
if (examSelector) {
  examSelector.addEventListener("change", function () {
    const exam = this.value;
    const subject = document.getElementById("subject")?.value || "";
    const sub = document.getElementById("subSubject")?.value || "";
    const unit = document.getElementById("unit")?.value || "1";
    const chapter = document.getElementById("chapter")?.value || "1";

    document.getElementById("examDescription").textContent =
      `${exam} preparation for ${subject} / ${sub}, Unit ${unit}, Chapter ${chapter}.`;

    document.getElementById("examQuestions").textContent =
      `Add important questions for ${exam} here.`;

    document.getElementById("examNotes").textContent =
      `Add revision notes for ${exam} here.`;

    document.getElementById("examPaper").textContent =
      `Add a practice paper for ${exam} here.`;
  });
}

/* Science Unit 1 - Unit Test 1 question bank */
const scienceUnit1Questions = [
  {
    question: "Q1. Explain the Scientific Method with an example.",
    answer: `The Scientific Method is a systematic process used to investigate problems, collect evidence, test hypotheses and draw conclusions.

Steps:
1. Observation: Notice a phenomenon or problem.
2. Question: Formulate a clear question.
3. Hypothesis: Suggest a testable explanation.
4. Experiment: Conduct a controlled test.
5. Data Collection: Record observations and results.
6. Analysis: Interpret the collected data.
7. Conclusion: Decide whether the evidence supports the hypothesis.
8. Communication: Share the results so others can evaluate them.

Example:
A student observes that one plant near a window grows faster than another plant kept in a darker place. The student hypothesizes that greater light helps plant growth. Both plants are given the same soil, water and pot size, but different light exposure. The student measures their growth over two weeks and compares the results. The evidence helps evaluate the hypothesis.

Synopsis:
The Scientific Method develops scientific thinking, observation, experimentation, evidence-based reasoning and problem-solving. A good investigation changes one main variable at a time while keeping other relevant conditions as similar as possible. Results may support, reject or require revision of a hypothesis.`
  },
  {
    question: "Q2. Explain Bloom's Taxonomy.",
    answer: `Bloom's Taxonomy is a framework for classifying educational learning objectives according to levels of cognitive complexity. The revised cognitive taxonomy is commonly associated with Anderson and Krathwohl.

Six levels of the revised taxonomy:
1. Remember: Recall facts and information.
2. Understand: Explain ideas in one's own words.
3. Apply: Use knowledge in a new situation.
4. Analyze: Break information into parts and identify relationships.
5. Evaluate: Make judgments using criteria and evidence.
6. Create: Produce a new plan, product or explanation.

Science classroom example:
Remember: Name the parts of a plant.
Understand: Explain the function of roots.
Apply: Use knowledge of roots to explain how a plant absorbs water.
Analyze: Compare root systems of two plants.
Evaluate: Assess which experimental setup gives stronger evidence about plant growth.
Create: Design an investigation to test how light affects plant growth.

Synopsis:
Bloom's Taxonomy helps teachers write measurable learning outcomes, plan questions from basic recall to higher-order thinking, design activities and assess learning. Teachers should select levels according to the learning objective and students' needs rather than treating the taxonomy as a rigid sequence for every lesson.`
  }
];

function renderScienceUnit1Test() {
  const subject = document.getElementById("subject");
  const sub = document.getElementById("subSubject");
  const unit = document.getElementById("unit");
  const exam = document.getElementById("examType");

  if (!subject || !sub || !unit || !exam) return;
  if (subject.value !== "Pedagogy" ||
      sub.value !== "Science" ||
      unit.value !== "1" ||
      exam.value !== "Unit Test 1") return;

  const existing = document.getElementById("scienceUnit1QuestionBank");
  if (existing) existing.remove();

  const panel = document.createElement("section");
  panel.id = "scienceUnit1QuestionBank";
  panel.className = "card";

  const heading = document.createElement("h2");
  heading.textContent = "Science — Unit 1 — Unit Test 1";
  panel.appendChild(heading);

  scienceUnit1Questions.forEach(item => {
    const article = document.createElement("article");
    article.className = "resource-card";

    const q = document.createElement("h3");
    q.textContent = item.question;

    const answerTitle = document.createElement("h4");
    answerTitle.textContent = "Answer";

    const answer = document.createElement("p");
    answer.style.whiteSpace = "pre-line";
    answer.textContent = item.answer;

    article.append(q, answerTitle, answer);
    panel.appendChild(article);
  });

  const target = document.querySelector("main.content");
  if (target) target.appendChild(panel);
}

document.getElementById("subject")?.addEventListener("change", renderScienceUnit1Test);
document.getElementById("subSubject")?.addEventListener("change", renderScienceUnit1Test);
document.getElementById("unit")?.addEventListener("change", renderScienceUnit1Test);
document.getElementById("examType")?.addEventListener("change", renderScienceUnit1Test);


document.addEventListener("DOMContentLoaded", () => {
  renderScienceUnit1Test();
});

/* Science Unit 1 - Unit Test 1 - Question 1 (16 Marks) */
const scientificMethod16 = {
  title: "प्रश्न 1. वैज्ञानिक विधि को उदाहरण सहित समझाइए। (16 अंक)",
  synopsis: [
    "1. प्रस्तावना",
    "2. वैज्ञानिक विधि का अर्थ एवं परिभाषा",
    "3. वैज्ञानिक विधि की प्रमुख विशेषताएँ",
    "4. वैज्ञानिक विधि के चरण",
    "5. वैज्ञानिक विधि का Flowchart",
    "6. उदाहरण: पौधों की वृद्धि पर प्रकाश का प्रभाव",
    "7. विज्ञान शिक्षण में वैज्ञानिक विधि का महत्त्व",
    "8. उपसंहार"
  ],
  sections: [
    {
      title: "1. प्रस्तावना",
      text: "विज्ञान केवल तथ्यों और सिद्धांतों का संग्रह नहीं है। यह प्रकृति की घटनाओं को समझने, प्रश्न पूछने और प्रमाणों के आधार पर निष्कर्ष निकालने की व्यवस्थित प्रक्रिया है। वैज्ञानिक विधि विद्यार्थियों में जिज्ञासा, तार्किक चिंतन और समस्या-समाधान की क्षमता विकसित करती है।"
    },
    {
      title: "2. अर्थ एवं परिभाषा",
      text: "वैज्ञानिक विधि वह क्रमबद्ध, तार्किक और प्रमाण-आधारित प्रक्रिया है जिसके द्वारा किसी समस्या का अध्ययन अवलोकन, परिकल्पना, प्रयोग, आँकड़ों के विश्लेषण और निष्कर्ष के माध्यम से किया जाता है।"
    },
    {
      title: "3. प्रमुख विशेषताएँ",
      text: "वैज्ञानिक विधि की प्रमुख विशेषताएँ क्रमबद्धता, वस्तुनिष्ठता, परीक्षणीयता, तार्किकता, सत्यापनशीलता और संशोधनशीलता हैं। इसमें निष्कर्ष व्यक्तिगत विश्वास के बजाय उपलब्ध प्रमाणों पर आधारित होते हैं। नए प्रमाण मिलने पर परिकल्पना या निष्कर्ष में संशोधन किया जा सकता है।"
    },
    {
      title: "4. वैज्ञानिक विधि के चरण",
      text: "1. अवलोकन: घटना को ध्यानपूर्वक देखना।\n2. समस्या की पहचान: स्पष्ट प्रश्न निर्धारित करना।\n3. परिकल्पना: संभावित और परीक्षण योग्य उत्तर बनाना।\n4. प्रयोग की योजना: सामग्री, प्रक्रिया और नियंत्रित परिस्थितियाँ तय करना।\n5. प्रयोग एवं आँकड़ा-संग्रह: प्रयोग करना और परिणाम दर्ज करना।\n6. विश्लेषण: आँकड़ों की तुलना और व्याख्या करना।\n7. निष्कर्ष: प्रमाणों के आधार पर परिकल्पना का मूल्यांकन करना।\n8. सत्यापन एवं प्रस्तुतीकरण: प्रक्रिया और परिणाम दूसरों के सामने रखना तथा आवश्यकता पर प्रयोग दोहराना।"
    },
    {
      title: "5. वैज्ञानिक विधि का Flowchart",
      text: "अवलोकन → समस्या की पहचान → परिकल्पना का निर्माण → प्रयोग की योजना → प्रयोग एवं आँकड़ा-संग्रह → आँकड़ों का विश्लेषण → निष्कर्ष → सत्यापन एवं प्रस्तुतीकरण"
    },
    {
      title: "6. उदाहरण: पौधों की वृद्धि पर प्रकाश का प्रभाव",
      text: "समस्या: क्या प्रकाश की मात्रा पौधों की वृद्धि को प्रभावित करती है?\nपरिकल्पना: प्रकाश की परिस्थितियों में अंतर पौधों की वृद्धि में अंतर ला सकता है।\nप्रयोग: एक ही प्रकार के दो समान पौधों को समान मिट्टी, पानी और गमलों में रखें। एक को पर्याप्त प्रकाश तथा दूसरे को कम प्रकाश दें। अन्य परिस्थितियाँ यथासंभव समान रखें। निश्चित अवधि तक उनकी ऊँचाई और पत्तियों में बदलाव दर्ज करें।\nअवलोकन एवं विश्लेषण: दोनों पौधों के आँकड़ों की तुलना करें।\nनिष्कर्ष: प्रमाणों के आधार पर परिकल्पना का समर्थन या संशोधन करें। वास्तविक परिणाम प्रयोग की परिस्थितियों पर निर्भर होंगे।"
    },
    {
      title: "7. विज्ञान शिक्षण में महत्त्व",
      text: "वैज्ञानिक विधि वैज्ञानिक दृष्टिकोण विकसित करती है, अवलोकन और प्रयोग की क्षमता बढ़ाती है, तार्किक एवं आलोचनात्मक चिंतन को प्रोत्साहित करती है, समस्याओं का व्यवस्थित समाधान सिखाती है और विद्यार्थियों को प्रमाणों के आधार पर निर्णय लेना सिखाती है। इससे विज्ञान को रटने के बजाय गतिविधियों और अनुभवों के माध्यम से सीखने में सहायता मिलती है।"
    },
    {
      title: "8. उपसंहार",
      text: "वैज्ञानिक विधि विज्ञान के अध्ययन और अनुसंधान की एक महत्त्वपूर्ण प्रक्रिया है। अवलोकन, परिकल्पना, प्रयोग, विश्लेषण और निष्कर्ष के माध्यम से विद्यार्थी घटनाओं को व्यवस्थित रूप से समझते हैं। विज्ञान शिक्षण में इसका उपयोग जिज्ञासा, स्वतंत्र चिंतन और प्रमाण-आधारित निर्णय क्षमता को बढ़ाता है।"
    }
  ]
};

function renderScientificMethod16() {
  const subject = document.getElementById("subject");
  const sub = document.getElementById("subSubject");
  const unit = document.getElementById("unit");
  const exam = document.getElementById("examType");
  if (!subject || !sub || !unit || !exam) return;

  const isScience = subject.value === "Pedagogy" &&
    sub.value === "Science" &&
    unit.value === "1" &&
    exam.value === "Unit Test 1";

  let panel = document.getElementById("scientificMethodPanel");
  if (panel) panel.remove();
  if (!isScience) return;

  panel = document.createElement("section");
  panel.id = "scientificMethodPanel";
  panel.className = "card";

  const title = document.createElement("h2");
  title.textContent = scientificMethod16.title;
  panel.appendChild(title);

  const synopsisTitle = document.createElement("h3");
  synopsisTitle.textContent = "Synopsis (उत्तर की रूपरेखा)";
  panel.appendChild(synopsisTitle);

  const list = document.createElement("ol");
  scientificMethod16.synopsis.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.replace(/^\d+\.\s*/, "");
    list.appendChild(li);
  });
  panel.appendChild(list);

  const answerTitle = document.createElement("h3");
  answerTitle.textContent = "विस्तृत उत्तर";
  panel.appendChild(answerTitle);

  scientificMethod16.sections.forEach(section => {
    const heading = document.createElement("h3");
    heading.textContent = section.title;
    panel.appendChild(heading);

    if (section.title.includes("Flowchart")) {
      const flow = document.createElement("div");
      flow.className = "scientific-flowchart";
      section.text.split(" → ").forEach((step, index, arr) => {
        const box = document.createElement("div");
        box.className = "flow-step";
        box.textContent = step;
        flow.appendChild(box);
        if (index < arr.length - 1) {
          const arrow = document.createElement("div");
          arrow.className = "flow-arrow";
          arrow.textContent = "↓";
          flow.appendChild(arrow);
        }
      });
      panel.appendChild(flow);
    } else {
      const p = document.createElement("p");
      p.style.whiteSpace = "pre-line";
      p.textContent = section.text;
      panel.appendChild(p);
    }
  });

  const main = document.querySelector("main.content");
  if (main) main.appendChild(panel);
}

["subject", "subSubject", "unit", "examType"].forEach(id => {
  document.getElementById(id)?.addEventListener("change", renderScientificMethod16);
});
document.addEventListener("DOMContentLoaded", renderScientificMethod16);
setTimeout(renderScientificMethod16, 300);
