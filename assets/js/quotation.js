document.addEventListener('DOMContentLoaded', () => {
  const quoteList = document.getElementById('quoteItems');
  const quoteSummary = document.getElementById('quoteSummary');

  if (!quoteList) {
    return;
  }

  function renderQuote() {
    const fullItems = window.QuoteStore.getQuoteItems()
      .map((item) => {
        const product = window.PRODUCT_CATALOG.find((entry) => entry.id === item.id);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean);

    if (!fullItems.length) {
      quoteList.innerHTML = `
        <div class="empty-state">
          <h3>Tu cotización está vacía</h3>
          <p>Agrega productos desde el catálogo y regresa aquí para continuar.</p>
          <a class="secondary-btn" href="catalogo.html">Explorar catálogo</a>
        </div>
      `;

      if (quoteSummary) {
        quoteSummary.innerHTML = `
          <h3>Resumen</h3>
          <p>Productos seleccionados: <strong>0</strong></p>
          <p>Los precios se confirman al solicitar la cotización.</p>
          <div class="summary-actions">
            <button class="primary-btn whatsapp-quote-btn" id="sendWhatsappBtn" type="button" disabled>Enviar por WhatsApp</button>
            <button class="outline-btn" id="clearQuoteBtn" type="button" disabled>Vaciar cotización</button>
          </div>
        `;
      }
      return;
    }

    quoteList.innerHTML = fullItems
      .map((entry) => `
        <article class="quote-item">
          <div class="quote-item-info">
            <span class="category-pill">${window.PRODUCT_CATEGORIES[entry.product.category].name}</span>
            <h3>${entry.product.name}</h3>
          </div>
          <div class="quote-controls" aria-label="Cantidad para ${entry.product.name}">
            <button type="button" class="qty-btn" data-action="decrease" data-product-id="${entry.product.id}" aria-label="Reducir cantidad de ${entry.product.name}">−</button>
            <span class="qty-value" aria-live="polite">${entry.quantity}</span>
            <button type="button" class="qty-btn" data-action="increase" data-product-id="${entry.product.id}" aria-label="Aumentar cantidad de ${entry.product.name}">+</button>
            <button type="button" class="text-btn remove-quote-item" data-action="remove" data-product-id="${entry.product.id}">Eliminar</button>
          </div>
        </article>
      `)
      .join('');

    const totalItems = fullItems.reduce((total, item) => total + item.quantity, 0);
    if (quoteSummary) {
      quoteSummary.innerHTML = `
        <h3>Resumen</h3>
        <p>Productos diferentes: <strong>${fullItems.length}</strong></p>
        <p>Unidades seleccionadas: <strong>${totalItems}</strong></p>
        <p>Los precios se confirman al solicitar la cotización.</p>
        <div class="summary-actions">
          <button class="primary-btn whatsapp-quote-btn" id="sendWhatsappBtn" type="button">Enviar por WhatsApp</button>
          <button class="outline-btn" id="clearQuoteBtn" type="button">Vaciar cotización</button>
        </div>
      `;
    }
  }

  quoteList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) {
      return;
    }

    const productId = button.dataset.productId;
    const action = button.dataset.action;
    if (action === 'increase') {
      window.QuoteStore.addToQuote(productId);
    } else if (action === 'decrease') {
      const current = window.QuoteStore.getQuoteItems().find((item) => item.id === productId);
      window.QuoteStore.updateQty(productId, current ? current.quantity - 1 : 0);
    } else if (action === 'remove') {
      window.QuoteStore.removeFromQuote(productId);
    }

    renderQuote();
  });

  if (quoteSummary) {
    quoteSummary.addEventListener('click', (event) => {
      if (event.target.id === 'sendWhatsappBtn' && !event.target.disabled) {
        window.WhatsAppHelper.openWhatsApp(window.QuoteStore.getQuoteItems());
      }
      if (event.target.id === 'clearQuoteBtn' && !event.target.disabled) {
        window.QuoteStore.clearQuote();
        renderQuote();
      }
    });
  }

  renderQuote();
});
