let movies = JSON.parse(localStorage.getItem("movies"));
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
let totalPrice = Number(sessionStorage.getItem("totalPrice") || 0);

document.addEventListener("DOMContentLoaded",  () => {
    if (!movies || cart.length === 0) return;

    let { movieId, room } = cart[0];
    let movie = movies.find(m => m.id === movieId);
    let selectedSeats = cart.slice(1);
    let seatNames = selectedSeats.map(s => s.name).join(", ");
    console.log(seatNames)
    let seatCount = selectedSeats.length;

    let showTime = ""
    let showDate = "";
    for (let sch of movie.schedule) {
        let session = sch.sessions.find(s => s.room === room);
        if (session) {
            showTime = session.time;
            showDate = new Date(sch.date).toLocaleDateString("vi-VN");
            break;
        }
    }

    document.querySelector("#movie-name").innerText = movie.title;
    document.querySelector("#show-datetime").innerHTML = `<span class="text-orange">${showTime}</span> - ${showDate}`;
    document.querySelector("#seat-names").innerText = seatNames;
    document.querySelector("#format").innerText = movie.format;
    document.querySelector("#room-number").innerText = room;

    document.querySelector("#payment-table-body").innerHTML = `
    <tr>
      <td>Ghế (${seatNames})</td>
      <td>${seatCount}</td>
      <td>${totalPrice.toLocaleString("vi-VN")}đ</td>
    </tr>
  `;

    document.querySelector("#pay-total").innerText = `${totalPrice.toLocaleString("vi-VN")}đ`;
    document.querySelector("#pay-final").innerText = `${totalPrice.toLocaleString("vi-VN")}đ`;
});

document.querySelector("#btn-pay").addEventListener("click", function () {
    let checkLogin = JSON.parse(localStorage.getItem("user"))? true : false;
    if (!checkLogin) {
        checkHide = 1
        ShowHide();
        return;
    }

    if (!movies || cart.length === 0) return;

    let { movieId, room } = cart[0];
    let selectedSeats = cart.slice(1);
    let movie = movies.find(m => m.id === movieId);

    for (let schedule of movie.schedule) {
        for (let session of schedule.sessions) {
            if (session.room === room) {
                if (!Array.isArray(session.seatBooked)) session.seatBooked = [];

                selectedSeats.forEach(seat => {
                    let row = seat.name[0];
                    let number = parseInt(seat.name.slice(1));
                    let rowObj = session.seatBooked.find(item => item.row === row);
                    if (!rowObj) {
                        session.seatBooked.push({ row: row, seats: [number] });
                    } else if (!rowObj.seats.includes(number)) {
                        rowObj.seats.push(number);
                    }
                });
            }
        }
    }

    localStorage.setItem("movies", JSON.stringify(movies));

    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("totalPrice");

    location.href = "./paymentSuccess.html";
});

document.querySelector("#btn-back").addEventListener("click", () => {
    location.href = `./movie-detail.html?id=${cart[0].movieId}`;
})