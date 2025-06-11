let checkBox = document.querySelectorAll(".row-checkbox");
let deleteButton = document.getElementById("deleteSelected");
let selectAll = document.getElementById("selectAll");

let movies = JSON.parse(localStorage.getItem("movies")) || [];
let rooms = JSON.parse(localStorage.getItem("rooms")) || [];


let listMovie = document.getElementById("listMovie");
let ftPagination = document.getElementById("ftPagination");
let footerModal = document.getElementById("footerModal");
let addMovieModal = document.getElementById("addMovieModal");

let perPage = 5;
let currentPage = 0;
let totalPage = 0;

selectAll.addEventListener("change", () => {
    checkBox.forEach(item => item.checked = selectAll.checked);
    toggleDeleteButton();
});



function toggleDeleteButton() {
    let check = Array.from(checkBox).some(item => item.checked);
    deleteButton.style.display = check ? "inline-block" : "none";
}

function deleteSelected() {
    let id = Array.from(checkBox).filter(item => item.checked).map(item => Number(item.getAttribute("data-id")));

    movies = movies.filter(item => !id.includes(item.id));
    localStorage.setItem("movies", JSON.stringify(movies));

    renderTable();
    popup("Xóa thành công", "success");
}

calcTotalPage();
renderTable();
if (document.getElementById("search")) {
    document.getElementById("search").addEventListener("change", searching);
}
if (document.getElementById("filterDate")) {
    document.getElementById("filterDate").addEventListener("change", searching);
}

calcTotalPage();
renderTable();

document.getElementById("coutPerPage").addEventListener("change", () => {
    perPage = Number(document.getElementById("coutPerPage").value);
    currentPage = 0;
    calcTotalPage();
    renderTable();
});

addMovieModal.addEventListener('hidden.bs.modal', () => {
    document.getElementById("formMovie").reset();
    document.getElementById("schedule-container").innerHTML = '';
    addSchedule();
});

function calcTotalPage() {
    totalPage = Math.ceil(movies.length / perPage);
}
function paginate(data) {
    let start = currentPage * perPage;
    return data.slice(start, start + perPage);
}

function renderTable() {
    let chunk = paginate(movies);
    listMovie.innerHTML = chunk.map(m => `
    <tr>
      <td><input type="checkbox" class="row-checkbox form-check-input" data-id="${m.id}"/></td>
      <td>${m.title}</td>
      <td>${m.author.join(', ')}</td>
      <td><span class="badge bg-success">${m.tag.join(', ')}</span></td>
      <td>${m.duration}</td>
      <td>${m.premiere}</td>
      <td>
        <div class="dropdown">
            <button class="btn text-yellow border-0" data-bs-toggle="dropdown">
                <i class="fa-solid fa-circle-chevron-down fs-5"></i>
            </button>          
            <ul class="dropdown-menu">
            <li><a class="dropdown-item text-white" data-bs-toggle="modal" data-bs-target="#addMovieModal" onclick="onStartEdit(${m.id})">Edit</a></li>
            <li><a class="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="document.querySelector('#confirmDeleteModal').setAttribute('data-id', '${m.id}')">Delete</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

    let html = `<li class="page-item ${currentPage === 0 ? 'disabled' : ''}" onclick="onPage(-1)"><a class="page-link">&lt;</a></li>`;
    for (let i = 0; i < totalPage; i++) {
        html += `<li class="page-item ${i === currentPage ? 'active' : ''}" onclick="onPage(${i})"><a class="page-link">${i + 1}</a></li>`;
    }
    html += `<li class="page-item ${currentPage >= totalPage - 1 ? 'disabled' : ''}" onclick="onPage(${currentPage + 1})"><a class="page-link">&gt;</a></li>`;
    ftPagination.innerHTML = html;

    checkBox = document.querySelectorAll(".row-checkbox");
    checkBox.forEach(item => item.addEventListener("change", toggleDeleteButton));
    deleteButton.style.display = "none";
}

function onPage(id) {
    if (id < 0 || id >= totalPage) return;
    currentPage = id;
    renderTable();
}
function onDelete() {
    let el = document.querySelector("#confirmDeleteModal");
    let id = Number(el.getAttribute("data-id"));
    console.log(id);
    movies = movies.filter(m => m.id !== id);
    localStorage.setItem("movies", JSON.stringify(movies));
    calcTotalPage();
    renderTable();
    popup("Xoá phim thành công!", "success");
    el.removeAttribute("data-id");
    let modal = bootstrap.Modal.getInstance(el);
    modal.hide();
}


function searching() {
    movies = JSON.parse(localStorage.getItem("movies")) || [];
    let q = document.getElementById("search").value.trim().toLowerCase();
    let dateVal = document.getElementById("filterDate").value;

    if (!q && !dateVal) {
        currentPage = 0;
        calcTotalPage();
        renderTable();
        return;
    }

    let filtered = movies;
    if (q) filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
    if (dateVal) filtered = filtered.filter(m => m.premiere === dateVal);

    listMovie.innerHTML = filtered.slice(0, perPage).map(m => `
    <tr>
      <td><input type="checkbox" class="form-check-input row-checkbox"></td>
      <td>${m.title}</td>
      <td>${m.author.join(', ')}</td>
      <td><span class="badge bg-success">${m.tag.join(', ')}</span></td>
      <td>${m.duration}</td>
      <td>${m.premiere}</td>
      <td>
        <div class="dropdown">
          <button class="btn text-yellow border-0 dropdown-toggle" data-bs-toggle="dropdown">
            <i class="fa-solid fa-circle-chevron-down fs-5"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#addMovieModal" onclick="onStartEdit(${m.id})">Edit</a></li>
            <li><a class="dropdown-item text-danger" onclick="onDelete(${m.id})">Delete</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

    if (filtered.length > perPage) {
        let html = `<li class="page-item disabled"> <a class="page-link">&lt;</a> </li>`;
        totalPage = Math.ceil(filtered.length / perPage);
        for (let i = 0; i < totalPage; i++) {
            html += `<li class="page-item ${i === currentPage ? 'active' : ''}" onclick="onPage(${i})"><a class="page-link">${i + 1}</a></li>`;
        }
        html += `<li class="page-item disabled"><a class="page-link">&gt;</a></li>`;
        ftPagination.innerHTML = html;
    } else {
        ftPagination.innerHTML = '';
    }
}
function createTimeRow(time = '', room = '') {
    return `
    <div class="d-flex align-items-center mb-1 time-item">
      <input type="time" class="form-control me-2 scheduleTime" value="${time}">
      <select class="form-control me-2 room">
        <option value="">Chọn phòng</option>
        ${rooms.map(r => `<option value="${r.id}"${r.id == room ? ' selected' : ''}>room ${r.id}</option>`).join('')}
      </select>
      <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.time-item').remove()">X</button>
    </div>
  `;
}
function addSchedule() {
    let cont = document.getElementById("schedule-container");
    let block = document.createElement('div');
    block.className = 'schedule-item mb-3';
    block.innerHTML = `
    <div class="d-flex align-items-center mb-2">
      <input type="date" class="form-control scheduleDate me-2">
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="this.closest('.schedule-item').remove()"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="schedule-time">
      ${createTimeRow()}
    </div>
    <button type="button" class="btn btn-success btn-sm" onclick="onAddTime(this)"><i class="fa-solid fa-plus"></i></button>
  `;
    cont.append(block);
}
function onAddTime(btn) {
    let parent = btn.closest('.schedule-item').querySelector('.schedule-time');
    parent.insertAdjacentHTML('beforeend', createTimeRow());
}
function getSchedules() {
    let out = [];
    document.querySelectorAll('.schedule-item').forEach(si => {
        let date = si.querySelector('.scheduleDate').value;
        let sessions = [];
        si.querySelectorAll('.time-item').forEach(ti => {
            let time = ti.querySelector('.scheduleTime').value;
            let room = Number(ti.querySelector('.room').value);
            if (time && room) {
                sessions.push({ time, room, seatBooked: [] });
            }
        });
        if (date && sessions.length > 0) {
            out.push({ date, sessions });
        }
    });
    return out;
}


function setButtonAddMovie() {
    document.getElementById('formMovie').reset();
    document.getElementById('schedule-container').innerHTML = '';
    addSchedule();
    footerModal.innerHTML = `
    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button class="btn btn-primary" onclick="saveNewMovie()">Save Movie</button>`;
}
function saveNewMovie() {
    let f = document.getElementById('formMovie');
    if (!isFormValid(f)) return;

    if(f.title.value.length > 80){
        popup("Title tối đa 80 kí tự", "warn");
        return;
    }

    let item = {
        id: Math.max(0, ...movies.map(m => m.id)) + 1,
        title: f.title.value,
        video: f.video.value,
        country: f.country.value,
        duration: Number(f.duration.value),
        age_limit: f.age_limit.value,
        tag: f.tag.value.split(',').map(s => s.trim()),
        format: f.format.value,
        author: f.author.value.split(',').map(s => s.trim()),
        actor: f.actor.value.split(',').map(s => s.trim()),
        description: f.description.value,
        premiere: f.premiere.value,
        schedule: getSchedules()
    };
    let file = document.getElementById('fileInput').files[0];
    if (file) {
        let rdr = new FileReader();
        rdr.onload = e => {
            item.image = e.target.result;
            push(item)
        };
        rdr.readAsDataURL(file);
    }
    else push(item);
    function push(it) {
        movies.push(it);
        localStorage.setItem('movies', JSON.stringify(movies));
        popup("Thêm phim thành công!", "success");
        location.reload();
    }
}


function onStartEdit(id) {
    document.getElementById('addMovieModal').querySelector('h5').innerText = 'Sửa Phim';
    setButtonAddMovie();
    editMovie(id);
}
function editMovie(id) {
    let m = movies.find(m => m.id === id);
    let f = document.getElementById('formMovie');
    f.title.value = m.title;
    
    f.video.value = m.video;
    f.country.value = m.country;
    f.duration.value = m.duration;
    f.age_limit.value = m.age_limit;
    f.tag.value = m.tag.join(', ');
    f.format.value = m.format;
    f.author.value = m.author.join(', ');
    f.actor.value = m.actor.join(', ');
    f.description.value = m.description;
    f.premiere.value = m.premiere;

    let cont = document.getElementById('schedule-container'); cont.innerHTML = '';
    m.schedule.forEach(day => {
        addSchedule();
        let block = cont.lastElementChild;
        block.querySelector('.scheduleDate').value = day.date;
        let timeDiv = block.querySelector('.schedule-time'); timeDiv.innerHTML = '';
        day.sessions.forEach(ss => timeDiv.insertAdjacentHTML('beforeend', createTimeRow(ss.time, ss.room)));
    });
    footerModal.innerHTML = `
    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button class="btn btn-warning" onclick="saveEdit(${m.id})">Save Changes</button>`;
}
function saveEdit(id) {
    let f = document.getElementById('formMovie');
    if (!isFormValid(f)) return;

    console.log(f.title.length);

    if(f.title.value.length > 80){
        popup("Title tối đa 80 kí tự", "warn");
        return;
    }

    let update = {
        id,
        title: f.title.value,
        video: f.video.value,
        country: f.country.value,
        duration: Number(f.duration.value),
        age_limit: f.age_limit.value,
        tag: f.tag.value.split(',').map(s => s.trim()),
        format: f.format.value,
        author: f.author.value.split(',').map(s => s.trim()),
        actor: f.actor.value.split(',').map(s => s.trim()),
        description: f.description.value,
        premiere: f.premiere.value,
        schedule: getSchedules(),
        image: movies.find(id => id === id)?.image || ''
    };
    let file = document.getElementById('fileInput').files[0];
    if (file) {
        let rdr = new FileReader();
        rdr.onload = e => {
            update.image = e.target.result;
            updateFinal();
        };
        rdr.readAsDataURL(file);
    } else updateFinal();
    function updateFinal() {
        movies = movies.map(x => x.id === id ? update : x);
        localStorage.setItem('movies', JSON.stringify(movies));
        popup("Cập nhật phim thành công", "success");
        location.reload();
    }
}

function popup(title, type) {
    let message = document.getElementById("message");
    if (type === "warn") {
        message.style.backgroundColor = "#ff9800"
    }else if (type === "success") {
        message.style.backgroundColor = "#7ec75a"
    }
    message.innerText = title;
    message.style.display = "block";
    message.style.color = "#FFFF";

    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}

function isFormValid(form) {
    let check = [
        "title", "video", "country", "duration", "age_limit", "tag", "format", "author", "actor", "description", "premiere"
    ];
    for (let name of check) {
        if (!form[name].value.trim()) {
            popup("Vui lòng nhập đầy đủ thông tin", "warn");
            return false;
        }
    }

    let schedules = getSchedules();
    if (schedules.length === 0) {
        popup("Phải có ít nhất 1 lịch chiếu", "warn");
        return false;
    }
    return true;
}

