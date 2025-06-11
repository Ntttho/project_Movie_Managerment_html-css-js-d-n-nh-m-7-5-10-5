let url = new URLSearchParams(window.location.search);
let id = Number(url.get("id"));
let movies = JSON.parse(localStorage.getItem("movies"));
let rooms = JSON.parse(localStorage.getItem("rooms"));
let movie = movies.find(item => item.id === id)

let seatList = [];
seatList.push({ movieId: id, room: null});
let maxSeat = 0;
let timeoutID;

let indexTime;
let indexDate

let cartEl = document.querySelector("#cart");
let priceEl = document.querySelector("#price");


const updateGrid = () => {
    const seatSelect = document.querySelector(".seat-select");

    if (window.matchMedia("(max-width: 768px)").matches) {
        seatSelect.style.gridTemplateColumns = `repeat(${maxSeat+2}, auto)`;
    } else {
        seatSelect.style.gridTemplateColumns = `repeat(${maxSeat}, auto)`;
    }
};

const toggleSeat = () => {
    let sit = document.querySelector(".sit");
    let time = document.querySelector(".time");
    let calendar = document.querySelector("#calendar");

    sit.classList.toggle("disable")
    time.classList.toggle("disable")
    calendar.classList.toggle("pointer-lock");

    if (!sit.classList.contains("disable")) {
        document.querySelector("#calendar").scrollIntoView({behavior: "smooth"})
    }
}

function renderMovie() {
    let html = "";
    let banner = document.querySelector(".img");
    banner.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url('${movie.image}') no-repeat center center`
    banner.style.backgroundSize = "cover"
    let actor = "Diễn viên: ";
    let ageLimit = () => {
        if (movie.age_limit === "P") {
            return "Kiểm duyệt: P - Phim được phổ biến rộng rãi đến mọi đối tượng khán giả";
        } else if (movie.age_limit === "K") {
            return "Kiểm duyệt: K - Phim được phổ biến đến người xem dưới 13 tuổi và có người bảo hộ đi kèm";
        } else if (movie.age_limit === "T13") {
            return "Kiểm duyệt: T13 - Phim được phổ biến đến người xem từ đủ 13 tuổi trở lên (13+)";
        } else if (movie.age_limit === "T16") {
            return "Kiểm duyệt: T16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)";
        } else if (movie.age_limit === "T18") {
            return "Kiểm duyệt: T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)";
        } else {
            return "";
        }
    }

    movie.actor.forEach((item) => actor += `${item}, `)
    html += `<div class="main">
      <div class="main-flex">
        <img src="${movie.image}" alt="" >
        <div>
          <div class="d-flex">
            <div id="title">${movie.title}</div>
            <div class="tag d-flex justify-content-center align-items-center">${movie.format}</div>
          </div>


          <div class="d-flex sub-title">
            <span id="category">${movie.tag.join(", ")}</span>
            <span class="dash">-</span>
            <span id="country">${movie.country}</span>
            <span class="dash">-</span>
            <span id="time">${movie.duration} phút</span>
            <span id="author-desk">Đạo diễn: ${movie.author}</span>
          </div>`
    if (window.innerWidth <= 768) {
        html += `</div> </div> <p id="author-mobile">Đạo diễn: ${movie.author}</p>`
    }
    html += `<div class="">
            <p id="actor-desk">
              ${actor}
              <span class="premiere-desk"><br>Khởi chiếu: ${movie.premiere}</span>
            </p>

            <p id="desc-desk">${movie.description}</p>

            <p class="text-danger">${ageLimit()}</p>

            <div class="d-flex align-items-center group-button">
              <a href="#" class="text-white" data-bs-toggle="modal" data-bs-target="#infoMovie">Chi tiết nội dung</a>
              <button class="btn-yellow" data-bs-toggle="modal" data-bs-target="#trailMovie">Xem trailer</button>
            </div>
          </div>
        </div>`
    banner.innerHTML = html;

    document.querySelector("#trailMovieContent").innerHTML = `<iframe width="560" height="315" src="${movie.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`

    document.querySelector("#infoMovieContent").innerText = movie.description;
}

function renderCalendar() {
    let schedule = document.querySelector(".schedule");
    let getDate = (date, type) => {
        let res = new Date(date);
        if (type === "day") {
            return res.getDate();
        }else if (type === "month") {
            return res.getMonth() + 1;
        }else if (type === "thu") {
            let day = res.getDay();
            let days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
            return days[day];
        }
    }

    schedule.innerHTML = movie.schedule.reduce((temp, item) => {
        return temp + `
    <div class="schedule d-flex justify-content-center pointer-event" onclick="loadTime('${item.date}', this)">
      <div class="d-flex flex-column justify-content-center align-items-center date">
        <span>Th. ${getDate(item.date, "month")}</span>
        <span class="date-bold">${getDate(item.date, "day")}</span>
        <span>${getDate(item.date, "thu")}</span>
      </div>
    </div>`;
    }, "");

    document.querySelector(".date").classList.toggle("choose-date");
    loadTime(movie.schedule[0].date, document.querySelector(".schedule"));
}

function loadTime(date, el) {
    document.querySelectorAll('.date').forEach(item => {
        item.classList.remove('choose-date');
    });

    el.querySelector('.date').classList.add('choose-date');

    let timeEl = document.querySelector(".time");
    let time = movie.schedule.find(item => item.date === date)
    indexDate = movie.schedule.findIndex(item => item.date === date);
    timeEl.innerHTML = time.sessions.reduce((temp, item) => {
        return temp + `<button class="btn-time" onclick="loadSession(${movie.schedule.findIndex(item => item.date === date)}, '${item.time}')">${item.time}</button>`;
    }, "")
}

function loadSession(indexDate, time) {
    countDown();
    maxSeat = 0;
    indexTime = movie.schedule[indexDate].sessions.findIndex(item => item.time === time);

    document.querySelector(".group-time").querySelector("span").innerText = `Giờ chiếu: ${time}`;
    document.querySelector("#room").innerText = `Phòng chiếu số ${movie.schedule[indexDate].sessions[indexTime].room}`;


    let seatEl = document.querySelector(".seat-select");
    let room = movie.schedule[indexDate].sessions[indexTime].room;
    let seat = rooms.find(item => item.id === room).seat;

    // console.log(Object.values(seat))
    Object.values(seat).forEach(row => {
        let count = Object.keys(row).length;
        // console.log(count)
        if (count > maxSeat) {
            maxSeat = count;
        }
    });
    // console.log(maxSeat)

    updateGrid();

    let html = "";

    Object.keys(seat).forEach(rowName => {
        html += `<div class="seat-repo">${rowName}</div>`;

        Object.keys(seat[rowName]).forEach(seatNum => {
            let seatClass = seat[rowName][seatNum];
            let isBooked = false;
            let session = movie.schedule[indexDate].sessions[indexTime];
            if (Array.isArray(session.seatBooked)) {
                let bookedRow = session.seatBooked.find(item => item.row === rowName);
                if (bookedRow && bookedRow.seats.includes(Number(seatNum))) {
                    isBooked = true;
                }
            } else {
                let bookedSeats = session.seatBooked?.[rowName]?.seats;
                if (bookedSeats && bookedSeats.includes(Number(seatNum))) {
                    isBooked = true;
                }
            }

            if (isBooked) {
                seatClass = "seat-booked";
            }

            let label = seatClass === "seat-booked" ? "X" : `${rowName}${seatNum}`;
            html += `<button class="seat ${seatClass} ${seatClass === "seat-booked" ? "pointer-lock" : ""}" onclick="chooseSeat(this, '${seatClass}')">${label}</button> `;
        });

        html += `<div class="seat-repo">${rowName}</div>`;
    });

    seatEl.innerHTML = html;
    toggleSeat();
}

function pressBack() {
    cartEl.innerHTML = "Ghế đã chọn: ";
    priceEl.innerText = "Tổng tiền: 0đ";
    clearInterval(timeoutID);
    toggleSeat();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function chooseSeat(el, type,) {
    if (type === "seat-booked") return;
    let getRoom = seatList.find(item => item.hasOwnProperty("room"))
    getRoom.room = movie.schedule[indexDate].sessions[indexTime].room;

    let label = el.innerText;
    let row = label[0];
    let number = parseInt(label.slice(1));

    if (type === "seat-pair") {
        let isEven = number % 2 === 0;
        let pairNum = isEven ? number - 1 : number + 1;
        let pairLabel = `${row}${pairNum}`;

        let pairEl = Array.from(document.querySelectorAll(".seat")).find(seat => seat.innerText === pairLabel);

        if (!pairEl || pairEl.classList.contains("seat-booked")) return;

        let alreadySelected = el.classList.contains("seat-selected");

        [el, pairEl].forEach(seat => {
            seat.classList.toggle("seat-selected", !alreadySelected);
            seat.classList.toggle("seat-pair", alreadySelected);
        });

        if (alreadySelected) {
            seatList = seatList.filter(item => item.name !== label && item.name !== pairLabel);
        } else {
            seatList.push({name: label, type: type});
            seatList.push({name: pairLabel, type: type});
        }
    } else {
        el.classList.toggle("seat-selected");
        if (el.classList.contains("seat-selected")) {
            el.classList.remove(type);
            seatList.push({name: label, type: type});
        } else {
            el.classList.add(type);
            seatList = seatList.filter(item => item.name !== label);
        }
    }

    renderCart();
}


function renderCart() {

    let price = {
        "seat-normal": 55000,
        "seat-vip": 65000,
        "seat-pair": 70000
    };

    let html = "Ghế đã chọn: ";
    // let totalPrice = 0;
    html += seatList.map(s => s.name).join(", ").slice(1)

    let totalPrice = seatList.reduce((temp, seat) => {
        if (!seat.hasOwnProperty("movieId")) {
            return temp + price[seat.type];
        }
        return temp;
    }, 0);

    cartEl.innerHTML = html;
    priceEl.innerText = "Tổng tiền: "+ `${totalPrice.toLocaleString("vi-VN")}đ`;

    sessionStorage.setItem("cart", JSON.stringify(seatList));
    sessionStorage.setItem("totalPrice", totalPrice);

    if (seatList.length > 1) {
        if (document.querySelector("#payment").classList.contains("none")) {
            document.querySelector("#payment").classList.toggle("none");
        }
    }else {
        document.querySelector("#payment").classList.toggle("none");
    }
}


function countDown() {
    let countEl = document.querySelector(".btn-choose-sit");
    let timeLeft = 600;

    timeoutID = setInterval(() => {
        timeLeft--;
        countEl.innerHTML = `<span class="md-disable">Thời gian chọn ghế:</span> ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timeoutID);
            location.reload();
        }
    }, 1000);
}



window.addEventListener("resize", () => {
    renderMovie()
    updateGrid()
})

renderMovie()
renderCalendar()