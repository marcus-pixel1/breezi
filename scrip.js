// Prevent zooming
window.addEventListener("wheel", (e) => {
  const isPinching = e.ctrlKey;
  if (isPinching) e.preventDefault();
}, { passive: false });

// Prevent touch zoom
document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) { 
    event.preventDefault(); 
  }
}, { passive: false });

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add to cart button animation
const addToCartButtons = document.querySelectorAll('button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Prevent default to avoid page reload
    e.preventDefault();
    
    // Get the button text
    const originalText = this.innerHTML;
    
    // Change the text temporarily
    this.innerHTML = '<i data-lucide="check" class="w-5 h-5 mr-2"></i><span>Added to Cart</span>';
    lucide.createIcons();
    
    // Change the background color temporarily
    this.classList.remove('bg-black', 'hover:bg-gray-800');
    this.classList.add('bg-green-600', 'hover:bg-green-700');
    
    // Reset after 2 seconds
    setTimeout(() => {
      this.innerHTML = originalText;
      lucide.createIcons();
      this.classList.remove('bg-green-600', 'hover:bg-green-700');
      this.classList.add('bg-black', 'hover:bg-gray-800');
    }, 2000);
  });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('section > div');
const fadeOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, fadeOptions);

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(element);
});
