//Hero
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star-entry');
  
  stars.forEach(star => {
    star.addEventListener('animationend', () => {
      star.classList.add('star-animation');
    }, { once: true });
  });
});

//Soluções
  document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute('data-animation');
          const delay = element.getAttribute('data-delay') || 0;
          const colspan = element.getAttribute('data-colspan');

          // Aplica a classe de animação com delay
          setTimeout(() => {
            element.classList.add(`animate-${animation}`);
            element.style.opacity = '1';
            
            // Aplica colspan se existir
            if (colspan) {
              element.classList.add(colspan);
            }
          }, delay);

          // Para de observar o elemento após animar
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observa todos os elementos com a classe js-animate
    document.querySelectorAll('.js-animate').forEach(element => {
      observer.observe(element);
    });
  });

//SWIPER CASE 01
  document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      speed: 800
    });
  });

//NEWSLETTERS
   function toggleNewsletter(card) {
            const form = card.querySelector('.newsletter-form');
            const arrow = card.querySelector('.arrow-icon');
            
            // Alternar estado
            form.classList.toggle('active');
            arrow.classList.toggle('active');
            
            // Parar a animação quando o formulário estiver aberto
            if (form.classList.contains('active')) {
                arrow.style.animation = 'none';
            } else {
                arrow.style.animation = 'ping-slow 1.5s infinite';
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Adiciona evento de clique para fechar ao clicar fora (opcional)
            document.addEventListener('click', function(e) {
                const cards = document.querySelectorAll('[onclick="toggleNewsletter(this)"]');
                cards.forEach(card => {
                    if (!card.contains(e.target)) {
                        const form = card.querySelector('.newsletter-form');
                        const arrow = card.querySelector('.arrow-icon');
                        
                        form.classList.remove('active');
                        arrow.classList.remove('active');
                        arrow.style.animation = 'ping-slow 1.5s infinite';
                    }
                });
            });
        });


//
  // Registrar plugin
  gsap.registerPlugin(ScrollTrigger);

  // Título
  gsap.from("#proposito-title", {
    scrollTrigger: {
      trigger: "#proposito",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Subtítulo
  gsap.from("#proposito-subtitle", {
    scrollTrigger: {
      trigger: "#proposito",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
  });

  // Cards
  gsap.from("#proposito-cards div", {
    scrollTrigger: {
      trigger: "#proposito",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });

  // Transição suave do background da newsletter para a seção de propósito
  gsap.to("#newsletter", {
    scrollTrigger: {
      trigger: "#proposito",
      start: "top bottom",
      end: "top top",
      scrub: true
    },
    backgroundColor: "#FF530D"
  });


//
 const titulo = document.getElementById('proposito-titulo');
  const imagem = document.getElementById('proposito-imagem');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    titulo.style.transform = `translateY(${scrollY * 0.3}px)`;
    imagem.style.transform = `translateY(${scrollY * 0.15}px)`;
  });