let arrFestival = JSON.parse(localStorage.getItem('festivals')) || [];
let checkBox = document.querySelectorAll(".row-checkbox");
let deleteButton = document.getElementById("deleteSelected");
let selectAll = document.getElementById("selectAll");


let select = document.querySelector('.form-select');
countProductPerpage = parseInt(select.value);

let currentPage = 0;
let totalPages = Math.ceil((arrFestival.length)/countProductPerpage);

let button1 = document.querySelector('.saveMovie');
let button2 = document.querySelector('.save');

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
    arrFestival = arrFestival.filter(fes => !id.includes(fes.id));
    localStorage.setItem("festival", JSON.stringify(arrFestival));

    Rander(paginationFestival(arrFestival, currentPage));
    popup("Xóa thành công", "success");
}

select.addEventListener('change', function () {
    countProductPerpage = parseInt(this.value);
    totalPages = Math.ceil(arrFestival.length / countProductPerpage);
    currentPage = 0;
    Rander(paginationFestival(arrFestival, currentPage));
    deleteButton.style.display = "none";
  });

function paginationFestival(array, page) {
    const startIndex = page * countProductPerpage;
    const endIndex = startIndex + countProductPerpage;
    return array.slice(startIndex, endIndex);
}

function nextPage() {
    if(currentPage < totalPages-1) {
        currentPage++;
        Rander(paginationFestival(arrFestival, currentPage));
    }
}

function previousPage() {
    if(currentPage > 0) {
        currentPage--;
        Rander(paginationFestival(arrFestival, currentPage));
    }
}

function Rander(array) {
    let html = '';
    let div = document.querySelector('.listFestival');

    array.forEach(value => {
        html += `
            <tr>
        <td><input type="checkbox" class="row-checkbox form-check-input" data-id="${value.id}"/></td>
        <td>${value.title}</td>
        <td>${value.date}</td>
        <td>
          <div class="dropdown">
            <button class="btn text-yellow border-0" data-bs-toggle="dropdown">
              <i class="fa-solid fa-circle-chevron-down fs-5"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item text-white" data-bs-toggle="modal" data-bs-target="#addMovieModal" onclick="editFestival(${value.id-1})">Edit</a></li>
              <li><a class="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="delFestival(${value.id-1})">Delete</a></li>
            </ul>
          </div>
        </td>
      </tr>
            `
    });
    div.innerHTML = html;

    let pageHTML = new Array(totalPages).fill(1).reduce((temp,_,index) => temp+`<li class="page-item ${currentPage==index?'active':''}" onclick = "gotoPage(${index})"><a class="page-link">${index+1}</a></li>`, "");
    pageHTML = `
        <li class="page-item ${currentPage == 0?'disabled':''}" onclick="previousPage()"><a class="page-link fw-bold"><</a></li>
        ${pageHTML}
        <li class="page-item ${currentPage == totalPages-1?'disabled':''}" onclick="nextPage()"><a class="page-link fw-bold">></a></li>
    `
    document.querySelector('.pages').innerHTML = pageHTML;
    checkBox = document.querySelectorAll(".row-checkbox");
    checkBox.forEach(item => item.addEventListener("change", toggleDeleteButton));
    deleteButton.style.display = "none";
}

Rander(paginationFestival(arrFestival, currentPage));

const gotoPage = (page) => {
    currentPage = page;
    Rander(paginationFestival(arrFestival, currentPage));
}

function addFistival() {
    let id = arrFestival.length + 1;
    let title = document.querySelector('.title').value.trim();
    let date = document.querySelector('.date').value.trim();
    let time = document.querySelector('.time').value.trim();
    let description = document.querySelector('.Description').value.trim();
    let imgFiles = Array.from(document.querySelector('.img').files);

    if (title === '' || date === '' || time === '' || description === '') {
        popup("Điền đầy đủ thông tin", "warn");
        return;
    }

    if(title.length > 80){
        popup("Title tối đa 80 kí tự", "warn");
        return;
    }

    let f = [];
    let cout = 0;
    let total = imgFiles.length;
    let festival = new Object;

    if (total === 0) {
        festival = {
            id,
            title,
            date,
            time,
            img: f,
            description
        };

        arrFestival.push(festival);
        document.getElementById('myForm').reset();
        localStorage.setItem('festivals', JSON.stringify(arrFestival));

        totalPages = Math.ceil(arrFestival.length / countProductPerpage);
        Rander(paginationFestival(arrFestival, currentPage));
        bootstrap.Modal.getInstance(document.getElementById("addMovieModal")).hide();
        deleteButton.style.display = "none";
        popup("Thêm thành công", "success");

    } else {
        for (let file of imgFiles) {
            let reader = new FileReader();

            reader.onload = (e) => {
                f.push(e.target.result);
                cout++;

                if (cout === total) {
                    festival = {
                        id,
                        title,
                        date,
                        time,
                        img: f,
                        description
                    };

                    arrFestival.push(festival);
                    document.getElementById('myForm').reset();
                    localStorage.setItem('festivals', JSON.stringify(arrFestival));

                    totalPages = Math.ceil(arrFestival.length / countProductPerpage);
                    Rander(paginationFestival(arrFestival, currentPage));
                    bootstrap.Modal.getInstance(document.getElementById("addMovieModal")).hide();
                    deleteButton.style.display = "none";
                    popup("Thêm thành công", "success");
                }
            };
            reader.readAsDataURL(file);
        }
    }
};

document.querySelector('.addFestival').addEventListener("click", () => {
    document.getElementById('myForm').reset();

    button1.style.display = "block";
    button2.style.display = "none";
    document.querySelector("h5").innerText = "Thêm sự kiện";
});


function editFestival(id) {
    document.querySelector("h5").innerText = "Sửa sự kiện";
    button1.style.display = "none";
    button2.style.display = "block";

    document.querySelector('.title').value = arrFestival[id].title;
    document.querySelector('.date').value = arrFestival[id].date;
    document.querySelector('.time').value = arrFestival[id].time;
    document.querySelector('.Description').value = arrFestival[id].description;

    const processEdit = () => {
        let title = document.querySelector('.title').value.trim();
        let date = document.querySelector('.date').value.trim();
        let time = document.querySelector('.time').value.trim();
        let description = document.querySelector('.Description').value.trim();
        let imgFiles = Array.from(document.querySelector('.img').files);

        if (title === '' || date === '' || time === '' || description === '') {
            popup("Điền đầy đủ thông tin1", "warn");
            return;
        }

        if(title.length > 80){
            popup("Title tối đa 80 kí tự", "warn");
            return;
        }

        let f = [];
        let cout = 0;
        let total = imgFiles.length;

        if (imgFiles.length === 0) {
            arrFestival[id].title = title;
            arrFestival[id].date = date;
            arrFestival[id].time = time;
            arrFestival[id].description = description;
            arrFestival[id].img = arrFestival[id].img || [];

            Rander(paginationFestival(arrFestival, currentPage));
            document.getElementById('myForm').reset();
            localStorage.setItem('festivals', JSON.stringify(arrFestival));
            deleteButton.style.display = "none";
            bootstrap.Modal.getInstance(document.getElementById("addMovieModal")).hide();
            popup("Sửa thành công", "success");


        } else {
            for (let file of imgFiles) {

                let reader = new FileReader();

                reader.onload = (e) => {
                    f.push(e.target.result);
                    cout++;

                    if (cout === total) {

                        arrFestival[id].title = title;
                        arrFestival[id].date = date;
                        arrFestival[id].time = time;
                        arrFestival[id].description = description;
                        arrFestival[id].img = f;

                        Rander(paginationFestival(arrFestival, currentPage));
                        document.getElementById('myForm').reset();
                        localStorage.setItem('festivals', JSON.stringify(arrFestival));

                        bootstrap.Modal.getInstance(document.getElementById("addMovieModal")).hide();
                        deleteButton.style.display = "none";
                        popup("Sửa thành công", "success");
                    }
                };
                reader.readAsDataURL(file);
            }
        }
        document.querySelector('.save').removeEventListener("click", processEdit);
    }
    document.querySelector('.save').addEventListener("click", processEdit);
}

function delFestival(idFestival) {
    document.querySelector(".delete").addEventListener('click', () => {
        arrFestival.splice(idFestival, 1);

        for(let i = idFestival; i < arrFestival.length;i++){
            arrFestival[i].id = i+1;
        }
        localStorage.setItem('festivals', JSON.stringify(arrFestival));
        totalPages = Math.ceil(arrFestival.length / countProductPerpage);

        if (currentPage >= totalPages && currentPage > 0) {
            currentPage--;
        }

        Rander(paginationFestival(arrFestival, currentPage));
        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
        popup("Xoá thành công", "success");   
    })
}

function searchFestival() {
    let input = document.querySelector(".search").value.trim().toLowerCase();

    if (input === "") {
        currentList = arrFestival;
    } else {
        currentList = arrFestival.filter(value => value.title.toLowerCase().includes(input));
    }

    let arraySearch = searchDate(currentList);

    currentPage = 0;
    totalPages = Math.ceil(arraySearch.length / countProductPerpage);
    Rander(paginationFestival(arraySearch, currentPage));
}



function searchDate(arr) {
    let dateSearch = document.getElementById('filterDate').value;
    
    if(dateSearch == ""){
        return arr;
    }
    return arr.filter(value => value.date == dateSearch);
}

function popup(title, type) {
    console.log(title)
    console.log(type)
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
    }, 2000);
}