let arrFestival = JSON.parse(localStorage.getItem('festivals'));

function Rander() {
    let html = '';
    let div = document.querySelector('.listContent');

    arrFestival.forEach(value => {
        html += `
            <div class="cursor bodyConten" onclick="location.href='../pages/FestivalDetails.html?id=${value.id}'">
                <h5 class="title1">${value.title}</h5>
                <div class="d-flex gap-4">
                    <div class="avata"><img src="${value.img[0]}" alt=""></div>
                    <div class="content">
                        <div class="d-flex align-content-center justify-content-between">
                            <h5 class="title2">${value.title}</h5>
                            <span class="date">${value.time} ${value.date}</span>
                        </div>
                        <p class="text-limit">${value.description}</p>
                    </div>
                </div>
            </div>
            `
    });
    div.innerHTML = html;
}

Rander();
