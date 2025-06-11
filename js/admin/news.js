let checkBox = document.querySelectorAll('.row-checkbox');
const deleteButton = document.getElementById('deleteSelected');
const selectAll = document.getElementById('selectAll');
let footerPagination = document.getElementById("footerPagination")


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
    let newsList = JSON.parse(localStorage.getItem('news')) || [];
    id.forEach(item => {
        const index = newsList.findIndex(m => m.id === item);
        if (index !== -1) {
            newsList.splice(index, 1);
        }
    });
    localStorage.setItem('news', JSON.stringify(newsList));
    renderMovieList(newsList);
    popup("Xoá thành công", "success");
}

document.querySelector("#addMovieModal").addEventListener("hidden.bs.modal", function () {
  const editMovieModal = document.getElementById('addMovieModal');
  editMovieModal.querySelector('form').reset();
  document.getElementById('editmoviePicture').value = ''; 
});

let newsList = JSON.parse(localStorage.getItem('news')) || [];

let currentPage = 0;
let countPerPage = 5;
// getItemCountPerPage()

let totalPages = Math.ceil(newsList.length / countPerPage)

function renderMovieList(movies) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  movies.forEach((m, index) => {
    tbody.innerHTML += `
        <tr>
          <td><input type="checkbox" class="row-checkbox form-check-input" data-id="${m.id}"/></td>
          <td>${m.title}</td>
          <td>${m.date}</td>
          <td>
            <div class="dropdown">
                        <button class="btn text-yellow border-0" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-circle-chevron-down fs-5"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item text-white" onclick="openEditModal(${m.id})">Edit</a></li>
                            <li><a class="dropdown-item text-danger" onclick="openModal(${m.id})">Delete</a></li>
                        </ul>
                    </div>
          </td>
</tr>
        `;
  })
  let html = "";

  // pagination
  for (let i = 1; i <= totalPages; i++) {
    html += `                       
      <li class="page-item ${currentPage + 1 == i ? 'Active' : ''}" onclick="setPage(${i - 1})"><a class="page-link">${i}</a></li>
`
  }
  footerPagination.innerHTML = `
    <li class="page-item disabled" onclick="prevPage()"><a class="page-link fw-bold" >&lt;</a></li> 
                        ${html}
    <li class="page-item" onclick="nextPage()"><a class="page-link fw-bold" >></a></li>
`
  checkBox = document.querySelectorAll('.row-checkbox')
  checkBox.forEach(item => item.addEventListener("change", toggleDeleteButton));

  deleteButton.style.display = "none";
}

renderMovieList(pagination(currentPage));

function pagination(page) {
  let startIndex = page * countPerPage
  let endIndex = startIndex + countPerPage
  return newsList.slice(startIndex, endIndex)
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--
    renderMovieList(pagination(currentPage))
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++
    renderMovieList(pagination(currentPage))
  }
}


function setPage(x) {
  currentPage = x
  renderMovieList(pagination(currentPage))

}

document.getElementById('addMovie').addEventListener("click", function () {
  let title = document.getElementById('movieTitle').value;
  let date = document.getElementById('movieDate').value;
  let description = document.getElementById('movieDescription').value;
  let files = Array.from(document.getElementById('moviePicture').files);

  let f = [];
  let cout = 0;
  let total = files.length;
  let movie = new Object;

  if (title.trim() === "" || date.trim() === "" || description.trim() === "") {
    popup("Điền đầy đủ thông tin", "warn");
    return;
  }

  if(title.length > 80){
    popup("Title tối đa 80 kí tự", "warn");
    return;
  }

  if(total == 0){
    movie = {
      id: newsList.length + 1,
      title: title,
      date: date,
      description: description,
      img: f
    };
    newsList.push(movie);
    localStorage.setItem('news', JSON.stringify(newsList));
    renderMovieList(pagination(currentPage));
    hideAddMovieModal();
    popup("Thêm tin tức thành công", "success");
  } else {
    for (let file of files) {
      let reader = new FileReader();

      reader.onload = (e) => {
        f.push(e.target.result);
        cout++;

        if (cout === total) {
          movie = {
            id: newsList.length + 1,
            title: title,
            date: date,
            description: description,
            img: f
          };
          newsList.push(movie);
          localStorage.setItem('news', JSON.stringify(newsList));
          renderMovieList(pagination(currentPage));
          hideAddMovieModal();
          popup("Thêm tin tức thành công", "success");
        }
      };

      reader.readAsDataURL(file);
    }
  }
});


function hideAddMovieModal() {
  const modalElement = document.getElementById('addMovieModal');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
}

let newsIndex = null;
function openModal(id) {
  newsIndex = id;
  const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  modal.show();

}


function deleteNews() {
  if (newsIndex === null) return;

  const indexCheck = newsList.findIndex(m => m.id === newsIndex);
  if (indexCheck !== -1) {
    newsList.splice(indexCheck, 1);
    localStorage.setItem('news', JSON.stringify(newsList));
    renderMovieList(newsList);
  }
  popup("Xoá thành công", "success");
  const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
  modal.hide();
}

let editIndex = null;
function openEditModal(id) {
  const movie = newsList.find(m => m.id === id);
  if (!movie) return;
  const modal = new bootstrap.Modal(document.getElementById('editMovieModal'));
  modal.show();
  document.getElementById('editmovieTitle').value = movie.title;
  document.getElementById('editmovieDate').value = movie.date;
  document.getElementById('editmovieDescription').value = movie.description;
  editIndex = id;
  document.getElementById('editmoviePicture').value = ''; // Reset file input
};

function saveEditMovie() {
  const title = document.getElementById('editmovieTitle').value.trim();
  const date = document.getElementById('editmovieDate').value.trim();
  const description = document.getElementById('editmovieDescription').value.trim();
  const files = Array.from(document.getElementById('editmoviePicture').files);

  if (title.trim() === "" || date.trim() === "" || description.trim() === "") {
    popup("Điền đầy đủ thông tin", "warn");
    return;
  }

  if(title.length > 80){
    popup("Title tối đa 80 kí tự", "warn");
    return;
  }

  const f = [];
  if (editIndex === null) return;

  const movie = newsList.find(m => m.id === editIndex);
  
  if (!movie) return;

  movie.title = title;
  movie.date = date;
  movie.description = description;

  let cout = 0;
  let total = files.length;
  
  if (total === 0) {
    localStorage.setItem('news', JSON.stringify(newsList));
    renderMovieList(newsList);
    const modal = bootstrap.Modal.getInstance(document.getElementById('editMovieModal'));
    modal.hide();
    editIndex = null;
    popup("Sửa tin tức thành công", "success");
    return;
  }

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      f.push(e.target.result);
      cout++;
      if (cout === total) {
        movie.img = f;
        localStorage.setItem('news', JSON.stringify(newsList));
        renderMovieList(newsList);
        
        popup("Sửa tin tức thành công", "success");
        const modal = bootstrap.Modal.getInstance(document.getElementById('editMovieModal'));
        modal.hide();
        editIndex = null;
      }
    };
    reader.readAsDataURL(file);
  }
}



function getItemCountPerPage() {
  document.getElementById("selectItems").addEventListener("change", function () {
    countPerPage = document.getElementById("selectItems").value * 1; // *1 vif dg là chuỗi chuyẻn sang số
    totalPages = Math.ceil(newsList.length / countPerPage)
    currentPage = 0
    renderMovieList(pagination(currentPage))
    deleteButton.style.display = "none";
  })
}
getItemCountPerPage()

function searchMovie() {
  newsList = JSON.parse(localStorage.getItem("news"))
  let date = document.getElementById("filterDate").value
  if(date != ""){
    newsList = newsList.filter(Element => Element.date == date)
  }
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  newsList = newsList.filter(m => m.title.toLowerCase().includes(searchInput));  
  // if(searchInput=="") location.reload()
  currentPage = 0;
  totalPages = Math.ceil(newsList.length / countPerPage);
  renderMovieList(pagination(currentPage));
}

function filterDateOK(){
  newsList = JSON.parse(localStorage.getItem("news"))

  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  if(searchInput != ""){
    newsList = newsList.filter(Element => Element.title.includes(searchInput))
  }

  let filterDateInput = document.getElementById("filterDate")
  if(filterDateInput.value == ""){
    searchMovie()
  }
  else{
    newsList = newsList.filter(Element => Element.date == filterDateInput.value)
  }
  currentPage = 0
  totalPages = Math.ceil(newsList.length / countPerPage)
  renderMovieList(pagination(currentPage))
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