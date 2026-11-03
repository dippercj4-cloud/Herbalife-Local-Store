document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('mainNav');
  const yearNode = document.getElementById('currentYear');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
      const isOpen = mainNav.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  const quoteCountNodes = document.querySelectorAll('[data-quote-count]');
  quoteCountNodes.forEach((node) => {
    node.textContent = window.QuoteStore ? window.QuoteStore.getQuoteCount() : 0;
    node.hidden = (window.QuoteStore ? window.QuoteStore.getQuoteCount() : 0) === 0;
  });

  renderHomeFeaturedProducts();
  setupToast();
});

function renderHomeFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredGrid');
  if (!featuredGrid || !window.PRODUCT_CATALOG) {
    return;
  }

  const featured = [
    ...window.PRODUCT_CATALOG.filter((product) => product.category === 'personal').slice(0, 2),
    ...window.PRODUCT_CATALOG.filter((product) => product.category === 'nutrition').slice(0, 2)
  ];
  featuredGrid.innerHTML = featured
    .map(
      (product) => `
        <article class="product-card">
          <div class="card-media">
            <img src="${product.image || 'assets/img/products/placeholder-product.svg'}" alt="${product.imageType === 'illustration' ? `Ilustración vectorial de ${product.name}` : product.image ? `Imagen de referencia de ${product.name}` : `Placeholder de imagen pendiente para ${product.name}`}" loading="lazy" decoding="async" />
          </div>
          <div class="card-content">
            <div class="card-meta">
              <span class="category-pill">${window.PRODUCT_CATEGORIES[product.category].name}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="card-footer">
              <span class="presentation">Información por confirmar</span>
              <button class="secondary-btn add-to-quote" type="button" data-product-id="${product.id}">Agregar a cotización</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  bindAddToQuoteButtons();
}

function bindAddToQuoteButtons() {
  document.querySelectorAll('.add-to-quote').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.currentTarget.getAttribute('data-product-id');
      if (!productId) {
        return;
      }

      const product = window.PRODUCT_CATALOG.find((entry) => entry.id === productId);
      window.QuoteStore.addToQuote(productId);
      showToast(`${product ? product.name : 'Producto'} agregado a Mi cotización`);
      updateQuoteCountBadges();
    });
  });
}

function updateQuoteCountBadges() {
  const count = window.QuoteStore ? window.QuoteStore.getQuoteCount() : 0;
  document.querySelectorAll('[data-quote-count]').forEach((node) => {
    node.textContent = count;
    node.hidden = count === 0;
  });
}

function setupToast() {
  if (!document.getElementById('toast')) {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
  }, 1800);
}
