const slidesData = [
    { img: 'https://picsum.photos/id/1016/900/600', title: 'Wild Canyons', desc: 'Discover Arizona\'s mysterious nature.' },
    { img: 'https://picsum.photos/id/1040/900/600', title: 'Blue Castle', desc: 'A structure straight out of fairy tales in Germany.' },
    { img: 'https://picsum.photos/id/1036/900/600', title: 'Winter Dream', desc: 'The snow-covered peaks of the Alps.' },
    { img: 'https://picsum.photos/id/1043/900/600', title: 'Reflection of Peace', desc: 'Nature\'s reunion with peace.' },
    { img: 'https://picsum.photos/id/1018/900/600', title: 'Silent Nature', desc: 'Flowers that come to life with the arrival of spring.' },
  ];
  
  const wrapper = document.getElementById('slides-wrapper');
  const dotsContainer = document.getElementById('dots');
  const progressBar = document.getElementById('progress');
  const slider = document.getElementById('slider');
  
  let currentSlide = 0;
  let slideInterval;
  let progressTimeout; 
  const intervalTime = 5000; 
  
  slidesData.forEach((data, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
    slideDiv.innerHTML = `
      <img src="${data.img}" alt="${data.title}">
      <div class="info-box">
        <h2>${data.title}</h2>
        <p>${data.desc}</p>
      </div>
    `;
    wrapper.appendChild(slideDiv);
  
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      changeSlide(index);
      resetTimer();
    });
    dotsContainer.appendChild(dot);
  });
  

  function changeSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
  
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
  
    currentSlide = index;
  
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    changeSlide((currentSlide + 1) % slidesData.length);
  }
  
  function prevSlide() {
    changeSlide((currentSlide - 1 + slidesData.length) % slidesData.length);
  }
  startTimer();

  function startTimer() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
  
    progressTimeout = setTimeout(() => {
      progressBar.style.transition = `width ${intervalTime}ms linear`;
      progressBar.style.width = '100%';
    }, 50);
  
    slideInterval = setInterval(() => {
      nextSlide();
      
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      
      clearTimeout(progressTimeout);
      progressTimeout = setTimeout(() => {
        progressBar.style.transition = `width ${intervalTime}ms linear`;
        progressBar.style.width = '100%';
      }, 50);
  
    }, intervalTime);
  }
  
  function stopTimer() {
    clearInterval(slideInterval);
    clearTimeout(progressTimeout);
    progressBar.style.transition = 'width 0.2s ease';
    progressBar.style.width = '0%';
  }
  
  function resetTimer() {
    stopTimer();
    startTimer();
  }
  

  document.getElementById('next').addEventListener('click', () => { nextSlide(); resetTimer(); });
  document.getElementById('prev').addEventListener('click', () => { prevSlide(); resetTimer(); });
  
  