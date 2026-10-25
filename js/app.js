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
  title: "Q1. Explain the Scientific Method with an example.",
  synopsis: [
    "वैज्ञानिक विधि का अर्थ, परिभाषा और प्रमुख विशेषताएँ",
    "वैज्ञानिक विधि के चरण एवं उनका क्रम",
    "प्रकाश का पौधों की वृद्धि पर प्रभाव: उदाहरण",
    "विज्ञान शिक्षण में शिक्षक की भूमिका, शैक्षिक महत्त्व, सीमाएँ और निष्कर्ष"
  ],
  sections: [
    {
      heading: "1. प्रस्तावना (Introduction)",
      paragraphs: [
        "विज्ञान ज्ञान प्राप्त करने की एक व्यवस्थित प्रक्रिया है, जिसमें अवलोकन, प्रयोग, प्रमाण और तार्किक चिंतन को महत्त्व दिया जाता है। विज्ञान शिक्षण का उद्देश्य केवल तथ्यों को याद करवाना नहीं, बल्कि विद्यार्थियों में जिज्ञासा, समस्या-समाधान, तर्कशीलता और वैज्ञानिक दृष्टिकोण विकसित करना भी है।",
        "वैज्ञानिक विधि इसी उद्देश्य को पूरा करने वाली एक क्रमबद्ध जाँच-पड़ताल की प्रक्रिया है। इसके माध्यम से विद्यार्थी किसी समस्या का अध्ययन करते हैं, संभावित उत्तर प्रस्तुत करते हैं, प्रयोग द्वारा उनकी जाँच करते हैं और प्रमाणों के आधार पर निष्कर्ष निकालते हैं।"
      ]
    },
    {
      heading: "2. वैज्ञानिक विधि का अर्थ एवं परिभाषा",
      paragraphs: [
        "वैज्ञानिक विधि वह व्यवस्थित और तार्किक प्रक्रिया है जिसके द्वारा किसी समस्या या प्राकृतिक घटना का अवलोकन किया जाता है, प्रश्न निर्धारित किया जाता है, परिकल्पना बनाई जाती है, प्रयोग और आँकड़ों के माध्यम से उसकी जाँच की जाती है तथा प्रमाणों के आधार पर निष्कर्ष निकाला जाता है।",
        "सरल शब्दों में, वैज्ञानिक विधि का अर्थ है—किसी प्रश्न का उत्तर अनुमान मात्र से नहीं, बल्कि व्यवस्थित जाँच और प्रमाणों के आधार पर खोजना।"
      ]
    },
    {
      heading: "3. वैज्ञानिक विधि की प्रमुख विशेषताएँ",
      paragraphs: [
        "1. व्यवस्थित प्रक्रिया: इसमें समस्या की पहचान से निष्कर्ष तक चरणबद्ध ढंग से कार्य किया जाता है।",
        "2. अवलोकन पर आधारित: प्राकृतिक घटनाओं को ध्यानपूर्वक देखकर जानकारी एकत्र की जाती है।",
        "3. प्रमाण और प्रयोग का महत्त्व: विचारों की जाँच निरीक्षण, प्रयोग और प्राप्त आँकड़ों से की जाती है।",
        "4. तार्किकता: निष्कर्ष व्यक्तिगत विश्वास के बजाय उपलब्ध प्रमाणों और तर्क पर आधारित होते हैं।",
        "5. निष्पक्षता: पूर्वाग्रह कम करने और परिणामों को ईमानदारी से दर्ज करने का प्रयास किया जाता है।",
        "6. परीक्षणयोग्यता: परिकल्पना ऐसी होनी चाहिए जिसकी जाँच की जा सके।",
        "7. पुनरावृत्ति: जहाँ संभव हो, प्रयोग को दोहराकर परिणामों की विश्वसनीयता जाँची जा सकती है।",
        "8. संशोधन की संभावना: नए प्रमाण मिलने पर परिकल्पना या निष्कर्ष में बदलाव किया जा सकता है।"
      ]
    },
    {
      heading: "4. वैज्ञानिक विधि के चरण",
      paragraphs: [
        "1. अवलोकन (Observation): किसी घटना या समस्या को ध्यानपूर्वक देखना और उससे संबंधित तथ्य दर्ज करना।",
        "2. समस्या या प्रश्न का निर्धारण (Question): अवलोकन के आधार पर स्पष्ट प्रश्न बनाना, जिसकी जाँच की जा सके।",
        "3. परिकल्पना (Hypothesis): समस्या का संभावित और परीक्षणयोग्य उत्तर प्रस्तुत करना। परिकल्पना अंतिम सत्य नहीं होती।",
        "4. प्रयोग की योजना (Planning): आवश्यक सामग्री, प्रक्रिया, माप और नियंत्रित परिस्थितियाँ निर्धारित करना।",
        "5. प्रयोग (Experiment): योजना के अनुसार जाँच करना। जहाँ संभव हो, एक मुख्य स्वतंत्र चर बदला जाता है और अन्य महत्त्वपूर्ण परिस्थितियाँ समान रखी जाती हैं।",
        "6. आँकड़ों का संग्रह (Data Collection): माप, अवलोकन और परिणामों को व्यवस्थित रूप से दर्ज करना।",
        "7. विश्लेषण (Analysis): प्राप्त आँकड़ों की तुलना करके पैटर्न और संबंधों को समझना।",
        "8. निष्कर्ष (Conclusion): यह तय करना कि उपलब्ध प्रमाण परिकल्पना का समर्थन करते हैं या नहीं। आवश्यकता होने पर परिकल्पना में संशोधन किया जाता है।",
        "9. संप्रेषण (Communication): प्रक्रिया और परिणाम दूसरों के साथ साझा करना, ताकि वे जाँच सकें और उससे सीख सकें।"
      ]
    },
    {
      heading: "5. वैज्ञानिक विधि का Flowchart",
      paragraphs: [
        "अवलोकन → समस्या/प्रश्न → परिकल्पना → प्रयोग की योजना → प्रयोग → आँकड़ों का संग्रह → विश्लेषण → निष्कर्ष → परिणामों का संप्रेषण",
        "यदि परिणाम परिकल्पना का समर्थन नहीं करते, तो परिकल्पना या प्रयोग की योजना की पुनः जाँच की जाती है और आवश्यकतानुसार प्रक्रिया दोहराई जाती है।"
      ]
    },
    {
      heading: "6. उदाहरण: प्रकाश का पौधों की वृद्धि पर प्रभाव",
      paragraphs: [
        "समस्या: क्या प्रकाश की मात्रा पौधे की वृद्धि को प्रभावित करती है?",
        "अवलोकन: एक विद्यार्थी देखता है कि खिड़की के पास रखा पौधा कम रोशनी वाले स्थान के पौधे से अलग गति से बढ़ रहा है।",
        "परिकल्पना: यदि पौधे को पर्याप्त प्रकाश मिलेगा, तो समान परिस्थितियों में उसकी वृद्धि कम प्रकाश वाले पौधे से अधिक हो सकती है।",
        "प्रयोग की योजना: समान प्रकार और लगभग समान आकार के दो पौधे, समान गमले, मिट्टी और पानी का उपयोग किया जाता है। एक पौधे को अधिक प्रकाश और दूसरे को कम प्रकाश दिया जाता है।",
        "प्रयोग और आँकड़े: दोनों पौधों की ऊँचाई शुरुआत में और फिर प्रतिदिन या निर्धारित अंतराल पर दो सप्ताह तक मापी जाती है। माप तालिका में दर्ज किए जाते हैं।",
        "विश्लेषण: दोनों पौधों की वृद्धि की तुलना की जाती है। पानी, मिट्टी, गमले के आकार और अन्य महत्त्वपूर्ण परिस्थितियों को यथासंभव समान रखा जाता है, ताकि प्रकाश के प्रभाव का बेहतर आकलन किया जा सके।",
        "निष्कर्ष: प्राप्त आँकड़ों के आधार पर देखा जाता है कि परिणाम परिकल्पना का समर्थन करते हैं या नहीं। अधिक विश्वसनीय निष्कर्ष के लिए प्रयोग दोहराया जा सकता है।",
        "इस उदाहरण से स्पष्ट होता है कि वैज्ञानिक विधि विद्यार्थियों को अनुमान के बजाय प्रमाणों के आधार पर उत्तर खोजने की आदत सिखाती है।"
      ]
    },
    {
      heading: "7. विज्ञान शिक्षण में शिक्षक की भूमिका",
      paragraphs: [
        "1. विद्यार्थियों में जिज्ञासा उत्पन्न करने वाले प्रश्न पूछना।",
        "2. समस्या को स्पष्ट रूप से निर्धारित करने में सहायता करना।",
        "3. विद्यार्थियों को स्वयं परिकल्पना बनाने के अवसर देना।",
        "4. सुरक्षित और उपयुक्त प्रयोग की योजना बनाने में मार्गदर्शन करना।",
        "5. निष्पक्ष अवलोकन, सही मापन और व्यवस्थित रिकॉर्ड रखने की आदत विकसित करना।",
        "6. विद्यार्थियों को आँकड़ों का विश्लेषण करने और प्रमाण-आधारित निष्कर्ष निकालने के लिए प्रेरित करना।",
        "7. गलत परिणाम आने पर विद्यार्थियों को निराश न करके पुनः जाँच और संशोधन के लिए प्रोत्साहित करना।",
        "8. प्रयोगशाला सुरक्षा, सहयोग और वैज्ञानिक नैतिकता का ध्यान रखना।"
      ]
    },
    {
      heading: "8. वैज्ञानिक विधि का शैक्षिक महत्त्व",
      paragraphs: [
        "1. वैज्ञानिक दृष्टिकोण: विद्यार्थी अंधविश्वास या बिना प्रमाण के दावों के बजाय तर्क और प्रमाण को महत्त्व देना सीखते हैं।",
        "2. समस्या-समाधान: समस्या को पहचानने, विकल्पों की जाँच करने और समाधान खोजने की क्षमता बढ़ती है।",
        "3. सक्रिय अधिगम: विद्यार्थी केवल सुनने के बजाय स्वयं अवलोकन और प्रयोग करते हैं।",
        "4. आलोचनात्मक चिंतन: विद्यार्थी आँकड़ों की तुलना करते हैं और निष्कर्षों की विश्वसनीयता पर विचार करते हैं।",
        "5. रचनात्मकता और जिज्ञासा: नए प्रश्न पूछने और संभावित समाधान खोजने की प्रवृत्ति विकसित होती है।",
        "6. व्यावहारिक ज्ञान: वैज्ञानिक सिद्धांतों को वास्तविक जीवन की घटनाओं से जोड़ने में सहायता मिलती है।",
        "7. सहयोग और संप्रेषण: समूह में कार्य करने, परिणाम साझा करने और दूसरों के विचार सुनने का अवसर मिलता है।",
        "8. स्वाध्याय: विद्यार्थी स्वतंत्र रूप से जानकारी खोजने और अपनी समझ को सुधारने का अभ्यास करते हैं।"
      ]
    },
    {
      heading: "9. वैज्ञानिक विधि की सीमाएँ",
      paragraphs: [
        "1. प्रत्येक वैज्ञानिक समस्या का समाधान एक ही निश्चित क्रम में नहीं मिलता; शोध के अनुसार चरणों में बदलाव हो सकता है।",
        "2. कुछ घटनाओं पर नियंत्रित प्रयोग करना कठिन या अनैतिक हो सकता है।",
        "3. प्रयोगों के लिए समय, सामग्री, उपकरण और प्रशिक्षित मार्गदर्शन की आवश्यकता हो सकती है।",
        "4. गलत मापन, सीमित नमूने या नियंत्रित न की गई परिस्थितियाँ परिणामों को प्रभावित कर सकती हैं।",
        "5. वैज्ञानिक निष्कर्ष उपलब्ध प्रमाणों पर आधारित होते हैं और नए प्रमाण मिलने पर उनमें संशोधन संभव है।"
      ]
    },
    {
      heading: "10. निष्कर्ष (Conclusion)",
      paragraphs: [
        "अतः वैज्ञानिक विधि विज्ञान शिक्षण और अधिगम की एक महत्त्वपूर्ण प्रक्रिया है। यह विद्यार्थियों को अवलोकन करने, प्रश्न पूछने, परिकल्पना बनाने, प्रयोग करने, आँकड़ों का विश्लेषण करने और प्रमाण-आधारित निष्कर्ष निकालने की क्षमता प्रदान करती है।",
        "शिक्षक द्वारा उपयुक्त गतिविधियों और प्रयोगों के माध्यम से इसका उपयोग करने पर विद्यार्थियों में वैज्ञानिक दृष्टिकोण, तार्किक चिंतन, जिज्ञासा और समस्या-समाधान कौशल विकसित होते हैं। इसलिए वैज्ञानिक विधि को प्रभावी विज्ञान शिक्षण का एक महत्त्वपूर्ण आधार माना जाता है।"
      ]
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

