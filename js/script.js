const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

    header.classList.toggle("scrolled",window.scrollY>40);

});

const toggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav-menu");
const overlay=document.querySelector(".menu-overlay");

function closeMenu(){

    toggle.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

}

function openMenu(){

    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");

}

toggle.addEventListener("click",openMenu);

overlay.addEventListener("click",closeMenu);

document.querySelectorAll(".nav-menu a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});




/* =====================================================
   ACCORDION TRATAMENTOS
===================================================== */


const treatmentItems = document.querySelectorAll(".treatment-item");


document
.querySelector(".treatment-item")
.classList.add("active");

treatmentItems.forEach(item=>{


    const button = item.querySelector(".treatment-header");


    button.addEventListener("click",()=>{


        const isActive = item.classList.contains("active");



        // fecha todos

        treatmentItems.forEach(element=>{

            element.classList.remove("active");

        });



        // abre somente se estava fechado

        if(!isActive){

            item.classList.add("active");

        }


    });


});


/* =====================================================
   CASES DE SUCESSO
===================================================== */

const results = [

    {

        before: "img/marcela_hero2.JPG",

        after: "img/marcela_hero.JPG",

        category: "Alopecia Androgenética",

        title: "Recuperação da densidade capilar após 6 meses de tratamento",

        description: "Após um diagnóstico detalhado, foi desenvolvido um protocolo individualizado utilizando terapias combinadas para estimular o crescimento capilar e controlar a progressão da alopecia."

    },

    {

        before: "img/results/caso02-before.jpg",

        after: "img/results/caso02-after.jpg",

        category: "Queda Capilar",

        title: "Tratamento personalizado para queda intensa",

        description: "A combinação de terapias estimulou o fortalecimento dos fios e reduziu significativamente a queda."

    },

    {

        before: "img/results/caso03-before.jpg",

        after: "img/results/caso03-after.jpg",

        category: "Dermatite Seborreica",

        title: "Controle da inflamação do couro cabeludo",

        description: "O protocolo reduziu a descamação, vermelhidão e desconforto, proporcionando melhora clínica progressiva."

    },

    {

        before: "img/results/caso04-before.jpg",

        after: "img/results/caso04-after.jpg",

        category: "Microagulhamento",

        title: "Estímulo do crescimento capilar",

        description: "Sessões seriadas associadas a tratamentos específicos promoveram melhora da densidade capilar."

    }

];

/* =====================================================
   RESULTADOS
===================================================== */

const resultCases = [
    {
        before: "img/marcela_hero.JPG",
        after: "img/marcela_hero2.JPG",
        category: "Alopecia Androgenética",
        title: "Recuperação da densidade capilar após 6 meses",
        description: "Após uma avaliação completa, foi desenvolvido um protocolo individualizado visando estimular o crescimento capilar e controlar a progressão da alopecia."
    },

    {
        before: "img/results/caso02-before.jpg",
        after: "img/results/caso02-after.jpg",
        category: "Queda Capilar",
        title: "Redução significativa da queda dos fios",
        description: "Com protocolos personalizados e acompanhamento médico, foi possível reduzir a queda e estimular novos fios."
    },

    {
        before: "img/results/caso03-before.jpg",
        after: "img/results/caso03-after.jpg",
        category: "Dermatite Seborreica",
        title: "Controle da inflamação do couro cabeludo",
        description: "Após o tratamento, houve redução da descamação, da oleosidade e melhora significativa do couro cabeludo."
    },

    {
        before: "img/results/caso04-before.jpg",
        after: "img/results/caso04-after.jpg",
        category: "Microagulhamento",
        title: "Estímulo do crescimento capilar",
        description: "Sessões de microagulhamento associadas a terapias medicamentosas favoreceram o fortalecimento e crescimento dos fios."
    }
];

const beforeImage = document.getElementById("before-image");
const afterImage = document.getElementById("after-image");

const resultCategory = document.getElementById("result-category");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");

const pagination = document.querySelectorAll(".result-pagination button");

const prevButton = document.querySelector(".result-arrow.prev");
const nextButton = document.querySelector(".result-arrow.next");

const resultCard = document.querySelector(".results-card");

let currentCase = 0;
let autoplay;


/* ===============================
   Atualiza conteúdo
================================ */

function updateResult(index){

    const item = resultCases[index];

    resultCard.classList.remove("fade");

    void resultCard.offsetWidth;

    resultCard.classList.add("fade");

    beforeImage.src = item.before;
    afterImage.src = item.after;

    resultCategory.textContent = item.category;
    resultTitle.textContent = item.title;
    resultDescription.textContent = item.description;

    pagination.forEach(dot => dot.classList.remove("active"));

    pagination[index].classList.add("active");

}


/* ===============================
   Próximo
================================ */

function nextCase(){

    currentCase++;

    if(currentCase >= resultCases.length){

        currentCase = 0;

    }

    updateResult(currentCase);

}


/* ===============================
   Anterior
================================ */

function prevCase(){

    currentCase--;

    if(currentCase < 0){

        currentCase = resultCases.length - 1;

    }

    updateResult(currentCase);

}


/* ===============================
   AutoPlay
================================ */

function startAutoplay(){

    clearInterval(autoplay);

    autoplay = setInterval(() => {

        nextCase();

    },7000);

}


/* ===============================
   Eventos
================================ */

nextButton.addEventListener("click",()=>{

    nextCase();

    startAutoplay();

});


prevButton.addEventListener("click",()=>{

    prevCase();

    startAutoplay();

});


pagination.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentCase = index;

        updateResult(index);

        startAutoplay();

    });

});


/* ===============================
   Pausa quando mouse estiver em cima
================================ */

resultCard.addEventListener("mouseenter",()=>{

    clearInterval(autoplay);

});

resultCard.addEventListener("mouseleave",()=>{

    startAutoplay();

});


/* ===============================
   Inicialização
================================ */

updateResult(0);

startAutoplay();




/* =====================================================
   DEPOIMENTOS
===================================================== */

const testimonials = [

    {

        text: "Desde a primeira consulta me senti acolhida. O tratamento foi conduzido com muito cuidado e hoje minha autoestima voltou junto com meus cabelos.",

        name: "Ana Paula S.",

        location: "Londrina • PR"

    },

    {

        text: "Profissional extremamente atenciosa. Explicou todas as etapas do tratamento e acompanhou minha evolução durante todo o processo.",

        name: "Mariana F.",

        location: "Arapongas • PR"

    },

    {

        text: "Depois de anos sofrendo com queda capilar finalmente encontrei um tratamento que realmente trouxe resultados. Recomendo de olhos fechados.",

        name: "Patrícia M.",

        location: "Cambé • PR"

    },

    {

        text: "Além do excelente atendimento, toda a equipe transmite muita confiança. Hoje me sinto muito mais segura e feliz com meus cabelos.",

        name: "Juliana R.",

        location: "Rolândia • PR"

    }

];



const testimonialText = document.getElementById("testimonial-text");
const testimonialName = document.getElementById("testimonial-name");
const testimonialLocation = document.getElementById("testimonial-location");

const testimonialCard = document.querySelector(".testimonial-card");

const testimonialPrev = document.querySelector(".testimonial-arrow.prev");
const testimonialNext = document.querySelector(".testimonial-arrow.next");

const testimonialDots = document.querySelectorAll(".testimonial-pagination button");

let currentTestimonial = 0;

let testimonialInterval;



/*==================================
Atualiza conteúdo
==================================*/

function updateTestimonial(index){

    testimonialCard.classList.remove("fade");

    void testimonialCard.offsetWidth;

    testimonialCard.classList.add("fade");


    testimonialText.textContent = testimonials[index].text;

    testimonialName.textContent = testimonials[index].name;

    testimonialLocation.textContent = testimonials[index].location;


    testimonialDots.forEach(dot=>dot.classList.remove("active"));

    testimonialDots[index].classList.add("active");

}



/*==================================
Próximo
==================================*/

function nextTestimonial(){

    currentTestimonial++;

    if(currentTestimonial >= testimonials.length){

        currentTestimonial = 0;

    }

    updateTestimonial(currentTestimonial);

}



/*==================================
Anterior
==================================*/

function prevTestimonial(){

    currentTestimonial--;

    if(currentTestimonial < 0){

        currentTestimonial = testimonials.length - 1;

    }

    updateTestimonial(currentTestimonial);

}



/*==================================
AutoPlay
==================================*/

function startTestimonials(){

    clearInterval(testimonialInterval);

    testimonialInterval = setInterval(()=>{

        nextTestimonial();

    },7000);

}



/*==================================
Eventos
==================================*/

testimonialNext.addEventListener("click",()=>{

    nextTestimonial();

    startTestimonials();

});


testimonialPrev.addEventListener("click",()=>{

    prevTestimonial();

    startTestimonials();

});



testimonialDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentTestimonial = index;

        updateTestimonial(index);

        startTestimonials();

    });

});



/*==================================
Pausa no Hover
==================================*/

testimonialCard.addEventListener("mouseenter",()=>{

    clearInterval(testimonialInterval);

});


testimonialCard.addEventListener("mouseleave",()=>{

    startTestimonials();

});



/*==================================
Touch (Mobile)
==================================*/

let touchStartX = 0;

testimonialCard.addEventListener("touchstart",(e)=>{

    touchStartX = e.changedTouches[0].screenX;

});


testimonialCard.addEventListener("touchend",(e)=>{

    let touchEndX = e.changedTouches[0].screenX;

    let distance = touchStartX - touchEndX;

    if(distance > 50){

        nextTestimonial();

        startTestimonials();

    }

    if(distance < -50){

        prevTestimonial();

        startTestimonials();

    }

});



/*==================================
Inicialização
==================================*/

updateTestimonial(0);

startTestimonials();