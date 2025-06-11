let movies = JSON.parse(localStorage.getItem('movies'));

function RanderMovie(listMovies) {
    let html = '';
    let div = document.querySelector('.Movie-phim');

    let ageLimit = (age) => {
        if (age === "P") {
            return "Kiểm duyệt: P - Phim được phổ biến rộng rãi đến mọi đối tượng khán giả";
        } else if (age === "K") {
            return "Kiểm duyệt: K - Phim được phổ biến đến người xem dưới 13 tuổi và có người bảo hộ đi kèm";
        } else if (age === "T13") {
            return "Kiểm duyệt: T13 - Phim được phổ biến đến người xem từ đủ 13 tuổi trở lên (13+)";
        } else if (age === "T16") {
            return "Kiểm duyệt: T16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)";
        } else if (age === "T18") {
            return "Kiểm duyệt: T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)";
        } else {
            return "";
        }
    }
    listMovies.forEach(value => {
        let time = document.querySelector("button.cursor.calendar-btn.btn-red-gradient").textContent // dd-mm-yyyy
        aTime = time.split("-").reverse().join('-')
               
        
        
        
        let htmlTime = ""
        value.schedule.forEach(Element=>{
            if(Element.date == aTime){
                Element.sessions.forEach(ele => htmlTime+= `<button class="active-future-button">${ele.time}</button>`)
            }
        })
        console.log(htmlTime);
        
        


        html += `
            <div class="movie-card cursor d-flex" onclick="location.href='movie-detail.html?id=${value.id}'">
            <img src="${value.image}" alt="">
            <button class="div-2D">${value.format}</button>
            <div class="d-flex flex-column Card-content">
                <div class="type-time d-flex disable">
                    <p class="op-7" id="tag">${value.tag.join(", ")}</p>
                    <p class="op-7" id="duration">${value.duration} phút</p>
                </div>
                <div class="movie-name">
                    <p id="title">${value.title}</p>
                    <p id="country">Xuất xứ: ${value.country}</p>
                    <p class="disable" id="premiere">Khởi chiếu: ${value.premiere}</p>
                    <p class="text-danger text-danger-text " id="age_limit"> ${ageLimit(value.age_limit)}</p>
                </div>
                <div class="lich-chieu">
                    <p class="disable schedule"><b>Lịch chiếu:</b></p>
                    <div class="active-future d-flex flex-wrap">
                        ${htmlTime}
                    </div>
                </div>
            </div>
        </div>
            `

    });
    div.innerHTML = html;
}

// RanderMovie(movies);

// let now = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
// let no =  date.getDate()+1 + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

let divDate = document.querySelector('.Calendar-title-button');
let htmlDate = '';

let date = new Date();
let firstDate = '';

for (let i = 0; i < 4; i++) {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + i);

    let day = String(newDate.getDate()).padStart(2, '0');
    let month = String(newDate.getMonth() + 1).padStart(2, '0');
    let year = newDate.getFullYear();

    if(i == 0){
        firstDate = `${year}-${month}-${day}`
        htmlDate += `<button class="cursor btn-red-gradient calendar-btn" onclick="checkDate('${year}-${month}-${day}', this)">${day}-${month}-${year}</button>`;
    } else{
        htmlDate += `<button class="cursor calendar-btn" onclick="checkDate('${year}-${month}-${day}', this)">${day}-${month}-${year}</button>`;
    }
}

divDate.innerHTML = htmlDate;

let firstButton = document.querySelector('.calendar-btn');
if (firstButton) {
    checkDate(firstDate, firstButton);
}

function checkDate(date, button) {
    document.querySelectorAll('.calendar-btn').forEach(btn => btn.classList.remove('btn-red-gradient'));
    button.classList.add('btn-red-gradient');

    let movieDate = movies.filter(movie => movie.schedule.some(scheduleItem => scheduleItem.date == date));
    RanderMovie(movieDate);
}


