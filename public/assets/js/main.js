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
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.newsletter-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.group');
        const form = card.querySelector('.newsletter-form');
        const arrow = this.querySelector('.arrow-icon');
        
        // Alternar estado
        form.classList.toggle('active');
        arrow.classList.toggle('active');
      });
    });
    
    // Parar animação após 15 segundos se não houver interação
    setTimeout(() => {
      const arrows = document.querySelectorAll('.arrow-icon:not(.active)');
      arrows.forEach(arrow => {
        arrow.style.animation = 'none';
      });
    }, 15000);
  });