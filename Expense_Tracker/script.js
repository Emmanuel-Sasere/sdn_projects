var expenses = [];
var nextId = 1;
var expenseForm = document.getElementById('expense-form');
var expenseList = document.getElementById('expense-list');
var totalAmountSpan = document.getElementById('total-amount');
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var expenseNameInput = document.getElementById('expense-name');
    var expenseAmountInput = document.getElementById('expense-amount');
    var expenseName = expenseNameInput.value.trim();
    var expenseAmount = parseFloat(expenseAmountInput.value);
    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
        var newExpense = { id: nextId++, name: expenseName, amount: expenseAmount };
        expenses.push(newExpense);
        addExpenseToList(newExpense);
        updateTotalAmount();
        expenseForm.reset();
    }
});
function addExpenseToList(expense) {
    var li = document.createElement('li');
    li.textContent = "".concat(expense.name, ": $").concat(expense.amount.toFixed(2));
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        expenses = expenses.filter(function (exp) { return exp.id !== expense.id; });
        li.remove();
        updateTotalAmount();
    });
    var updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', function () {
        var newName = prompt('Enter new name:', expense.name);
        var newAmount = parseFloat(prompt('Enter new amount:', expense.amount.toString()) || '0');
        if (newName && !isNaN(newAmount) && newAmount > 0) {
            expense.name = newName;
            expense.amount = newAmount;
            li.textContent = "".concat(expense.name, ": $").concat(expense.amount.toFixed(2));
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
    var totalAmount = expenses.reduce(function (total, expense) { return total + expense.amount; }, 0);
    totalAmountSpan.textContent = totalAmount.toFixed(2);
}
