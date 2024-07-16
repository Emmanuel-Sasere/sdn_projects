type Expense = {
  id: number;
  name: string;
  amount: number;
};

let expenses: Expense[] = [];
let nextId = 1;

const expenseForm = document.getElementById('expense-form') as HTMLFormElement;
const expenseList = document.getElementById('expense-list') as HTMLUListElement;
const totalAmountSpan = document.getElementById('total-amount') as HTMLSpanElement;

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const expenseNameInput = document.getElementById('expense-name') as HTMLInputElement;
  const expenseAmountInput = document.getElementById('expense-amount') as HTMLInputElement;

  const expenseName = expenseNameInput.value.trim();
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
    const newExpense: Expense = { id: nextId++, name: expenseName, amount: expenseAmount };
    expenses.push(newExpense);
    addExpenseToList(newExpense);
    updateTotalAmount();
    expenseForm.reset();
  }
});

function addExpenseToList(expense: Expense) {
  const li = document.createElement('li');
  li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    expenses = expenses.filter(exp => exp.id !== expense.id);
    li.remove();
    updateTotalAmount();
  });

  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', () => {
    const newName = prompt('Enter new name:', expense.name);
    const newAmount = parseFloat(prompt('Enter new amount:', expense.amount.toString()) || '0');

    if (newName && !isNaN(newAmount) && newAmount > 0) {
      expense.name = newName;
      expense.amount = newAmount;
      li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
      li.appendChild(updateButton);
      li.appendChild(deleteButton);
      updateTotalAmount();
    }
  });

  li.appendChild(updateButton);
  li.appendChild(deleteButton);

  expenseList.appendChild(li);
}

function updateTotalAmount() {
  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
  totalAmountSpan.textContent = totalAmount.toFixed(2);
}
