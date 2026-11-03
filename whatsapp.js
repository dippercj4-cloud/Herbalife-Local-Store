(function () {
  function buildWhatsAppMessage(items) {
    const productList = items
      .map((item) => {
        const product = window.PRODUCT_CATALOG.find((entry) => entry.id === item.id);
        if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) {
          throw new Error('No se pudo preparar la cotización: revisa los productos y cantidades seleccionados.');
        }
        return `${product.name}: ${item.quantity}`;
      })
      .join('\n');

    return `${window.APP_CONFIG.whatsappMessagePrefix}\n\n${productList}`;
  }

  function openWhatsApp(items) {
    if (!items.length) {
      return;
    }

    const message = encodeURIComponent(buildWhatsAppMessage(items));
    const phone = window.APP_CONFIG.whatsappNumber;
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  window.WhatsAppHelper = {
    buildWhatsAppMessage,
    openWhatsApp
  };
})();
