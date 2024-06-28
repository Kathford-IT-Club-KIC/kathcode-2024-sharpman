document.addEventListener('DOMContentLoaded', function() {
    fetch('forest-fire-data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => parseCSV(text))
        .catch(error => console.error('Error loading CSV file:', error));
});

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (lines.length) {
        const headers = lines[0].split(',');
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header.trim();
            headerRow.appendChild(th);
        });
        tableHead.appendChild(headerRow);

        for (let i = 1; i < lines.length; i++) {
            const row = document.createElement('tr');
            const cells = lines[i].split(',');
            cells.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell.trim();
                row.appendChild(td);
            });
            tableBody.appendChild(row);
        }
    }
}