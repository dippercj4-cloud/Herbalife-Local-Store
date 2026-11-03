(function () {
  const QUOTE_STORAGE_KEY = 'vitalia_quote_selection';

  function readQuote() {
    try {
      const saved = localStorage.getItem(QUOTE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  }

  function writeQuote(items) {
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
  }

  function findItemIndex(items, productId) {
    return items.findIndex((item) => item.id === productId);
  }

  function addToQuote(productId) {
    const items = readQuote();
    const index = findItemIndex(items, productId);

    if (index >= 0) {
      items[index].quantity += 1;
    } else {
      items.push({ id: productId, quantity: 1 });
    }

    writeQuote(items);
    updateQuoteBadge();
    return items;
  }

  function updateQty(productId, quantity) {
    const items = readQuote();
    const index = findItemIndex(items, productId);

    if (index === -1) {
      return items;
    }

    const nextQty = Math.max(0, quantity);
    if (nextQty === 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = nextQty;
    }

    writeQuote(items);
    updateQuoteBadge();
    return items;
  }

  function removeFromQuote(productId) {
    const items = readQuote().filter((item) => item.id !== productId);
    writeQuote(items);
    updateQuoteBadge();
    return items;
  }

  function clearQuote() {
    writeQuote([]);
    updateQuoteBadge();
    return [];
  }

  function getQuoteItems() {
    return readQuote();
  }

  function getQuoteCount() {
    return readQuote().reduce((acc, item) => acc + item.quantity, 0);
  }

  function updateQuoteBadge() {
    const count = getQuoteCount();
    document.querySelectorAll('[data-quote-count]').forEach((node) => {
      node.textContent = count;
      node.hidden = count === 0;
    });
  }

  window.QuoteStore = {
    addToQuote,
    updateQty,
    removeFromQuote,
    clearQuote,
    getQuoteItems,
    getQuoteCount,
    updateQuoteBadge
  };
})();
