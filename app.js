const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');

const notesContainer = document.getElementById('notes');
const addBtn = document.getElementById('addBtn');

menuBtn.onclick = () => {
sidebar.classList.toggle('open');
};

let notes = JSON.parse(localStorage.getItem('notes') || '[]');

function renderNotes(){

notesContainer.innerHTML='';

notes.forEach((note,i)=>{

let div=document.createElement('div');

div.className='note';

div.innerHTML='<h3>'+note.title+'</h3><p>'+note.text+'</p>';

div.onclick=()=>editNote(i);

notesContainer.appendChild(div);

});

}

function addNote(){

let title=prompt("Note title");

let text=prompt("Note text");

if(title){

notes.push({title,text});

localStorage.setItem('notes',JSON.stringify(notes));

renderNotes();

}

}

function editNote(i){

let title=prompt("Edit title",notes[i].title);

let text=prompt("Edit text",notes[i].text);

notes[i]={title,text};

localStorage.setItem('notes',JSON.stringify(notes));

renderNotes();

}

addBtn.onclick=addNote;

renderNotes();

if('serviceWorker' in navigator){

navigator.serviceWorker.register('service-worker.js');

}
