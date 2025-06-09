
let playerName = "";
let xp = parseInt(localStorage.getItem('xp')) || 0;

function startGame() {
  playerName = document.getElementById("playerName").value || "Player";
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  document.getElementById("greeting").innerText = "Hello, " + playerName + "!";
  updateXPDisplay();
  loadLevels();
}

function updateXPDisplay() {
  document.getElementById("xpDisplay").innerText = "XP: " + xp;
}

function checkAnswer(isCorrect, button) {
  if (isCorrect) {
    xp += 10;
    alert("✅ Correct! You gained 10 XP.");
  } else {
    alert("❌ Incorrect. Try again!");
  }
  localStorage.setItem('xp', xp);
  updateXPDisplay();
  button.disabled = true;
}

function loadLevels() {
  const levels = [
    { title: "Factories Act, 1948", content: "Ensures worker safety, health, and welfare.", quiz: [
      { q: "When was the Factories Act enacted?", options: ["1947", "1948", "1950", "1951"], answer: 1 }
    ]},
    { title: "Minimum Wages Act, 1948", content: "Guarantees minimum wages for workers.", quiz: [
      { q: "Minimum Wages Act is applicable to?", options: ["Organized sector", "Unorganized sector", "Both", "None"], answer: 2 }
    ]},
    { title: "Payment of Wages Act, 1936", content: "Regulates timely payment of wages.", quiz: [
      { q: "What is the maximum wage deduction allowed?", options: ["25%", "50%", "65%", "75%"], answer: 1 }
    ]},
    { title: "ESI Act, 1948", content: "Provides health insurance to employees.", quiz: [
      { q: "Which benefit is not covered under ESI?", options: ["Medical", "Funeral", "Loan", "Disablement"], answer: 2 }
    ]},
    { title: "EPF Act, 1952", content: "Ensures retirement savings for employees.", quiz: [
      { q: "What % of salary goes to EPF?", options: ["8%", "10%", "12%", "15%"], answer: 2 }
    ]},
    { title: "Gratuity Act, 1972", content: "Provides gratuity to employees on exit.", quiz: [
      { q: "Minimum years for gratuity eligibility?", options: ["3", "4", "5", "6"], answer: 2 }
    ]},
    { title: "Shops and Establishments Act", content: "Regulates working conditions in shops.", quiz: [
      { q: "Which sector does it apply to?", options: ["Factories", "IT Firms", "Shops/Commercial", "Agriculture"], answer: 2 }
    ]}
  ];

  const container = document.getElementById("levelContainer");
  container.innerHTML = "";

  levels.forEach((level, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = \`<h2>Level \${idx + 1}: \${level.title}</h2>
                       <p>\${level.content}</p>\`;
    level.quiz.forEach((q, qi) => {
      const qBlock = document.createElement("div");
      qBlock.innerHTML = \`<p><strong>Q: \${q.q}</strong></p>\`;
      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i === q.answer, btn);
        qBlock.appendChild(btn);
      });
      card.appendChild(qBlock);
    });
    container.appendChild(card);
  });
}
