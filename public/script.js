document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const noteInput = document.getElementById('noteInput');
    const note = noteInput.value;

    try {
        const response = await fetch('/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note })
        });
        const result = await response.json();
        if (response.ok) {
            noteInput.value = '';
            loadNotes();
        } else {
            alert(result.error);
        }
    } catch (err) {
        alert('Ошибка при добавлении заметки');
    }
});

async function loadNotes() {
    try {
        const response = await fetch('/notes');
        const notes = await response.json();
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            notesList.appendChild(li);
        });
    } catch (err) {
        alert('Ошибка при загрузке заметок');
    }
}

// Загрузка заметок при загрузке страницы
loadNotes();