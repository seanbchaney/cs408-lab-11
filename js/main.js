window.onload = () => {
    document.getElementById('load-items').addEventListener('click', loadItems);
    document.getElementById('item-form').addEventListener('submit', handleFormSubmit);
};

const API_BASE = "https://o9jhxv2blk.execute-api.us-east-2.amazonaws.com/items";

// Load items into the table
function loadItems() {
    fetch(API_BASE)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#items-table tbody');
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => console.error('Error loading items:', err));
}

// Handle form submit to add a new item
function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('item-id').value;
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);

    fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, price })
    })
        .then(() => {
            loadItems();
            e.target.reset();
        })
        .catch(err => console.error('Error adding item:', err));
}

// Delete an item
function deleteItem(id) {
    fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
    })
        .then(() => loadItems())
        .catch(err => console.error('Error deleting item:', err));
}
