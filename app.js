
let notes = JSON.parse(localStorage.getItem("nibble_notes") || "[]");

const container = document.getElementById("notesContainer");
const addBtn = document.getElementById("addNoteBtn");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const search = document.getElementById("search");

menuBtn.onclick = () => sidebar.classList.toggle("hidden");

function saveNotes(){
localStorage.setItem("nibble_notes", JSON.stringify(notes));
renderNotes();
}

function renderNotes(list=notes){
container.innerHTML="";
list.forEach((n,i)=>{
const div=document.createElement("div");
div.className="note";
div.innerHTML=`
<h3 contenteditable oninput="editTitle(${i},this.innerText)">${n.title}</h3>
<p contenteditable oninput="editBody(${i},this.innerText)">${n.body}</p>
<button onclick="deleteNote(${i})">Delete</button>
`;
container.appendChild(div);
});
}

function addNote(){
notes.unshift({title:"New Note",body:"Write something...",star:false});
saveNotes();
}

function deleteNote(i){
if(confirm("Delete this note?")){
notes.splice(i,1);
saveNotes();
}
}

function editTitle(i,val){notes[i].title=val;saveNotes();}
function editBody(i,val){notes[i].body=val;saveNotes();}

function filterNotes(type){
if(type==="starred"){renderNotes(notes.filter(n=>n.star));}
else{renderNotes(notes);}
}

search.oninput = () => {
let q = search.value.toLowerCase();
renderNotes(notes.filter(n =>
n.title.toLowerCase().includes(q) ||
n.body.toLowerCase().includes(q)
));
};

addBtn.onclick = addNote;

renderNotes();

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}
