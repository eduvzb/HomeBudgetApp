const balance = document.getElementById('balance');
const inflow = document.getElementById('income');
const outflow = document.getElementById('onflow');
const form = document.getElementById('form');
const list = document.getElementById('list');

// Get tranasactions from localstorage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ?  localStorageTransactions : [];


const validations = ({amount, text}) => {
    if(text.trim() === '' || amount.trim() === '') {
        document.getElementById('error_msg').innerHTML='<span>Error</span>'
        setTimeout(() => {
            document.getElementById('error_msg').innerHTML=''
        }, 5000)
        return false;
    } 
    return true;
};

const generateId = () => {
    return Math.floor(Math.random() * 100000)
};

const getValuesFromForm = () => {
    const text = document.getElementById('text').value;
    const amount = document.getElementById('amount').value;
    return {text, amount};
};

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));

};

const start = () => {
    list.innerHTML = "";
    transactions.forEach(addTransacctionDom);
    updateValues();
};  

const removeTransaction = (id) => {
    transactions = transactions.filter(item => item.id != id)
    //update the storage after removing
    updateLocalStorage();
    //need to start the whole app
    start();
}

const updateValues = () => {
    const amounts = transactions.map( item => item.amount);
    console.log(amounts);
    const total = amounts.reduce((bal, value) => (bal +=  value), 0 );
    console.log(total);
    balance.innerHTML = `${0}`;
    inflow.innerHTML = `${0}`;
    outflow.innerHTML = `${0}`;
}

const addTransacctionDom = (transaction) => {
    // sign ( + or -)
    const sing = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    // Add lits element based on the sing
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    // Ading (rendering) the list with the delete button
    // on the page using innerHTML property
    item.innerHTML = `${transaction.text} ${sing} ${Math.abs(transaction.amount)}
        <button 
        class="delete-btn"
        onClick="removeTransaction(${transaction.id})"
        >
            X
        </button>
    `
    list.appendChild(item);
};

const submitForm = (event) => {
    event.preventDefault();
    const form = getValuesFromForm();
    if (!validations(form)) return false;
    const transaction = {
        id: generateId(),
        text: form.text,
        amount: form.amount
    };
    transactions.push(transaction);
    addTransacctionDom(transaction);
    updateValues();
    updateLocalStorage();
};

start();
// Form event
form.addEventListener('submit', submitForm);