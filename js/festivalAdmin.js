let arrFestival = JSON.parse(localStorage.getItem('festivals'));

function Rander(array) {
    let html = '';
    let div = document.querySelector('.listFestival');

    array.forEach(value => {
        html += `
            <tr>
        <td><input type="checkbox" class="row-checkbox form-check-input"/></td>
        <td>${value.title}</td>
        <td>${value.date}</td>
        <td>
          <div class="dropdown">
            <button class="btn text-yellow border-0" data-bs-toggle="dropdown">
              <i class="fa-solid fa-circle-chevron-down fs-5"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item text-white" onclick="">Edit</a></li>
              <li><a class="dropdown-item text-danger" onclick="delFestival(${value.id-1})">Delete</a></li>
            </ul>
          </div>
        </td>
      </tr>
            `
    });
    div.innerHTML = html;
}

Rander(arrFestival);

function addFistival() {
    let id = arrFestival.length + 1;
    let title = document.querySelector('.title').value.trim();
    let date = document.querySelector('.date').value.trim();
    let time = document.querySelector('.time').value.trim();
    let description = document.querySelector('.Description').value.trim();
    let imgFiles = Array.from(document.querySelector('.img').files);
    let message = document.getElementById("message");

    // Kiểm tra dữ liệu nhập vào
    if (title === '' || date === '' || time === '' || imgFiles.length === 0 || description === '') {
        message.innerText = "Please fill in all required fields!";
        message.style.display = "block";
        message.style.backgroundColor = "#ff9800"
        message.style.color = "#FFFF";

        setTimeout(() => {
            message.style.display = "none";
        }, 3000);
        return;
    }

    let f = [];
    let cout = 0;
    let total = imgFiles.length;

    for (let file of imgFiles) {
        let reader = new FileReader();

        reader.onload = (e) => {
            f.push(e.target.result);
            cout++;

            if (cout === total) {
                let festival = {
                    id,
                    title,
                    date,
                    time,
                    img: f,
                    description
                };

                arrFestival.push(festival);
                Rander(arrFestival);
                document.getElementById('myForm').reset();
                localStorage.setItem('festivals', JSON.stringify(arrFestival));

                message.innerText = "Festival added successfully!";
                
                message.style.display = "block";
                message.style.backgroundColor = "green"
                message.style.color = "#FFFF";

                setTimeout(() => {
                    message.style.display = "none";
                }, 2000);
            }
        };

        reader.onerror = (err) => {
            console.error("Lỗi khi đọc file ảnh:", err);
            message.innerText = "An error occurred while reading the image!";
            message.style.display = "block";
            message.style.backgroundColor = "red"
            message.style.color = "#FFFF";

            setTimeout(() => {
                message.style.display = "none";
            }, 3000);
        };

        reader.readAsDataURL(file);
    }
}

function delFestival(idFestival) {
    arrFestival.splice(idFestival, 1);

    for(let i = idFestival; i < arrFestival.length;i++){
        arrFestival[i].id = i+1;
    }
    Rander(arrFestival);
    localStorage.setItem('festivals', JSON.stringify(arrFestival));
}