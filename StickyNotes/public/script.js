const addBtn = document.getElementById("add-btn");
const main=document.getElementById("main");

addBtn.addEventListener('click',function(){
    addNote();
})

function saveNotes(){
    const notes=document.querySelectorAll(".note textarea");
    //gives all notes 
    const data=[];
    notes.forEach((note)=>{
        data.push(note.value);
    })

    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

function addNote(text=""){
    const note=document.createElement("div");
    note.classList.add("note");
    note.innerHTML=`
    <div class="box-bar">
                <i class="save fa-solid fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>
            <textarea placeholder="write starting note . . .">${text}</textarea>
    </div>`;

    // for delete a note
    note.querySelector(".trash").addEventListener('click',function(){
        note.remove();
        saveNotes();
    });

    // for save a note

    note.querySelector(".save").addEventListener('click',function(){
        saveNotes();
    })

    main.appendChild(note);
    saveNotes();
}


//immediate invoked function

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()