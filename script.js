let notesTitles = [
    "titel 1",
    "titel 2",
    "titel 3"
];
//notizen anziegen lassen
let notes = [
    "beispiel notiz 1",
    "beispiel notiz 2",
    "beispiel notiz 3",
];

let trashNotesTitles = [];
let trashNotes = [];


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


function getNoteTemplate(indexNote) {
    return `<p>+ Titel: ${notesTitles[indexNote]} <br> Notiz: ${notes[indexNote]}<button onclick="moveToTrash(${indexNote})">x</button><br><br></p>`
}


function getTrashNoteTemplate(indexTrashNote) {
    return `<p>+ Titel: ${trashNotesTitles[indexTrashNote]} <br> Notiz:  ${trashNotes[indexTrashNote]}<button onclick="moveToTrash(${indexTrashNote})">x</button><br><br></p>`
}


//notizen hinzufügen
function addNote() {
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
    noteInputRef.focus();
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


// notizen archivieren
// notizen bearbeiten