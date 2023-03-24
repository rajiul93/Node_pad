const popup_box = document.querySelector(".popup_box")
const add_box = document.querySelector(".add_box")
const closed = document.querySelector(".content header span")
const titles = document.querySelector(".title input")
const desc = document.querySelector(".description textarea")
const save = document.querySelector(".content form button")

const years = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let cart = [];
const notes = JSON.parse(localStorage.getItem("notes"))
if (notes) {
    cart = notes;
}

let isUpdate = false, updateId;
add_box.addEventListener("click", function () {
    popup_box.classList.add("show");
    save.innerHTML="Add Note!"

});

closed.addEventListener("click", function () {
    isUpdate = false;
    popup_box.classList.remove("show");
    titles.value = "";
    desc.value = "";
});


const showNotes = () => {
    notes?.forEach((note, index) => {
        let liTag = `<li class="note">
        <div class="details">
                <p>${note.title} </p>
                <span>${note.description}</span>
        </div>
        <div class="bottom_content"> 
                    <span>${note.date}</span>
                <div class="setting">
                    <i onClick=showMenu(this) class="bi bi-three-dots"></i>
                    <ul class="menu">
                        <li onclick="editOption(${index}, '${note.title}', '${note.description}')">Edit</li>
                        <li onclick="deleteNote(${index})">Delete</li>
                    </ul>
                </div>
        </div>
    </li>`

        add_box.insertAdjacentHTML("afterend", liTag)
    })
};
const editOption = (index, title, description) => {
    isUpdate = true;
    updateId = index
    popup_box.classList.add("show");
    titles.value = title;
    desc.value = description;
    save.innerHTML="Update your data!"

}
const deleteNote = (index) => {
    let confirmDel = confirm("are you confirm") 
    if(!confirmDel) return;
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    window.location.reload()

}

// when click three dotted for that this
const showMenu = (ele) => {
    ele.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != ele) {
            ele.parentElement.classList.remove("show");

        }
    })
}

// add all data  localStorage
save.addEventListener("click", e => {
    e.preventDefault();
    let title = titles.value;
    let description = desc.value;
    let date = new Date()
    let tarik = `${years[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    let details = { title: title, description: description, date: tarik }
    if (title.length > 0 || description.length > 0) {
        if (!isUpdate) {
            cart.push(details);
        } else {
            isUpdate = false;
            notes[updateId] = details
        }
        localStorage.setItem("notes", JSON.stringify(cart));
        titles.value = "";
        desc.value = "";
        popup_box.classList.remove("show");
        window.location.reload()
    }
})
showNotes()
