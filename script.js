let transactions = JSON.parse(localStorage.getItem("spendwise")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");

function updateUI() {
  list.innerHTML = "";
  let income = 0, expense = 0;
  transactions.forEach((t, index) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
    const li = document.createElement("li");
    li.className = t.type === "income" ? "income-item" : "expense-item";
    li.innerHTML = `<span>${t.desc} (${t.type})</span> <span>${t.amount} KES <button onclick="removeItem(${index})">x</button></span>`;
    list.appendChild(li);
  });
  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = expense;
  document.getElementById("balance").textContent = income - expense;
  localStorage.setItem("spendwise", JSON.stringify(transactions));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  transactions.push({ desc, amount, type });
  form.reset();
  updateUI();
});

function removeItem(index) {
  transactions.splice(index, 1);
  updateUI();
}

document.getElementById("clear").addEventListener("click", () => {
  transactions = [];
  updateUI();
});

updateUI();