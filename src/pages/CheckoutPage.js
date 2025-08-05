import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MapPin, CreditCard, Lock, Smartphone, Wallet, AlertCircle, CheckCircle, Printer, Download, X } from 'lucide-react';

const CheckoutPage = ({ cartItems, getTotalPrice, getTotalItems, setCartItems, setCurrentPage, completeCheckout }) => {
  const { t, i18n } = useTranslation();
  console.log('Cart Items in CheckoutPage:', cartItems);
  console.log('i18n ready:', i18n.isInitialized);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [jsPDFLoaded, setJsPDFLoaded] = useState(false);
  const receiptRef = useRef(null);

  const storeName = t('checkout.storeName', 'MODERNSTORE STORE');

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Load jsPDF
  useEffect(() => {
    const loadJsPDF = async () => {
      try {
        if (!window.jspdf) {
          const cdnUrls = [
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
            'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js',
          ];

          for (const url of cdnUrls) {
            try {
              await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
              });
              break;
            } catch (error) {
              console.warn(`Failed to load jsPDF from ${url}`);
            }
          }

          if (!window.jspdf) {
            throw new Error('All jsPDF sources failed to load');
          }
        }

        setJsPDFLoaded(true);
      } catch (error) {
        console.error('Error loading jsPDF:', error);
        setJsPDFLoaded(false);
      }
    };

    loadJsPDF();
  }, []);

  const validateShippingInfo = () => {
    return formData.firstName && formData.lastName && formData.email && formData.address && formData.city && formData.zipCode;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentStatus(null);
  };

  const safeT = (key, fallback, options = {}) => {
    try {
      const translated = t(key, options);
      if (translated === key || !translated || translated.includes('{{')) {
        return fallback;
      }
      return translated;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback;
    }
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');

    if (!validateShippingInfo()) {
      alert(safeT('checkout.errors.required', 'Please fill in all required fields'));
      return;
    }

    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      alert(safeT('checkout.errors.required', 'Please fill in all required fields'));
      return;
    }

    if (cartItems.length === 0) {
      alert(safeT('checkout.emptyCart', 'Your cart is empty'));
      return;
    }

    setIsProcessing(true);
    setPaymentStatus({ type: 'info', message: safeT('notification.checkout_success', 'Processing payment...') });

    setTimeout(() => {
      const orderId = 'CC-' + Date.now();
      setTransactionDetails({
        orderId: orderId,
        amount: total.toFixed(2),
        currency: 'USD',
        paymentMethod: safeT('checkout.paymentMethods.card', 'Credit Card'),
        date: new Date().toLocaleString(),
        cardLastFour: formData.cardNumber.slice(-4),
      });
      setPaymentStatus({
        type: 'success',
        message: safeT('notification.checkout_success', 'Payment successful!'),
      });
      setShowReceipt(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDigitalPayment = (method) => {
    console.log(`${method} button clicked`);

    if (!validateShippingInfo()) {
      alert(safeT('checkout.errors.required', 'Please fill in all required fields'));
      return;
    }

    setIsProcessing(true);
    let message = safeT('notification.checkout_success', 'Processing payment...');
    let paymentMethodLabel = '';
    switch (method) {
      case 'applepay':
        paymentMethodLabel = safeT('checkout.paymentMethods.applepay', 'Apple Pay');
        break;
      case 'googlepay':
        paymentMethodLabel = safeT('checkout.paymentMethods.googlepay', 'Google Pay');
        break;
      case 'paypal':
        paymentMethodLabel = safeT('checkout.paymentMethods.paypal', 'PayPal');
        break;
      default:
        break;
    }
    setPaymentStatus({ type: 'info', message });

    setTimeout(() => {
      const orderId = method.toUpperCase() + '-' + Date.now();
      setTransactionDetails({
        orderId: orderId,
        amount: total.toFixed(2),
        currency: 'USD',
        paymentMethod: paymentMethodLabel,
        date: new Date().toLocaleString(),
      });
      setPaymentStatus({
        type: 'success',
        message: safeT('notification.checkout_success', 'Payment successful!'),
      });
      setShowReceipt(true);
      setIsProcessing(false);
    }, 3000);
  };

  const generateDirectPDF = async () => {
    if (!jsPDFLoaded || !window.jspdf) {
      alert(safeT('checkout.errors.jsPDFLoad', 'PDF generation library not loaded. Please try again or use Print to PDF.'));
      generatePrintablePDF();
      return;
    }

    setIsDownloading(true);

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Use standard fonts that work reliably in jsPDF
      doc.setFont('helvetica', 'normal');

      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      let y = margin;

      const checkNewPage = (additionalHeight = 20) => {
        if (y + additionalHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
          return true;
        }
        return false;
      };

      // Header
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(storeName, pageWidth / 2, y, { align: 'center' });
      y += 15;

      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(safeT('checkout.receiptTitle', 'Receipt'), pageWidth / 2, y, { align: 'center' });
      y += 25;

      // Success message box
      doc.setFillColor(240, 249, 255);
      doc.setDrawColor(191, 219, 254);
      doc.rect(margin, y - 8, pageWidth - 2 * margin, 20, 'FD');
      doc.setFontSize(14);
      doc.setTextColor(34, 197, 94);

      const successText = safeT('notification.checkout_success', 'Payment Successful!');
      const textWidth = doc.getTextWidth(successText);
      const centerX = pageWidth / 2;

      // Success checkmark and text
      doc.text('✓', centerX - (textWidth / 2) - 8, y + 5);
      doc.text(successText, centerX, y + 5, { align: 'center' });

      doc.setTextColor(0, 0, 0);
      y += 30;

      // Two column layout for shipping and payment info
      const leftColX = margin;
      const rightColX = pageWidth / 2 + 10;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(safeT('checkout.shippingInfo', 'Shipping Information'), leftColX, y);
      doc.text(safeT('checkout.paymentMethod', 'Payment Details'), rightColX, y);
      y += 15;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      // Shipping info (left column)
      let leftY = y;
      doc.text(`${formData.firstName} ${formData.lastName}`, leftColX, leftY);
      leftY += 8;
      doc.text(formData.email, leftColX, leftY);
      leftY += 8;
      doc.text(formData.address, leftColX, leftY);
      leftY += 8;
      doc.text(`${formData.city}, ${formData.zipCode}`, leftColX, leftY);
      leftY += 8;
      doc.text('Cambodia', leftColX, leftY);

      // Payment info (right column)
      let rightY = y;
      doc.text(`${safeT('checkout.orderId', 'Order ID')}: ${transactionDetails.orderId}`, rightColX, rightY);
      rightY += 8;
      doc.text(`${safeT('checkout.date', 'Date')}: ${transactionDetails.date}`, rightColX, rightY);
      rightY += 8;
      doc.text(`${safeT('checkout.paymentMethodLabel', 'Payment Method')}: ${transactionDetails.paymentMethod}`, rightColX, rightY);
      rightY += 8;
      if (transactionDetails.cardLastFour) {
        doc.text(`${safeT('checkout.cardEnding', 'Card ending')}: ****${transactionDetails.cardLastFour}`, rightColX, rightY);
        rightY += 8;
      }
      doc.text(`${safeT('checkout.amount', 'Amount')}: $${transactionDetails.amount} ${transactionDetails.currency}`, rightColX, rightY);

      y = Math.max(leftY, rightY) + 25;
      checkNewPage(40);

      // Order Summary Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(safeT('checkout.orderSummary', 'Order Summary'), margin, y);
      y += 20;

      // Table headers
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(safeT('products.card.namePlaceholder', 'Product'), margin, y);
      doc.text(safeT('products.card.quantity', 'Qty'), margin + 110, y);
      doc.text(safeT('checkout.price', 'Price'), margin + 140, y);
      doc.text(safeT('checkout.total', 'Total'), margin + 175, y);
      y += 5;

      // Header underline
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 15;

      // Cart items
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      cartItems.forEach((item, index) => {
        checkNewPage(15);

        // Truncate long product names
        const maxItemNameLength = 30;
        const itemName = item.name.length > maxItemNameLength
          ? item.name.substring(0, maxItemNameLength) + '...'
          : item.name;

        doc.text(itemName, margin, y);
        doc.text(item.quantity.toString(), margin + 110, y);
        doc.text(`$${item.price.toFixed(2)}`, margin + 140, y);
        doc.text(`$${(item.price * item.quantity).toFixed(2)}`, margin + 175, y);
        y += 12;

        // Add separator line between items
        if (index < cartItems.length - 1) {
          doc.setDrawColor(240, 240, 240);
          doc.line(margin, y - 2, pageWidth - margin, y - 2);
        }
      });

      y += 15;
      checkNewPage(60);

      // Totals section
      doc.setDrawColor(150, 150, 150);
      doc.line(margin + 100, y - 5, pageWidth - margin, y - 5);
      y += 10;

      const totalsX = pageWidth - margin - 80;
      const labelsX = totalsX - 60;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      const itemsText = getTotalItems() === 1 
        ? safeT('checkout.items.singular', 'item') 
        : safeT('checkout.items.plural', 'items');
      
      doc.text(`${safeT('checkout.subtotal', 'Subtotal')} (${getTotalItems()} ${itemsText}):`, labelsX, y);
      doc.text(`$${subtotal.toFixed(2)}`, totalsX, y);
      y += 15;

      doc.text(safeT('checkout.shipping', 'Shipping'), labelsX, y);
      doc.text(shipping === 0 ? safeT('checkout.freeShipping', 'FREE') : `$${shipping.toFixed(2)}`, totalsX, y);
      y += 15;

      doc.text(safeT('checkout.tax', 'Tax'), labelsX, y);
      doc.text(`$${tax.toFixed(2)}`, totalsX, y);
      y += 15;

      // Total line
      doc.setDrawColor(100, 100, 100);
      doc.line(labelsX, y - 5, totalsX + 30, y - 5);
      y += 5;

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(safeT('checkout.total', 'Total'), labelsX, y);
      doc.text(`$${total.toFixed(2)}`, totalsX, y);

      y += 40;
      checkNewPage(30);

      // Footer
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(safeT('footer.bottom.copyright', '© 2025 ModernStore. All rights reserved.'), pageWidth / 2, y, { align: 'center' });
      y += 15;
      doc.setFontSize(10);
      doc.text(safeT('checkout.thankYou', 'Thank you for your business!'), pageWidth / 2, y, { align: 'center' });

      // Generate filename and save
      const filename = `receipt-${transactionDetails.orderId}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(safeT('checkout.errors.pdfGeneration', 'Error generating PDF. Please try again or use Print to PDF.'));
      // Fallback to printable PDF
      generatePrintablePDF();
    } finally {
      setIsDownloading(false);
    }
  };

  const generatePrintablePDF = () => {
    setIsDownloading(true);

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const itemsText = getTotalItems() === 1 
      ? safeT('checkout.items.singular', 'item') 
      : safeT('checkout.items.plural', 'items');
      
    const receiptHTML = `
      <!DOCTYPE html>
      <html lang="km">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${safeT('checkout.receiptTitle', 'Receipt')} - ${transactionDetails.orderId}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Noto Sans Khmer', 'Inter', Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
            background: white;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
          }
          
          .company-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #2563eb;
            font-family: 'Inter', sans-serif;
          }
          
          .receipt-title {
            font-size: 20px;
            color: #666;
            font-weight: 500;
          }
          
          .success-message {
            background-color: #f0f9ff;
            border: 1px solid #bfdbfe;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
            color: #22c55e;
            font-weight: 600;
          }
          
          .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            gap: 40px;
          }
          
          .info-block {
            flex: 1;
          }
          
          .info-block h3 {
            margin-bottom: 10px;
            color: #2563eb;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            font-weight: 600;
            font-size: 16px;
          }
          
          .info-block p {
            font-size: 14px;
            line-height: 1.5;
          }
          
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 14px;
          }
          
          .items-table th,
          .items-table td {
            padding: 12px 8px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          
          .items-table th {
            background-color: #f8fafc;
            font-weight: 600;
            color: #374151;
          }
          
          .items-table td:last-child,
          .items-table th:last-child {
            text-align: right;
          }
          
          .totals-section {
            border-top: 2px solid #eee;
            padding-top: 20px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .total-row.final {
            font-size: 18px;
            font-weight: 700;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            margin-top: 10px;
          }
          
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          
          .download-instruction {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            color: #92400e;
            font-weight: 500;
          }
          
          @media print {
            .download-instruction { 
              display: none; 
            }
            body { 
              margin: 0;
              font-size: 12px;
            }
            .header {
              margin-bottom: 20px;
              padding-bottom: 15px;
            }
            .company-name {
              font-size: 24px;
            }
            .receipt-title {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body>
        <div class="download-instruction">
          <strong>📥 ${safeT('checkout.downloadInstructions', 'To download as PDF')}:</strong> 
          ${i18n.language === 'km' ? 'ចុច Ctrl+P (ឬ Cmd+P នៅលើ Mac) បន្ទាប់មកជ្រើសរើស "Save as PDF"' : 'Press Ctrl+P (or Cmd+P on Mac), then select "Save as PDF" as your destination.'}
        </div>
        
        <div class="header">
          <div class="company-name">${storeName}</div>
          <div class="receipt-title">${safeT('checkout.receiptTitle', 'Receipt')}</div>
        </div>
        
        <div class="success-message">
          <strong>✓ ${safeT('notification.checkout_success', 'Payment Successful!')}</strong><br>
          ${safeT('checkout.thankYou', 'Thank you for your business!')}
        </div>
        
        <div class="info-section">
          <div class="info-block">
            <h3>${safeT('checkout.shippingInfo', 'Shipping Information')}</h3>
            <p>
              ${formData.firstName} ${formData.lastName}<br>
              ${formData.email}<br>
              ${formData.address}<br>
              ${formData.city}, ${formData.zipCode}<br>
              Cambodia
            </p>
          </div>
          <div class="info-block">
            <h3>${safeT('checkout.paymentMethod', 'Payment Details')}</h3>
            <p>
              <strong>${safeT('checkout.orderId', 'Order ID')}:</strong> ${transactionDetails.orderId}<br>
              <strong>${safeT('checkout.date', 'Date')}:</strong> ${transactionDetails.date}<br>
              <strong>${safeT('checkout.paymentMethodLabel', 'Payment Method')}:</strong> ${transactionDetails.paymentMethod}<br>
              ${transactionDetails.cardLastFour ? `<strong>${safeT('checkout.cardEnding', 'Card ending')}:</strong> ****${transactionDetails.cardLastFour}<br>` : ''}
              <strong>${safeT('checkout.amount', 'Amount')}:</strong> $${transactionDetails.amount} ${transactionDetails.currency}
            </p>
          </div>
        </div>
        
        <h3 style="margin-bottom: 15px; color: #2563eb;">${safeT('checkout.orderSummary', 'Order Summary')}</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>${safeT('products.card.namePlaceholder', 'Product')}</th>
              <th>${safeT('products.card.quantity', 'Quantity')}</th>
              <th>${safeT('checkout.price', 'Price')}</th>
              <th>${safeT('checkout.total', 'Total')}</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="totals-section">
          <div class="total-row">
            <span>${safeT('checkout.subtotal', 'Subtotal')} (${getTotalItems()} ${itemsText}):</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>${safeT('checkout.shipping', 'Shipping')}:</span>
            <span style="${shipping === 0 ? 'color: #22c55e; font-weight: 600;' : ''}">${shipping === 0 ? safeT('checkout.freeShipping', 'FREE') : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div class="total-row">
            <span>${safeT('checkout.tax', 'Tax')}:</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="total-row final">
            <span>${safeT('checkout.total', 'Total')}:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>${safeT('checkout.thankYou', 'Thank you for your business!')}</p>
          <p style="margin-top: 10px;">${safeT('footer.bottom.copyright', '© 2025 ModernStore. All rights reserved.')}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Wait for fonts to load before triggering print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      setIsDownloading(false);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const Receipt = () => {
    const handleDirectDownload = () => {
      console.log('jsPDFLoaded:', jsPDFLoaded, 'window.jspdf:', !!window.jspdf);
      generateDirectPDF();
    };

    const handlePrintDownload = () => {
      generatePrintablePDF();
    };

    const handleClose = () => {
      console.log('Closing receipt, cartItems before completeCheckout:', cartItems);
      setShowReceipt(false);
      completeCheckout();
    };

    const renderReceiptContent = () => (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{safeT('checkout.receiptTitle', 'Receipt')}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label={safeT('checkout.close', 'Close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            {safeT('notification.checkout_success', 'Payment Successful!')}
          </h3>
          <p className="text-gray-600">{safeT('checkout.thankYou', 'Thank you for your business!')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">{safeT('checkout.shippingInfo', 'Shipping Information')}</h4>
            <p className="text-sm text-gray-600">
              {formData.firstName} {formData.lastName}
              <br />
              {formData.email}
              <br />
              {formData.address}
              <br />
              {formData.city}, {formData.zipCode}
              <br />
              Cambodia
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{safeT('checkout.paymentMethod', 'Payment Details')}</h4>
            <p className="text-sm text-gray-600">
              {safeT('checkout.orderId', 'Order ID')}: {transactionDetails.orderId}
              <br />
              {safeT('checkout.date', 'Date')}: {transactionDetails.date}
              <br />
              {safeT('checkout.paymentMethodLabel', 'Payment Method')}: {transactionDetails.paymentMethod}
              <br />
              {transactionDetails.cardLastFour && `${safeT('checkout.cardEnding', 'Card ending')}: ****${transactionDetails.cardLastFour}`}
              <br />
              {safeT('checkout.amount', 'Amount')}: ${transactionDetails.amount} ${transactionDetails.currency}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">{safeT('checkout.orderSummary', 'Order Summary')}</h4>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">{safeT('products.card.quantity', 'Quantity')}: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>{safeT('checkout.subtotal', 'Subtotal')} ({getTotalItems()} {getTotalItems() === 1 ? safeT('checkout.items.singular', 'item') : safeT('checkout.items.plural', 'items')})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{safeT('checkout.shipping', 'Shipping')}</span>
            <span className={shipping === 0 ? 'text-green-600' : ''}>
              {shipping === 0 ? safeT('checkout.freeShipping', 'FREE') : `${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{safeT('checkout.tax', 'Tax')}</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>{safeT('checkout.total', 'Total')}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
          {renderReceiptContent()}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                aria-label={safeT('checkout.print', 'Print')}
              >
                <Printer className="w-5 h-5 mr-2" />
                {safeT('checkout.print', 'Print')}
              </button>
              <button
                onClick={handleDirectDownload}
                disabled={isDownloading}
                className={`flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 ${
                  isDownloading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label={safeT('checkout.downloadPDF', 'Download PDF')}
              >
                <Download className="w-5 h-5 mr-2" />
                {isDownloading ? safeT('products.card.addingToCart', 'Loading...') : safeT('checkout.downloadPDF', 'Download PDF')}
              </button>
              <button
                onClick={handlePrintDownload}
                disabled={isDownloading}
                className="flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                aria-label={safeT('checkout.printToPDF', 'Print to PDF')}
              >
                <Printer className="w-4 h-4 mr-1" />
                {safeT('checkout.printToPDF', 'Print to PDF')}
              </button>
            </div>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              aria-label={safeT('checkout.close', 'Close')}
            >
              {safeT('checkout.close', 'Close')}
            </button>
          </div>
          {!jsPDFLoaded && (
            <div className="mt-2 text-xs text-gray-500 text-center">
              {safeT('products.card.addingToCart', 'Loading PDF library...')}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-600 mb-4">{safeT('checkout.emptyCart', 'Your cart is empty')}</h1>
          <p className="text-gray-500 mb-6">{safeT('products.empty.description', 'Add some products to get started')}</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            aria-label={safeT('checkout.shopNow', 'Shop Now')}
          >
            {safeT('checkout.shopNow', 'Shop Now')}
          </button>
        </div>
      </div>
    );
  }

  const PaymentStatusAlert = ({ status }) => {
    if (!status) return null;

    const getStatusStyles = () => {
      switch (status.type) {
        case 'success':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'error':
          return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        default:
          return 'bg-blue-50 border-blue-200 text-blue-800';
      }
    };

    const getIcon = () => {
      switch (status.type) {
        case 'success':
          return <CheckCircle className="w-5 h-5" />;
        case 'error':
        case 'warning':
          return <AlertCircle className="w-5 h-5" />;
        default:
          return <AlertCircle className="w-5 h-5" />;
      }
    };

    return (
      <div className={`border rounded-lg p-4 mb-4 ${getStatusStyles()}`}>
        <div className="flex items-start">
          {getIcon()}
          <div className="ml-3 flex-1">
            <p className="font-medium">{status.message}</p>
          </div>
        </div>
      </div>
    );
  };

  PaymentStatusAlert.propTypes = {
    status: PropTypes.shape({
      type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
      message: PropTypes.string.isRequired,
    }),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{safeT('checkout.title', 'Checkout')}</h1>
      <PaymentStatusAlert status={paymentStatus} />
      {showReceipt && <Receipt />}
      {!showReceipt && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {safeT('checkout.shippingInfo', 'Shipping Information')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder={safeT('checkout.placeholders.firstName', 'First Name')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder={safeT('checkout.placeholders.lastName', 'Last Name')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={safeT('checkout.placeholders.email', 'Email Address')}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder={safeT('checkout.placeholders.address', 'Street Address')}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder={safeT('checkout.placeholders.city', 'City')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder={safeT('checkout.placeholders.zipCode', 'Zip Code')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                {safeT('checkout.paymentMethod', 'Payment Method')}
              </h3>
              <div className="space-y-3 mb-6">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => handlePaymentMethodChange('card')}
                      className="mr-3"
                    />
                    <CreditCard className="w-5 h-5 mr-2" />
                    <span className="font-medium">{safeT('checkout.paymentMethods.card', 'Credit Card')}</span>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('paypal')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handlePaymentMethodChange('paypal')}
                      className="mr-3"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="font-medium">{safeT('checkout.paymentMethods.paypal', 'PayPal')}</span>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'applepay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('applepay')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="applepay"
                      checked={paymentMethod === 'applepay'}
                      onChange={() => handlePaymentMethodChange('applepay')}
                      className="mr-3"
                    />
                    <Smartphone className="w-5 h-5 mr-2" />
                    <span className="font-medium">{safeT('checkout.paymentMethods.applepay', 'Apple Pay')}</span>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'googlepay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('googlepay')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="googlepay"
                      checked={paymentMethod === 'googlepay'}
                      onChange={() => handlePaymentMethodChange('googlepay')}
                      className="mr-3"
                    />
                    <div className="w-5 h-5 bg-green-600 rounded mr-2 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="font-medium">{safeT('checkout.paymentMethods.googlepay', 'Google Pay')}</span>
                  </div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 border-t pt-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder={safeT('checkout.placeholders.cardNumber', 'Card Number')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder={safeT('checkout.placeholders.expiryDate', 'MM/YY')}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder={safeT('checkout.placeholders.cvv', 'CVV')}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="cardholderName"
                    placeholder={safeT('checkout.placeholders.cardholderName', 'Cardholder Name')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{safeT('checkout.securePayment', 'Your payment information is secure')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-4">{safeT('checkout.orderSummary', 'Order Summary')}</h3>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-gray-500 text-xs">{safeT('products.card.quantity', 'Quantity')}: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>{safeT('checkout.subtotal', 'Subtotal')} ({getTotalItems()} {getTotalItems() === 1 ? safeT('checkout.items.singular', 'item') : safeT('checkout.items.plural', 'items')})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{safeT('checkout.shipping', 'Shipping')}</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? safeT('checkout.freeShipping', 'FREE') : `${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{safeT('checkout.tax', 'Tax')}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>{safeT('checkout.total', 'Total')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {paymentMethod === 'card' && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  aria-label={`${safeT('checkout.paymentMethods.card', 'Credit Card')} - ${total.toFixed(2)}`}
                >
                  {isProcessing ? safeT('products.card.addingToCart', 'Processing...') : `${safeT('checkout.paymentMethods.card', 'Credit Card')} - ${total.toFixed(2)}`}
                </button>
              )}
              {paymentMethod === 'paypal' && (
                <button
                  type="button"
                  onClick={() => handleDigitalPayment('paypal')}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  aria-label={`${safeT('checkout.paymentMethods.paypal', 'PayPal')} - ${total.toFixed(2)}`}
                >
                  {isProcessing ? safeT('products.card.addingToCart', 'Processing...') : `${safeT('checkout.paymentMethods.paypal', 'PayPal')} - ${total.toFixed(2)}`}
                </button>
              )}
              {paymentMethod === 'applepay' && (
                <button
                  type="button"
                  onClick={() => handleDigitalPayment('applepay')}
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  aria-label={`${safeT('checkout.paymentMethods.applepay', 'Apple Pay')} - ${total.toFixed(2)}`}
                >
                  {isProcessing ? safeT('products.card.addingToCart', 'Processing...') : `${safeT('checkout.paymentMethods.applepay', 'Apple Pay')} - ${total.toFixed(2)}`}
                </button>
              )}
              {paymentMethod === 'googlepay' && (
                <button
                  type="button"
                  onClick={() => handleDigitalPayment('googlepay')}
                  disabled={isProcessing}
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  aria-label={`${safeT('checkout.paymentMethods.googlepay', 'Google Pay')} - ${total.toFixed(2)}`}
                >
                  {isProcessing ? safeT('products.card.addingToCart', 'Processing...') : `${safeT('checkout.paymentMethods.googlepay', 'Google Pay')} - ${total.toFixed(2)}`}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage('cart')}
              className="w-full mt-3 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              aria-label={safeT('checkout.backToCart', 'Back to Cart')}
            >
              {safeT('checkout.backToCart', 'Back to Cart')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

CheckoutPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  getTotalPrice: PropTypes.func.isRequired,
  getTotalItems: PropTypes.func.isRequired,
  setCartItems: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  completeCheckout: PropTypes.func.isRequired,
};

export default CheckoutPage;