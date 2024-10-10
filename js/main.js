const sliderList = document.querySelector('.slider__list');
const paginationList = document.querySelector('.pagination__list');
const sliderItems = sliderList.children;
const paginationItems = [];

let currentPage = 0;
let itemsPerPage = 0;
let largeDotIndex = 0;

function calculateItemsPerPage() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 2;
  }
}

function generatePagination() {
  calculateItemsPerPage();
  const totalPages = Math.ceil(sliderItems.length / itemsPerPage);
  
  // Clear existing pagination items
  paginationList.innerHTML = '';
  paginationItems.length = 0;

  if (window.innerWidth < 850) {
    for (let i = 0; i < totalPages; i++) {
      const paginationItem = document.createElement('li');
      paginationItem.className = 'pagination__item';
      paginationList.appendChild(paginationItem);
      paginationItems.push(paginationItem);
    }
    paginationItems[0].classList.add('active');
    paginationList.style.display = 'flex'; // Show pagination
  } else {
    paginationList.style.display = 'none'; // Hide pagination
  }
}

function updatePagination() {
  if (window.innerWidth >= 850) {
    return; // Do not update pagination if screen width is >= 850px
  }

  paginationItems.forEach((item, index) => {
    item.classList.remove('active', 'large');
    if (index === currentPage) {
      item.classList.add('active');
    }
    if (index === largeDotIndex) {
      item.classList.add('large');
    }
  });
}

function navigateToPage(page) {
  if (window.innerWidth >= 850) {
    return; // Do not navigate if screen width is >= 850px
  }

  currentPage = page;
  largeDotIndex = currentPage - 1;
  if (largeDotIndex < 0) {
    largeDotIndex = 0;
  }
  if (largeDotIndex >= paginationItems.length - 1) {
    largeDotIndex = paginationItems.length - 2;
  }
  updatePagination();
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].style.display = 'none';
    if (i >= startIndex && i < endIndex) {
      sliderItems[i].style.display = 'block';
    }
  }
}

// Initial setup
generatePagination();
updatePagination();

// Event listener for pagination clicks
paginationList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const page = paginationItems.indexOf(e.target);
    navigateToPage(page);
  }
});

// Optional: Add a resize event listener to regenerate pagination on window resize
window.addEventListener('resize', () => {
  generatePagination();
  updatePagination();
});