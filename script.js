let notesTitles = ["Test Notiz",];
let notes = ["Manchmal fliegt ein Gedanke wie ein Vogel durch den Kopf, bleibt kurz sitzen, pickt an einer Idee und fliegt weiter ins Unbekannte. Vielleicht war es nur ein Hauch von Inspiration – oder der Anfang von etwas Großem. Wer weiß? Wichtig ist: Weiterdenken, weitermachen, frei sein.",];

let archivNotesTitles = [];
let archivNotes = [];

let trashNotesTitles = [];
let trashNotes = [];


function init() {
    getFromLocalStorage()
    renderNotes()
    renderTrashNotes();
    renderArchivNotes();
}


function renderNotes() {

    let contentRef = document.getElementById("content");
    contentRef.innerHTML = '';
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}


function renderTrashNotes() {

    let trashContentRef = document.getElementById("trash_content");
    trashContentRef.innerHTML = '';
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}


function renderArchivNotes() {
    let archivContentRef = document.getElementById("archiv_content");
    archivContentRef.innerHTML = '';
    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}


function getNoteTemplate(indexNote) {
    return `
    <div class="note-card">
        <div class="note-title">${notesTitles[indexNote]}</div>
        <div class="note-content">${notes[indexNote]}</div>
        <div class="note-btns">
        <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="moveToTrash(${indexNote})">
        <img class="archiv-btn" src="./icons/archiv.png" alt="Archivieren" onclick="moveToArchiv(${indexNote})">
        </div>
    </div>
    `;
}


function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div class="note-card trash-card">
        <div class="note-title">${trashNotesTitles[indexTrashNote]}</div>
        <div class="note-content">${trashNotes[indexTrashNote]}</div>
        <div style="display:flex; gap:10px; justify-content:flex-end;">
            <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="deleteNote(${indexTrashNote})">
            <img class="save-btn" src="./icons/restore.webp" alt="Zurückholen" onclick="restoreTrashNote(${indexTrashNote})">
        </div>
    </div>
    `;
}


function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div class="note-card">
        <div class="note-title">${archivNotesTitles[indexArchivNote]}</div>
        <div class="note-content">${archivNotes[indexArchivNote]}</div>
        <div style="display:flex; gap:10px; justify-content:space-between;">
            <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="moveArchivToTrash(${indexArchivNote})">
            <img class="save-btn" src="./icons/restore.webp" alt="Zurückholen" onclick="restoreArchivNote(${indexArchivNote})">
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
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    let noteTitleInputRef = document.getElementById("noteTitleInput");
    let noteTitleInput = noteTitleInputRef.value;
    if (!validateInput(noteTitleInputRef, noteInputRef, noteTitleInput, noteInput)) return;
    notesTitles.push(noteTitleInput);
    notes.push(noteInput);
    renderNotes();
    saveToLocalStorage();
    noteInputRef.value = "";
    noteTitleInputRef.value = "";
    noteTitleInputRef.focus();
}


function validateInput(titleRef, noteRef, title, note) {
    let error = false;
    if (!title) {
        titleRef.value = "";
        titleRef.placeholder = "Bitte einen Titel eingeben!";
        titleRef.classList.add("input-error");
        error = true;
    }
    if (!note) {
        noteRef.value = "";
        noteRef.placeholder = "Bitte eine Notiz eingeben!";
        noteRef.classList.add("input-error");
        error = true;
    }
    if (error) {
        setTimeout(() => {
            titleRef.classList.remove("input-error");
            noteRef.classList.remove("input-error");
            titleRef.placeholder = "Bitte gib einen Titel ein";
            noteRef.placeholder = "Neue Notiz...";
        }, 2500);
        return false;
    }
    return true;
}

//in mülleimer verschieben
function moveToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]);
    saveToLocalStorage();
    saveToLocalStorageTrash();
    saveToLocalStorageArchiv
    renderNotes();
    renderTrashNotes();
}


//notiz löschen
function deleteNote(indexTrashNote) {
    trashNotes.splice(indexTrashNote, 1);
    trashNotesTitles.splice(indexTrashNote, 1);
    renderNotes();
    renderTrashNotes();
    saveToLocalStorage();
    saveToLocalStorageTrash();
    saveToLocalStorageArchiv();
}


// notiz archivieren
function moveToArchiv(indexNote) {
    let archivNote = notes.splice(indexNote, 1);
    archivNotes.push(archivNote[0]);
    let archivNoteTitle = notesTitles.splice(indexNote, 1);
    archivNotesTitles.push(archivNoteTitle[0]);
    saveToLocalStorage();
    saveToLocalStorageTrash();
    saveToLocalStorageArchiv();
    renderNotes();
}


//notiz aus dem archiv in den mülleimer verschieben
function moveArchivToTrash(indexArchivNote) {
    let trashNote = archivNotes.splice(indexArchivNote, 1);
    let trashNoteTitle = archivNotesTitles.splice(indexArchivNote, 1);
    trashNotes.push(trashNote[0]);
    trashNotesTitles.push(trashNoteTitle[0]);
    saveToLocalStorage();
    saveToLocalStorageTrash();
    saveToLocalStorageArchiv();
    renderArchivNotes();
    renderTrashNotes();
}


function saveToLocalStorage() {
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("notes", JSON.stringify(notes));
}


function saveToLocalStorageTrash() {
    localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}


function saveToLocalStorageArchiv() {
    localStorage.setItem("archivNotesTitles", JSON.stringify(archivNotesTitles));
    localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
}


function getFromLocalStorage() {
    let savedTitle = JSON.parse(localStorage.getItem("notesTitles"));
    let savedNote = JSON.parse(localStorage.getItem("notes"));
    let savedArchivTitles = JSON.parse(localStorage.getItem("archivNotesTitles"));
    let savedArchivNotes = JSON.parse(localStorage.getItem("archivNotes"));
    let savedTrashTitles = JSON.parse(localStorage.getItem("trashNotesTitles"));
    let savedTrashNotes = JSON.parse(localStorage.getItem("trashNotes"));
    if (savedTitle) notesTitles = savedTitle;
    if (savedNote) notes = savedNote;
    if (savedArchivTitles) archivNotesTitles = savedArchivTitles;
    if (savedArchivNotes) archivNotes = savedArchivNotes;
    if (savedTrashTitles) trashNotesTitles = savedTrashTitles;
    if (savedTrashNotes) trashNotes = savedTrashNotes;
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
    archivNotesTitles.splice(indexArchivNote, 1);
    archivNotes.splice(indexArchivNote, 1);
    renderArchivNotes();
}


// Archivierte Notiz zurückholen
function restoreArchivNote(indexArchivNote) {
    notesTitles.push(archivNotesTitles[indexArchivNote]);
    notes.push(archivNotes[indexArchivNote]);
    archivNotesTitles.splice(indexArchivNote, 1);
    archivNotes.splice(indexArchivNote, 1);
    renderArchivNotes();
    renderNotes();
    saveToLocalStorage();
    saveToLocalStorageArchiv();
    saveToLocalStorageTrash();
}


function restoreTrashNote(indexTrashNote) {
    notesTitles.push(trashNotesTitles[indexTrashNote]);
    notes.push(trashNotes[indexTrashNote]);
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
    renderNotes();
    saveToLocalStorage();
    saveToLocalStorageTrash();
    saveToLocalStorageArchiv();
}