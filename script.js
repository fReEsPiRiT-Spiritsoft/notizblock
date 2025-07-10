let allNotes = {
    'notesTitles': [],
    'notes': [],
    'archivNotesTitles': [],
    'archivNotes': [],
    'trashNotesTitles': [],
    'trashNotes': []
}


function init() {
    getFromLocalStorage()
    renderNotes()
    renderTrashNotes();
    renderArchivNotes();
}


function renderNotes() {

    let contentRef = document.getElementById("content");
    contentRef.innerHTML = '';
    for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}


function renderTrashNotes() {

    let trashContentRef = document.getElementById("trash_content");
    trashContentRef.innerHTML = '';
    for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}


function renderArchivNotes() {
    let archivContentRef = document.getElementById("archiv_content");
    archivContentRef.innerHTML = '';
    for (let indexArchivNote = 0; indexArchivNote < allNotes.archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}


function getNoteTemplate(indexNote) {
    return `
    <div class="note-card">
        <div class="note-title">${allNotes.notesTitles[indexNote]}</div>
        <div class="note-content">${allNotes.notes[indexNote]}</div>
        <div class="note-btns">
            <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="moveNote(${indexNote}, 'notes', 'trashNotes');">
            <img class="archiv-btn" src="./icons/archiv.png" alt="Archivieren" onclick="moveNote(${indexNote}, 'notes', 'archivNotes');">
        </div>
    </div>
    `;
}


function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div class="note-card trash-card">
        <div class="note-title">${allNotes.trashNotesTitles[indexTrashNote]}</div>
        <div class="note-content">${allNotes.trashNotes[indexTrashNote]}</div>
        <div style="display:flex; gap:10px; justify-content:flex-end;">
            <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="deleteNote(${indexTrashNote})">
            <img class="save-btn" src="./icons/restore.webp" alt="Zurückholen" onclick="moveNote(${indexTrashNote}, 'trashNotes', 'notes');">
        </div>
    </div>
    `;
}


function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div class="note-card">
        <div class="note-title">${allNotes.archivNotesTitles[indexArchivNote]}</div>
        <div class="note-content">${allNotes.archivNotes[indexArchivNote]}</div>
        <div style="display:flex; gap:10px; justify-content:space-between;">
            <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="moveNote(${indexArchivNote}, 'archivNotes', 'trashNotes');">
            <img class="save-btn" src="./icons/restore.webp" alt="Zurückholen" onclick="moveNote(${indexArchivNote}, 'archivNotes', 'notes');">
        </div>
    </div>
    `;
}


//schauen ob in der textarea die entertatste gedrückt wird, wenn ja   addNote() ausführen
function checkEnter(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addNote();
    }
}


//notizen hinzufügen
function addNote() {
    const noteTitleInputRef = document.getElementById("noteTitleInput");
    const noteInputRef = document.getElementById("noteInput");
    const noteTitleInput = noteTitleInputRef.value;
    const noteInput = noteInputRef.value;

    if (!validateInputs(noteTitleInputRef, noteInputRef, noteTitleInput, noteInput)) return;

    saveNote(noteTitleInput, noteInput);
    resetInputs(noteTitleInputRef, noteInputRef);
}


function validateInputs(titleRef, noteRef, title, note) {
    let error = false;
    if (!title) {
        showInputError(titleRef, "Bitte einen Titel eingeben!");
        error = true;
    }
    if (!note) {
        showInputError(noteRef, "Bitte eine Notiz eingeben!");
        error = true;
    }
    if (error) {
        setTimeout(() => resetInputStyles(titleRef, noteRef), 2500);
        return false;
    }
    return true;
}


function showInputError(ref, message) {
    ref.value = "";
    ref.placeholder = message;
    ref.classList.add("input-error");
}


function resetInputStyles(titleRef, noteRef) {
    titleRef.classList.remove("input-error");
    noteRef.classList.remove("input-error");
    titleRef.placeholder = "Bitte gib einen Titel ein";
    noteRef.placeholder = "Neue Notiz...";
}


function saveNote(title, note) {
    allNotes.notesTitles.push(title);
    allNotes.notes.push(note);
    renderNotes();
    saveToLocalStorage();
}


function resetInputs(titleRef, noteRef) {
    noteRef.value = "";
    titleRef.value = "";
    titleRef.focus();
}


function checkTitleInput(ref, message) {
    titleRef.value = "";
    titleRef.placeholder = "Bitte einen Titel eingeben!";
    titleRef.classList.add("input-error");
}


function moveNote(index, startKey, destinationKey) {
    let note = allNotes[startKey].splice(index, 1);
    allNotes[destinationKey].push(note[0]);

    let noteTitle = allNotes[startKey + "Titles"].splice(index, 1);
    allNotes[destinationKey + "Titles"].push(noteTitle[0]);

    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}


function deleteNote(indexTrashNote) {
    allNotes.trashNotes.splice(indexTrashNote, 1);
    allNotes.trashNotesTitles.splice(indexTrashNote, 1);
    renderNotes();
    renderTrashNotes();
    saveToLocalStorage();
    saveToLocalStorageTrash();
    saveToLocalStorageArchiv();
}


function saveToLocalStorage() {
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
}


function getFromLocalStorage() {
    let savedAllNotes = JSON.parse(localStorage.getItem("allNotes"));
    if (savedAllNotes) {
        allNotes = savedAllNotes;
    }
}


// notizen archivieren
function openArchivOverlay() {
    document.getElementById('archivOverlay').classList.remove('d-none');
    renderArchivNotes();
}
function closeArchivOverlay() {
    document.getElementById('archivOverlay').classList.add('d-none');
}


// Archivierte Notiz löschen
function deleteArchivNote(indexArchivNote) {
    allNotes.archivNotesTitles.splice(indexArchivNote, 1);
    allNotes.archivNotes.splice(indexArchivNote, 1);
    renderArchivNotes();
    saveToLocalStorage();
}


// Archivierte Notiz zurückholen
function restoreArchivNote(indexArchivNote) {
    allNotes.notesTitles.push(allNotes.archivNotesTitles[indexArchivNote]);
    allNotes.notes.push(allNotes.archivNotes[indexArchivNote]);
    allNotes.archivNotesTitles.splice(indexArchivNote, 1);
    allNotes.archivNotes.splice(indexArchivNote, 1);
    renderArchivNotes();
    renderNotes();
    saveToLocalStorage();
}


function restoreTrashNote(indexTrashNote) {
    allNotes.notesTitles.push(allNotes.trashNotesTitles[indexTrashNote]);
    allNotes.notes.push(allNotes.trashNotes[indexTrashNote]);
    allNotes.trashNotesTitles.splice(indexTrashNote, 1);
    allNotes.trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
    renderNotes();
    saveToLocalStorage();
}