let checkBox = document.querySelectorAll(".row-checkbox");
let deleteButton = document.getElementById("deleteSelected");
let selectAll = document.getElementById("selectAll");

let tClick = null;

let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
let rooms1 = [...rooms];

let items = Number(document.querySelector("#itemPerPage").value);
let totalPage = Math.ceil(rooms1.length / items);
let currentPage = 1;

let addMovieModal = document.getElementById("addMovieModal");

addMovieModal.addEventListener("hidden.bs.modal", function () {
    addMovieModal.querySelector("form").reset();
});
addMovieModal.addEventListener("show.bs.modal", function () {
    let modalEl = document.getElementById("addMovieModal");
    if (modalEl.getAttribute("data-type") === "edit") {
        modalEl.querySelector("h5").innerText = "Sửa phòng";
    }else modalEl.querySelector("h5").innerText = "Thêm phòng";


});

document.querySelector("#addRoomBtn").addEventListener("click", function () {
    let num = addMovieModal.querySelector("input[placeholder='Số phòng']");
    num.disabled = false;
    num.value = "";
    document.querySelector("#seatRow").value = 0;
    document.querySelector("#seatCol").value = 0;
    renderSeatLayout();
})

selectAll.addEventListener("change", () => {
    checkBox.forEach(item => item.checked = selectAll.checked);
    toggleDeleteButton();
});



function changeItemPerPage() {
    items = Number(document.querySelector("#itemPerPage").value);
    totalPage = Math.ceil(rooms1.length / items);
    renderData(rooms1.slice(0, items));
    deleteButton.style.display = "none";
}

function toggleDeleteButton() {
    let check = Array.from(checkBox).some(item => item.checked);
    deleteButton.style.display = check ? "inline-block" : "none";
}

function deleteSelected() {
    let id = Array.from(checkBox).filter(item => item.checked).map(item => Number(item.getAttribute("data-id")));

    rooms = rooms.filter(room => !id.includes(room.id));
    rooms1 = rooms1.filter(room => !id.includes(room.id));
    localStorage.setItem("rooms", JSON.stringify(rooms));

    renderData();
    popup("Xóa phòng thành công", "success");
}

function renderData(list = rooms1) {
    let start = (currentPage-1) * items;
    let end = start + items;
    list = list.slice(start, end);
    let tbody = document.querySelector("#roomTable tbody");
    tbody.innerHTML = list.reduce((temp, item) => {
        return temp + `<tr>
                <td><input type="checkbox" class="row-checkbox form-check-input" data-id="${item.id}"/></td>
                <td colspan="5">${item.id}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn text-yellow border-0" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-circle-chevron-down fs-5"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item text-white" onclick="editRoom(${item.id})">Edit</a></li>
                            <li><a class="dropdown-item text-danger" onclick="deleteRoom(${item.id})">Delete</a></li>
                        </ul>
                    </div>
                </td>
            </tr>`
    }, "");
    totalPage = Math.ceil(rooms1.length / items);
    checkBox = document.querySelectorAll(".row-checkbox");
    checkBox.forEach(item => item.addEventListener("change", toggleDeleteButton));
    deleteButton.style.display = "none";
    pagination();
}

window.addEventListener("DOMContentLoaded", () => {
    renderData()
})

function renderSeatLayout() {
    let seatRowV = document.querySelector("#seatRow").value;
    let seatColInput = document.querySelector("#seatCol");
    let seatColV = Number(seatColInput.value);

    let seatLayout = document.querySelector("#seatLayout");
    let html = "";

    let ascii = 65;

    if (seatColV > 26) {
        seatColInput.value = 26;
        seatColV = 26;
    }

    for (let i = 0; i < seatColV; i++) {
        html += `<div class="d-flex gap-1">`;
        for (let j = 1; j <= seatRowV; j++) {
            html += `<button class="seat seat-normal cursor" type="button" onclick="setClassSeat(this)">${String.fromCharCode(ascii)}${j}</button>`
        }
        html += `</div>`;
        ++ascii;
    }
    seatLayout.innerHTML = html
}

function renderSeatData(seatData) {
    let seatLayout = document.querySelector("#seatLayout");
    seatLayout.innerHTML = "";

    let rows = Object.keys(seatData);
    rows.forEach(row => {
        let cols = Object.keys(seatData[row]);
        let html = `<div class="d-flex gap-1">`;

        cols.forEach(col => {
            let type = seatData[row][col];
            html += `<button class="seat ${type} cursor" type="button" onclick="setClassSeat(this)">${row}${col}</button>`;
        });

        html += `</div>`;
        seatLayout.innerHTML += html;
    });
}

function typeClick(type) {
    let buttons = document.querySelectorAll(".cursor");
    let cursorUrl = "";

    if (type === "normal") {
        cursorUrl = "../../assets/icon/circle-gray.png";
        tClick = "seat-normal"
    } else if (type === "vip") {
        cursorUrl = "../../assets/icon/circle-yellow.png";
        tClick = "seat-vip";
    } else if (type === "pair") {
        cursorUrl = "../../assets/icon/circle-red.png";
        tClick = "seat-pair";
    } else if (type === "delete") {
        cursorUrl = "../../assets/icon/trash.png";
        tClick = "delete";
    }

    buttons.forEach(btn => {
        btn.style.cursor = `url("${cursorUrl}"), auto`;
    });
}

document.querySelectorAll(".cursor").forEach((item) => {
    item.addEventListener("click", () => {
        if (tClick && tClick !== "delete") {
            item.classList.remove("seat-normal", "seat-vip", "seat-pair");
            item.classList.add(tClick);
        }
    });
})


function setClassSeat(el) {
    if (tClick) {
        if (tClick === "delete") {
            el.remove();
            return;
        }
        el.classList.remove("seat-normal", "seat-vip", "seat-pair");
        if (tClick === "seat-pair") {
            let row = el.innerText[0];
            let seatNum = el.innerText.slice(1);
            let pairNum = (seatNum %2 === 0) ? Number(seatNum) - 1 : Number(seatNum) + 1;
            document.querySelectorAll(".seat").forEach(seat => {
                if (seat.innerText === row + pairNum) {
                    seat.classList.remove("seat-normal", "seat-vip", "seat-pair");
                    seat.classList.add(tClick);
                }
            })
        }
        el.classList.add(tClick);
    }
}

function saveRoom() {
    let roomNumberInput = document.querySelector("input[placeholder='Số phòng']");
    let inputEl = document.querySelectorAll("#addMovieModal input");
    let modalEl = document.getElementById("addMovieModal");
    let roomId = roomNumberInput.value.trim();
    let check = 0;

    let seatRowInput = document.querySelector("#seatRow");
    let seatColInput = document.querySelector("#seatCol");

    inputEl.forEach(item => {
        if (item.value.trim() === "") {
            popup("Điền đầy đủ thông tin", "warn");
            check = 1;
        }
    })
    if (check === 1) return;

    if (modalEl.getAttribute("data-type") !== "edit") {
        if (rooms.some(room => room.id === Number(roomId))) {
            popup("Phòng đã tồn tại", "warn")
            return;
        }
    }

    if (seatColInput <= 0 || seatRowInput <= 0) {
        popup("Số hàng và cột phải lớn hơn 0", "warn");
        return;
    }




    let seatButtons = document.querySelectorAll("#seatLayout .seat");
    let seatData = {};

    seatButtons.forEach(btn => {
        let row = btn.innerText[0];
        let col = parseInt(btn.innerText.slice(1));
        let type = btn.classList.contains("seat-vip") ? "seat-vip" : btn.classList.contains("seat-pair") ? "seat-pair" : "seat-normal";

        if (!seatData[row]) seatData[row] = {};
        seatData[row][col] = type;
    });

    let newRoom = {
        id: Number(roomId),
        seat: seatData
    };

    if (modalEl.getAttribute("data-type") === "edit") {
        let index = rooms.findIndex(room => room.id === Number(roomId));
        rooms[index] = newRoom;
        rooms1[index] = newRoom;
        localStorage.setItem("rooms", JSON.stringify(rooms));
        popup("Sửa phòng thành công", "success");
    } else {
        rooms.push(newRoom);
        rooms1.push(newRoom);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        popup("Thêm phòng thành công", "success");
    }

    renderData();
    bootstrap.Modal.getInstance(document.getElementById("addMovieModal")).hide();
}

function editRoom(id) {
    let room = rooms.find(r => r.id === id);
    let roomNum = document.querySelector("input[placeholder='Số phòng']");
    let seatRowInput = document.querySelector("#seatRow");
    let seatColInput = document.querySelector("#seatCol");

    roomNum.value = room.id;
    roomNum.disabled = true;

    let seatData = room.seat;
    let seatRows = Object.values(seatData)[0];
    let rowCount = Object.keys(seatData).length;
    let colCount = Object.keys(seatRows).length;

    seatRowInput.value = colCount;
    seatColInput.value = rowCount;


    renderSeatData(seatData);
    let modal = new bootstrap.Modal(document.getElementById("addMovieModal"));
    let modalEl = document.getElementById("addMovieModal");
    modalEl.setAttribute("data-type" , "edit");
    modal.show();
}



function deleteRoom(id) {
    let modalDelete = document.getElementById("deleteModal");
    let modal = new bootstrap.Modal(modalDelete);
    modalDelete.setAttribute("data-id", id);
    modal.show();
}

function pressDeleteModal() {
    let modalDelete = document.getElementById("deleteModal");
    let id = modalDelete.getAttribute("data-id");

    rooms = rooms.filter(room => room.id !== Number(id));
    rooms1 = rooms1.filter(room => room.id !== Number(id));
    localStorage.setItem("rooms", JSON.stringify(rooms));

    renderData();
    bootstrap.Modal.getInstance(modalDelete).hide();
    popup("Xóa phòng thành công", "success");
}

function searchRooms() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    rooms1 = rooms.filter(room => room.id.toString().includes(searchInput));
    renderData(rooms1);
}

function pagination() {
    let pag = document.querySelector(".pagination");
    pag.innerHTML = `<li class="page-item ${currentPage === 1? "disabled" : ""}" data-page="${currentPage-1}"><a class="page-link" href="">&lt;</a></li>`;
    for (let i = 1; i <= totalPage; i++) {
        pag.innerHTML += `<li class="page-item ${currentPage === i ? "active" : ""}" data-page="${i}"><a class="page-link" href="">${i}</a></li>`;
    }
    pag.innerHTML += `<li class="page-item ${currentPage === totalPage? "disabled" : ""}" data-page="${currentPage+1}"><a class="page-link" href="">&gt;</a></li>`;
    document.querySelectorAll(".page-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            let page = item.getAttribute("data-page");
            if (page >=1 && page <= totalPage) {
                currentPage = Number(page);
                renderData();
            }
        })
    })
}

function popup(title, type) {
    let message = document.getElementById("message");
    message.innerText = title;
    message.style.display = "block";
    if (type === "warn") {
        message.style.backgroundColor = "#ff9800"
    }else if (type === "success") {
        message.style.backgroundColor = "#7ec75a"
    }
    message.style.color = "#FFFF";

    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}