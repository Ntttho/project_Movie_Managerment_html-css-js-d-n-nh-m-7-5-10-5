const swiper1 = new Swiper('.swiper-box1',{
    loop: true,
    spaceBetween: 14,
    effect: 'coverflow',
    coverflowEffect:{
        depth: 200,
        rotate: 0,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints :{
        0:{
            slidesPerView: 1.5,
        },
        390:{
            slidesPerView: 2.75,
        }
    },
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    }
    
})
const swiper2 = new Swiper('.swiper-box2',{
    loop: true,
    spaceBetween: 14,
    // effect: 'coverflow',
    // coverflowEffect:{
    //     depth: 400,
    //     rotate: 0,
    // },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints :{
        0:{
            slidesPerView: 1.5,
        },
        390:{
            slidesPerView: 2.5,
        }
    },
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    }
    
})
const swiper3 = new Swiper('.swiper-box3',{
    loop: true,
    spaceBetween: 14,
    // effect: 'coverflow',
    // coverflowEffect:{
    //     depth: 400,
    //     rotate: 0,
    // },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints :{
        0:{
            slidesPerView: 2,
        },
        390:{
            slidesPerView: 3,
        }
    },
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    }
    
})
const swiper4 = new Swiper('.boxImg',{
    loop: true,
    spaceBetween: 1,
    // effect: 'coverflow',
    // coverflowEffect:{
    //     depth: 400,
    //     rotate: 0,
    // },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView :1,
    // autoplay:{
    //     delay: 3000,
    //     disableOnInteraction: false,
    // }
    
})
