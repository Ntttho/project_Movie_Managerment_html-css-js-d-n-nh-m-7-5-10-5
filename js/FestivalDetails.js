let url = new URLSearchParams(window.location.search);
let id = Number(url.get("id"));
let List = JSON.parse(localStorage.getItem('festivals'));
let festival = List.find(item => item.id === id);

let div = document.querySelector('.main');

let des =  festival.description.replace(/\n/g, "<br>");

div.innerHTML = `
    <h3>${festival.title}</h3>
        ${des}

        <div class="w-100 mt-lg-5 mt-md-4 mt-sm-3 mt-2 mb-lg-5 mb-md-4 mb-sm-3 mb-2"><img src="${festival.img[0]}" alt="" class="w-100"></div>
        <div class="w-100"><img src="${festival.img[1]}" alt="" class="w-100"></div>
`