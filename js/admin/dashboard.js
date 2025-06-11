let movies = localStorage.getItem("movies");
let news = localStorage.getItem("news");
let promotion = localStorage.getItem("promotions");
let festival = localStorage.getItem("festivals");
let rooms = localStorage.getItem("rooms");

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#movie-total").innerText = movies ? JSON.parse(movies).length : 0;
    document.querySelector("#new-total").innerText = news ? JSON.parse(news).length : 0;
    document.querySelector("#promotion-total").innerText = promotion ? JSON.parse(promotion).length : 0;
    document.querySelector("#festival-total").innerText = festival ? JSON.parse(festival).length : 0;
    document.querySelector("#room-total").innerText = festival ? JSON.parse(rooms).length : 0;
})

