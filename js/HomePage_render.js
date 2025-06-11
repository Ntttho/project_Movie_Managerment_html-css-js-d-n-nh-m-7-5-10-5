let movies = JSON.parse(localStorage.getItem("movies"))
// let banners = JSON.parse(localStorage.getItem("banners"))
let imgBanner = document.getElementById("imgBanner")
let BoxCardMain1Now = document.getElementById("BoxCard1Main1")
let BoxCard1Main2 = document.getElementById("BoxCard1Main2")
let BoxCardMain1Future = document.getElementById("BoxCard2Main1")
let BoxCard2Main2 = document.getElementById("BoxCard2Main2")

let promotion = JSON.parse(localStorage.getItem("promotions"))
let festivals = JSON.parse(localStorage.getItem("festivals"))

let today = new Date()
let tomorrow = new Date(today)
tomorrow.setDate(today.getDate()+1)

// set banner
banners = new Array()
for(let i = festivals.length-1, x=0; i>festivals.length-5; i--, x++){
    console.log(i);
    banners[x] = {"img": festivals[i].img[0], id: festivals[i].id}
    
}
// banner[5] =  {}


console.log(banners);
// renderBanner
function renderBanner(){
    // su dung reduce de gan cac hinh anh cho anh bia wed

    let showBanner =  banners.reduce((html,banner) => {
        return html += `<div class="cursor swiper-slide imgHead" onclick="location.href='FestivalDetails.html?id=${banner.id}'"><img src="${banner.img}" alt=""></div>`        
    },"")

    console.log(showBanner)
    imgBanner.innerHTML = "" + showBanner
}
renderBanner()


// render phimdangchieu
function renderNowMovie(){
    BoxCardMain1Now.innerHTML = movies.reduce((html,movie) => {
        for(let time of movie.schedule){
            let cmpTime = new Date(time.date)
            if( GetTime(today) == GetTime(cmpTime) ){
                html += `
                    <div class="card cursor" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                        <img src="${movie.image}" alt="">
                        <div class="card-p">
                            <p>${movie.tag.join(", ")}</p>
                            <p>${time.date}</p>
                        </div>
                        <div class="name-movi">${movie.title}</div>
                    </div>
                `
            }
        }
        return html
    },"")
    // BoxCardMain1Now.innerHTML = ""

    BoxCard1Main2.innerHTML = movies.reduce((html,movie) => {
        for(let time of movie.schedule){
            let cmpTime = new Date(time.date)
            if(GetTime(today) == GetTime(cmpTime)){
                // phần này đang còn thiếu dữ liệu mẫu nên để sửa sau
                html += `
                        <div class="cursor Card2 swiper-slide  justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                            <img src="${movie.image}" alt="">
                            <div class="text-center ft-name-movie">${movie.title}</div>
                        </div>
                        `
                        // <div class="Card2 swiper-slide  justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                        //     <img src="${movie.image}" alt="">
                        //     <div class="text-center ft-name-movie">${movie.title}</div>
                        // </div>
                        // <div class="Card2 swiper-slide  justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                        //     <img src="${movie.image}" alt="">
                        //     <div class="text-center ft-name-movie">${movie.title}</div>
                        // </div>
                        // <div class="Card2 swiper-slide  justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                        //     <img src="${movie.image}" alt="">
                        //     <div class="text-center ft-name-movie">${movie.title}</div>
                        // </div>
            }
        }
        return html
    },"")
}
renderNowMovie()

function renderFutureMovie(){
    BoxCardMain1Future.innerHTML = movies.reduce((html, movie)=>{
        for(let time of movie.schedule){
            let cmpTime = new Date(time.date)
            if(GetTime(today) < GetTime(cmpTime)){
                html +=`
                    <div class="cursor card" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                        <img src="${movie.image}" alt="">
                        <div class="card-p">
                            <p>${movie.tag.join(", ")}</p>
                            <p>${time.date}</p>
                        </div>
                        <div class="name-movi">${movie.title}</div>
                    </div>
                `
                break
                
            }
        }
        // console.log(95 + html);
        
        return html
    },"")

    BoxCard2Main2.innerHTML = movies.reduce((html, movie)=>{
        for(let time of movie.schedule){
            let cmpTime = new Date(time.date)
            if(GetTime(today) < GetTime(cmpTime)){
                // phần này đang còn thiếu dữ liệu mẫu nên cần phải sửa sau
                html += `
                <div class="cursor Card2 swiper-slide d-flex flex-column justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                    <img src="${movie.image}" alt="">
                    <div class="text-center ft-name-movie">${movie.title}</div>
                </div>
                
                `
                // <div class="Card2 swiper-slide d-flex flex-column justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                //     <img src="${movie.image}" alt="">
                //     <div class="text-center ft-name-movie">${movie.title}</div>
                // </div>
                // <div class="Card2 swiper-slide d-flex flex-column justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                //     <img src="${movie.image}" alt="">
                //     <div class="text-center ft-name-movie">${movie.title}</div>
                // </div>
                // <div class="Card2 swiper-slide d-flex flex-column justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                //     <img src="${movie.image}" alt="">
                //     <div class="text-center ft-name-movie">${movie.title}</div>
                // </div>
                // <div class="Card2 swiper-slide d-flex flex-column justify-content-evenly align-items-center" onclick="location.href='./movie-detail.html?id=${movie.id}'">
                //     <img src="${movie.image}" alt="">
                //     <div class="text-center ft-name-movie">${movie.title}</div>
                // </div>
            }
        }
        return html
    },"")
}
renderFutureMovie()

function GetTime(date){
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}


function renderPromotion(){
    if(promotion.length < 3)
        document.getElementById("promotion").innerHTML = promotion.reduce((html, element) =>{
            return html += `<img class="cursor" src="${element.img[0]}" alt="" onclick="location.href='./promotionsdetails.html?id=${element.id}'">`
        },"")
    else{
        document.getElementById("promotion").innerHTML = ""
        for(let x = promotion.length - 3; x < promotion.length; x++){
            document.getElementById("promotion").innerHTML += `<img class="cursor" src="${promotion[x].img[0]}" alt="" onclick="location.href='./promotionsdetails.html?id=${promotion[x].id}'">`
        }
    }

    document.getElementById("promotion2").innerHTML = promotion.reduce((html, element) =>{
        return html += `
                        <div class="cursor Card3 swiper-slide" onclick="location.href='./promotionsdetails.html?id=${element.id}'">
                            <img src="${element.img[0]}" alt="">
                            <div class="content">
                                <div class="op-7 p-03 fs-mini">${element.date}</div>
                                <div class="fs-6 p-03">${element.title}</div>
                            </div>
                        </div>
        `
    },"")
}
renderPromotion()

function renderfestivals(){
    if(festivals.length < 3){
        document.getElementById("event").innerHTML = festivals.reduce((html , element) =>{
            return html += `<img class="cursor" src="${element.img[0]}" alt="" onclick="location.href='./FestivalDetails.html?id=${element.id}'">`
        },"")
    } else{
        document.getElementById("event").innerHTML = ""
        for(let i = festivals.length - 3; i < festivals.length; i++){
            document.getElementById("event").innerHTML += `<img class="cursor" src="${festivals[i].img[0]}" alt="" onclick="location.href='./FestivalDetails.html?id=${festivals[i].id}'">`
        }
    }
    document.getElementById("news2").innerHTML = festivals.reduce((html, element) =>{
        return html += `<div class="cursor Card3 swiper-slide" onclick="location.href='FestivalDetails.html?id=${element.id}'">
                            <img src="${element.img[0]}" alt="">
                            <div class="content">
                                <div class="op-7 p-03 fs-mini">${element.date}</div>
                                <div class="fs-6 p-03">${element.title}</div>
                            </div>
                        </div>`
    },"")
}
renderfestivals()