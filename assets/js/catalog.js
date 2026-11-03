document.addEventListener('DOMContentLoaded', () => {
  const catalogSections = document.getElementById('catalogSections');
  if (!catalogSections) {
    return;
  }

  const searchInput = document.getElementById('catalogSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortOrder = document.getElementById('sortOrder');
  const categoryNavigation = document.getElementById('categoryNavigation');
  const placeholderImage = 'assets/img/products/placeholder-product.svg';
  const categoryList = Object.values(window.PRODUCT_CATEGORIES);

  function getFilteredProducts() {
    const term = (searchInput ? searchInput.value : '').trim().toLocaleLowerCase();
    const category = categoryFilter ? categoryFilter.value : 'all';
    const sortValue = sortOrder ? sortOrder.value : 'name-asc';

    return window.PRODUCT_CATALOG
      .filter((product) => {
        const categoryName = window.PRODUCT_CATEGORIES[product.category].name;
        const matchesSearch =
          !term ||
          product.name.toLocaleLowerCase().includes(term) ||
          categoryName.toLocaleLowerCase().includes(term) ||
          product.description.toLocaleLowerCase().includes(term);
        return matchesSearch && (category === 'all' || product.category === category);
      })
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name, 'es');
        return sortValue === 'name-desc' ? -comparison : comparison;
      });
  }

  function renderCatalog() {
    const products = getFilteredProducts();
    const total = window.PRODUCT_CATALOG.length;
    if (categoryNavigation && categoryFilter) {
      categoryNavigation.querySelectorAll('[data-category-nav]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.categoryNav === categoryFilter.value));
      });
    }

    const resultCount = document.getElementById('catalogResultCount');
    if (resultCount) {
      resultCount.textContent = `Mostrando ${products.length} de ${total} productos`;
    }

    if (!products.length) {
      catalogSections.innerHTML = `
        <div class="empty-state">
          <h3>No encontramos productos con esos criterios.</h3>
          <p>Prueba con otra búsqueda o cambia el filtro.</p>
        </div>
      `;
      return;
    }

    catalogSections.innerHTML = categoryList
      .filter((category) => products.some((product) => product.category === category.id))
      .map((category) => {
        const categoryProducts = products.filter((product) => product.category === category.id);
        return `
          <section class="catalog-category" id="category-${category.id}" aria-labelledby="heading-${category.id}">
            <header class="catalog-category-header">
              <div>
                <span class="eyebrow">${category.id === 'personal' ? 'Herbalife SKIN / Herbal Aloe' : 'Catálogo Herbalife'}</span>
                <h2 id="heading-${category.id}">${category.name}</h2>
                <p>${category.description}</p>
              </div>
              <span class="category-count">${categoryProducts.length} de ${category.count} productos</span>
            </header>
            <div class="catalog-grid">
              ${categoryProducts.map((product) => `
                <article class="product-card catalog-card">
                  <div class="card-media">
                    <img src="${product.image || placeholderImage}" alt="${product.imageType === 'illustration' ? `Ilustración vectorial de ${product.name}` : product.image ? `Imagen de referencia de ${product.name}` : `Placeholder de imagen pendiente para ${product.name}`}" loading="lazy" decoding="async" />
                    <span class="image-note">${product.imageType === 'illustration' ? 'Ilustración vectorial' : product.image ? 'Foto de referencia' : 'Imagen pendiente'}</span>
                  </div>
                  <div class="card-content">
                    <div class="card-meta">
                      <span class="category-pill">${category.name}</span>
                    </div>
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="card-footer">
                      <span class="presentation">Información por confirmar</span>
                      <button class="secondary-btn add-to-quote" type="button" data-product-id="${product.id}">Agregar a cotización</button>
                    </div>
                  </div>
                </article>
              `).join('')}
            </div>
          </section>
        `;
      })
      .join('');
  }

  [searchInput, categoryFilter, sortOrder].forEach((control) => {
    if (control) {
      control.addEventListener(control === searchInput ? 'input' : 'change', renderCatalog);
    }
  });

  if (categoryNavigation) {
    categoryNavigation.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category-nav]');
      if (!button) {
        return;
      }

      categoryFilter.value = button.dataset.categoryNav;
      renderCatalog();
      document.getElementById('catalogSections').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  catalogSections.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-quote');
    if (!button) {
      return;
    }

    const product = window.PRODUCT_CATALOG.find((entry) => entry.id === button.dataset.productId);
    if (!product) {
      return;
    }

    window.QuoteStore.addToQuote(product.id);
    showToast(`${product.name} agregado a Mi cotización`);
    updateQuoteCountBadges();
  });

  renderCatalog();
});
