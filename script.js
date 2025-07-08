let notesTitles = [
    // "titel 1",
    // "titel 2",
    // "titel 3"
];
//notizen anziegen lassen
let notes = [
    // "beispiel notiz 1",
    // "beispiel notiz 2",
    // "beispiel notiz 3",
];

let archivNotesTitles = [];
let archivhNotes = [];

let trashNotesTitles = [];
let trashNotes = [];

function init(){
    getFromLocalStorage()
    renderNotes()
}
function renderNotes() {

    let contentRef = document.getElementById("content");
    contentRef.innerHTML = '';
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        // const note = notes[indexNote];

        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function renderTrashNotes() {

    let trashContentRef = document.getElementById("trash_content");
    trashContentRef.innerHTML = '';
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        // const note = notes[indexTrashNote];

        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function renderArchivNotes() {
    let archivContentRef = document.getElementById("archiv_content");
    archivContentRef.innerHTML = '';
    for (let indexArchivNote = 0; indexArchivNote < archivhNotes.length; indexArchivNote++) {
        // const note = notes[indexArchivNote];

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
        <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="deleteNote(${indexTrashNote})">
    </div>
    `;
}


function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div class="note-card">
        <div class="note-title">${archivNotesTitles[indexArchivNote]}</div>
        <div class="note-content">${archivhNotes[indexArchivNote]}</div>
        <div style="display:flex; gap:10px; justify-content:space-between;">
            <img class="delete-btn" src="./icons/ereaser.png" alt="Löschen" onclick="deleteArchivNote(${indexArchivNote})">
            <img class="delete-btn" src="./icons/speichern.png" alt="Zurückholen" onclick="restoreArchivNote(${indexArchivNote})">
        </div>
    </div>
    `;
}


//notizen hinzufügen
function addNote() {
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    let noteTitleInputRef = document.getElementById("noteTitleInput");
    let noteTitleInput = noteTitleInputRef.value;
    notesTitles.push(noteTitleInput);
    notes.push(noteInput);
    renderNotes();
    saveToLocalStorage();
    noteInputRef.value = "";
    noteTitleInputRef.value ="";
    noteTitleInputRef.focus();
}


//in mülleimer verschieben
function moveToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]);
    renderNotes();
    renderTrashNotes();
}


//notiz löschen
function deleteNote(indexTrashNote) {
    trashNotes.splice(indexTrashNote, 1);
    renderNotes();
    renderTrashNotes();
}

function moveToArchiv(indexNote) {
    let archivNote = notes.splice(indexNote, 1);
    archivhNotes.push(archivNote[0]);
    let archivNoteTitle = notesTitles.splice(indexNote, 1);
    archivNotesTitles.push(archivNoteTitle[0]);
    renderNotes();
}

function saveToLocalStorage(){
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getFromLocalStorage(){
    let savedTitle = JSON.parse(localStorage.getItem("notesTitles"));
    let savedNote = JSON.parse(localStorage.getItem("notes"));

    if (savedTitle == null) {
        return
    }
    notesTitles = savedTitle
    notes = savedNote
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
    archivhNotes.splice(indexArchivNote, 1);
    renderArchivNotes();
    // Optional: localStorage aktualisieren
}

// Archivierte Notiz zurückholen
function restoreArchivNote(indexArchivNote) {
    notesTitles.push(archivNotesTitles[indexArchivNote]);
    notes.push(archivhNotes[indexArchivNote]);
    archivNotesTitles.splice(indexArchivNote, 1);
    archivhNotes.splice(indexArchivNote, 1);
    renderArchivNotes();
    renderNotes();
    // Optional: localStorage aktualisieren
}
