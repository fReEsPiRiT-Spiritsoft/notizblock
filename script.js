//notizen anziegen lassen
let notes = [
    "beispiel notiz 1",
    "beispiel notiz 2",
    "beispiel notiz 3",
];


function renderNotes(){

    let contentRef = document.getElementById("content");
    contentRef.innerHTML = ''; 
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        const note = notes[indexNote];
        
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}


function getNoteTemplate(indexNote){
    return `<p>+ ${notes[indexNote]}<button onclick="deleteNote(${indexNote})">x</button></p>`
}


//notizen hinzufügen
function addNote(){
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
    noteInputRef.focus();
}


//notizen löschen
function deleteNote(indexNote){
    notes.splice(indexNote, 1);
}

// notizen archivieren
// notizen bearbeiten