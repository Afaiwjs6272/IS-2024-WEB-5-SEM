const form = document.getElementById('table-form');
const tableContainer = document.getElementById('table-container');

function generateTable(config) {
    const { days, lessons, language } = config;

    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('generated-table');

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>${language === 'ru' ? 'День' : 'Day'}</th>`;
    for (let i = 1; i <= lessons; i++) {
        headerRow.innerHTML += `<th>${language === 'ru' ? `Урок ${i}` : `Lesson ${i}`}</th>`;
    }
    table.appendChild(headerRow);

    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    for (let i = 1; i <= days; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${language === 'ru' ? `День ${i}` : `Day ${i}`}</td>`;

        for (let j = 1; j <= lessons; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = language === 'ru' ? 'Введите данные' : 'Enter data';

            if (tableData[i - 1] && tableData[i - 1][j - 1]) {
                input.value = tableData[i - 1][j - 1];
            }

            input.addEventListener('input', (event) => saveTableData(event, i - 1, j - 1));

            cell.appendChild(input);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}

function saveTableData(event, rowIndex, cellIndex) {
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];

    if (!tableData[rowIndex]) {
        tableData[rowIndex] = [];
    }

    tableData[rowIndex][cellIndex] = event.target.value;

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const days = parseInt(form.days.value);
    const lessons = parseInt(form.lessons.value);
    const language = form.language.value;

    const config = { days, lessons, language };

    localStorage.setItem('tableConfig', JSON.stringify(config));

    generateTable(config);
});

window.addEventListener('DOMContentLoaded', () => {
    const savedConfig = JSON.parse(localStorage.getItem('tableConfig'));
    if (savedConfig) {
        form.days.value = savedConfig.days;
        form.lessons.value = savedConfig.lessons;
        form.language.value = savedConfig.language;
        generateTable(savedConfig);
    }
});






