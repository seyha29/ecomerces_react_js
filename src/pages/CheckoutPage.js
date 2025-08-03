import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MapPin, CreditCard, Lock, Smartphone, Wallet, AlertCircle, CheckCircle, Printer, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const CheckoutPage = ({ cartItems, getTotalPrice, getTotalItems, setCartItems, setCurrentPage, completeCheckout }) => {
  console.log('Cart Items in CheckoutPage:', cartItems); // Debug log

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
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // Added for download loading state
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const receiptRef = useRef(null);

  // Use environment variables for sensitive data
  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || 'AWsyGAZZPMqqF6FixB3lgD0ryEbJaYOA1vCHNlMrdOHnX_fjRMXnMFGEyNm459Ey9-LaQmHGqkBQeZTO';
  const PAYPAL_CLIENT_SECRET = process.env.REACT_APP_PAYPAL_CLIENT_SECRET || 'EJEMHXcrnZ4m6S5Stl--7vCNoqMrD0kvSIFXXaB0rNtSRXdBU_-i6MAcWvP7zCiUJoYenErwNUrJYi0i';
  const storeName = process.env.REACT_APP_STORE_NAME || 'MODERNSTORE STORE'; // Configurable store name

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (!window.paypal && !document.querySelector('#paypal-sdk')) {
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.onload = () => setPaypalLoaded(true);
      document.head.appendChild(script);
    } else if (window.paypal) {
      setPaypalLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (paypalLoaded && paymentMethod === 'paypal' && window.paypal) {
      const paypalButtonContainer = document.getElementById('paypal-button-container');
      if (paypalButtonContainer && !paypalButtonContainer.hasChildNodes()) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              if (!validateShippingInfo()) {
                alert('Please fill in shipping information first.');
                return;
              }
              return actions.order.create({
                purchase_units: [
                  {
                    reference_id: 'default',
                    amount: {
                      currency_code: 'USD',
                      value: total.toFixed(2),
                      breakdown: {
                        item_total: { currency_code: 'USD', value: subtotal.toFixed(2) },
                        shipping: { currency_code: 'USD', value: shipping.toFixed(2) },
                        tax_total: { currency_code: 'USD', value: tax.toFixed(2) },
                      },
                    },
                    items: cartItems.map((item) => ({
                      name: item.name,
                      unit_amount: { currency_code: 'USD', value: item.price.toFixed(2) },
                      quantity: item.quantity.toString(),
                    })),
                    shipping: {
                      name: { full_name: `${formData.firstName} ${formData.lastName}` },
                      address: {
                        address_line_1: formData.address,
                        admin_area_2: formData.city,
                        postal_code: formData.zipCode,
                        country_code: 'US',
                      },
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              setIsProcessing(true);
              try {
                const order = await actions.order.capture();
                handlePayPalSuccess(order);
              } catch (error) {
                handlePayPalError(error);
              } finally {
                setIsProcessing(false);
              }
            },
            onError: (err) => {
              handlePayPalError(err);
            },
            onCancel: () => {
              setPaymentStatus({ type: 'warning', message: 'Payment was cancelled.' });
            },
          })
          .render('#paypal-button-container');
      }
    }
  }, [paypalLoaded, paymentMethod, formData, total, cartItems]);

  const validateShippingInfo = () => {
    return formData.firstName && formData.lastName && formData.email && formData.address && formData.city && formData.zipCode;
  };

  const handlePayPalSuccess = (order) => {
    const capture = order.purchase_units[0]?.payments?.captures?.[0];
    if (capture) {
      if (capture.status === 'COMPLETED') {
        setTransactionDetails({
          orderId: order.id,
          captureId: capture.id,
          amount: capture.amount.value,
          currency: capture.amount.currency_code,
          paypalFee: capture.seller_receivable_breakdown?.paypal_fee?.value || '0.00',
          netAmount: capture.seller_receivable_breakdown?.net_amount?.value || capture.amount.value,
          paymentMethod: 'PayPal',
          date: new Date().toLocaleString(),
        });
        setPaymentStatus({
          type: 'success',
          message: `Payment successful! Transaction ID: ${capture.id}`,
        });
        setShowReceipt(true);
      } else if (capture.status === 'DECLINED') {
        setPaymentStatus({
          type: 'error',
          message: `Payment was declined. Reason: ${capture.processor_response?.response_code || 'Unknown'}`,
          details: { orderId: order.id, status: capture.status, responseCode: capture.processor_response?.response_code },
        });
      } else {
        setPaymentStatus({
          type: 'warning',
          message: `Payment status: ${capture.status}. Please check your PayPal account.`,
          details: { orderId: order.id, status: capture.status },
        });
      }
    } else {
      setPaymentStatus({ type: 'error', message: 'Payment processing failed. No capture information received.' });
    }
  };

  const handlePayPalError = (error) => {
    console.error('PayPal Error:', error);
    setPaymentStatus({
      type: 'error',
      message: 'Payment processing failed. Please try again or use a different payment method.',
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentStatus(null);
    if (method !== 'paypal') {
      const paypalContainer = document.getElementById('paypal-button-container');
      if (paypalContainer) paypalContainer.innerHTML = '';
    }
  };

  const handleSubmit = () => {
    if (!validateShippingInfo()) {
      alert('Please fill in all required shipping fields.');
      return;
    }
    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      alert('Please fill in all required payment fields.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setTransactionDetails({
        orderId: `CC-${Date.now()}`,
        amount: total.toFixed(2),
        currency: 'USD',
        paymentMethod: 'Credit/Debit Card',
        date: new Date().toLocaleString(),
        cardLastFour: formData.cardNumber.slice(-4),
      });
      setPaymentStatus({
        type: 'success',
        message: 'Order placed successfully with credit/debit card! Thank you for your purchase.',
      });
      setShowReceipt(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDigitalPayment = (method) => {
    if (!validateShippingInfo()) {
      alert('Please fill in shipping information first.');
      return;
    }
    setIsProcessing(true);
    let message = '';
    switch (method) {
      case 'applepay':
        message = 'Processing Apple Pay...';
        break;
      case 'googlepay':
        message = 'Processing Google Pay...';
        break;
      default:
        break;
    }
    setPaymentStatus({ type: 'info', message });
    setTimeout(() => {
      setTransactionDetails({
        orderId: `${method.toUpperCase()}-${Date.now()}`,
        amount: total.toFixed(2),
        currency: 'USD',
        paymentMethod: method === 'applepay' ? 'Apple Pay' : 'Google Pay',
        date: new Date().toLocaleString(),
      });
      setPaymentStatus({
        type: 'success',
        message: `Payment confirmed with ${method}! Order placed successfully.`,
      });
      setShowReceipt(true);
      setIsProcessing(false);
    }, 3000);
  };

  const generatePDF = () => {
    setIsDownloading(true);
    const element = document.createElement('div');
    element.innerHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${transactionDetails.orderId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
          }
          .company-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2563eb;
          }
          .receipt-title {
            font-size: 20px;
            color: #666;
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
          }
          .success-message {
            background-color: #f0f9ff;
            border: 1px solid #bfdbfe;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .items-table th,
          .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          .items-table th {
            background-color: #f8fafc;
            font-weight: bold;
            color: #374151;
          }
          .items-table tr:hover {
            background-color: #f9fafb;
          }
          .totals-section {
            border-top: 2px solid #eee;
            padding-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .total-row.final {
            font-size: 18px;
            font-weight: bold;
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
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">${storeName}</div>
          <div class="receipt-title">Order Receipt</div>
        </div>
        <div class="success-message">
          <strong>✓ Payment Successful</strong><br>
          Thank you for your purchase!
        </div>
        <div class="info-section">
          <div class="info-block">
            <h3>Shipping Information</h3>
            <p>
              ${formData.firstName} ${formData.lastName}<br>
              ${formData.email}<br>
              ${formData.address}<br>
              ${formData.city}, ${formData.zipCode}<br>
              United States
            </p>
          </div>
          <div class="info-block">
            <h3>Payment Details</h3>
            <p>
              <strong>Order ID:</strong> ${transactionDetails.orderId}<br>
              <strong>Date:</strong> ${transactionDetails.date}<br>
              <strong>Payment Method:</strong> ${transactionDetails.paymentMethod}<br>
              ${transactionDetails.cardLastFour ? `<strong>Card Ending:</strong> ****${transactionDetails.cardLastFour}<br>` : ''}
              ${transactionDetails.captureId ? `<strong>Transaction ID:</strong> ${transactionDetails.captureId}<br>` : ''}
              <strong>Amount:</strong> $${transactionDetails.amount} ${transactionDetails.currency}<br>
              ${transactionDetails.paypalFee ? `<strong>PayPal Fee:</strong> $${transactionDetails.paypalFee}<br>` : ''}
              ${transactionDetails.netAmount ? `<strong>Net Amount:</strong> $${transactionDetails.netAmount}<br>` : ''}
            </p>
          </div>
        </div>
        <h3>Order Summary</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
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
            <span>Subtotal (${getTotalItems()} items):</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div class="total-row">
            <span>Tax:</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="total-row final">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
        <div class="footer">
          <p>Thank you for shopping with us!</p>
          <p>For questions about your order, please contact customer service.</p>
        </div>
      </body>
      </html>
    `;

    const opt = {
      margin: 1,
      filename: `Receipt_${transactionDetails.orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
      setIsDownloading(false);
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${transactionDetails.orderId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
          }
          .company-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2563eb;
          }
          .receipt-title {
            font-size: 20px;
            color: #666;
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
          }
          .success-message {
            background-color: #f0f9ff;
            border: 1px solid #bfdbfe;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .items-table th,
          .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          .items-table th {
            background-color: #f8fafc;
            font-weight: bold;
            color: #374151;
          }
          .items-table tr:hover {
            background-color: #f9fafb;
          }
          .totals-section {
            border-top: 2px solid #eee;
            padding-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .total-row.final {
            font-size: 18px;
            font-weight: bold;
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
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">${storeName}</div>
          <div class="receipt-title">Order Receipt</div>
        </div>
        <div class="success-message">
          <strong>✓ Payment Successful</strong><br>
          Thank you for your purchase!
        </div>
        <div class="info-section">
          <div class="info-block">
            <h3>Shipping Information</h3>
            <p>
              ${formData.firstName} ${formData.lastName}<br>
              ${formData.email}<br>
              ${formData.address}<br>
              ${formData.city}, ${formData.zipCode}<br>
              United States
            </p>
          </div>
          <div class="info-block">
            <h3>Payment Details</h3>
            <p>
              <strong>Order ID:</strong> ${transactionDetails.orderId}<br>
              <strong>Date:</strong> ${transactionDetails.date}<br>
              <strong>Payment Method:</strong> ${transactionDetails.paymentMethod}<br>
              ${transactionDetails.cardLastFour ? `<strong>Card Ending:</strong> ****${transactionDetails.cardLastFour}<br>` : ''}
              ${transactionDetails.captureId ? `<strong>Transaction ID:</strong> ${transactionDetails.captureId}<br>` : ''}
              <strong>Amount:</strong> $${transactionDetails.amount} ${transactionDetails.currency}<br>
              ${transactionDetails.paypalFee ? `<strong>PayPal Fee:</strong> $${transactionDetails.paypalFee}<br>` : ''}
              ${transactionDetails.netAmount ? `<strong>Net Amount:</strong> $${transactionDetails.netAmount}<br>` : ''}
            </p>
          </div>
        </div>
        <h3>Order Summary</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
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
            <span>Subtotal (${getTotalItems()} items):</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div class="total-row">
            <span>Tax:</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="total-row final">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
        <div class="footer">
          <p>Thank you for shopping with us!</p>
          <p>For questions about your order, please contact customer service.</p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  const Receipt = () => {
    const handleDownload = () => {
      generatePDF();
    };

    const handleClose = () => {
      console.log('Closing receipt, cartItems before completeCheckout:', cartItems); // Debug log
      setShowReceipt(false);
      completeCheckout();
    };

    console.log('Cart Items in Receipt:', cartItems); // Debug log

    const renderReceiptContent = () => (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Receipt</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Payment Successful
          </h3>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Shipping Information</h4>
            <p className="text-sm text-gray-600">
              {formData.firstName} {formData.lastName}
              <br />
              {formData.email}
              <br />
              {formData.address}
              <br />
              {formData.city}, {formData.zipCode}
              <br />
              United States
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Payment Details</h4>
            <p className="text-sm text-gray-600">
              Order ID: {transactionDetails.orderId}
              <br />
              Date: {transactionDetails.date}
              <br />
              Payment Method: {transactionDetails.paymentMethod}
              <br />
              {transactionDetails.cardLastFour && `Card Ending: ****${transactionDetails.cardLastFour}`}
              <br />
              {transactionDetails.captureId && `Transaction ID: ${transactionDetails.captureId}`}
              <br />
              Amount: ${transactionDetails.amount} {transactionDetails.currency}
              <br />
              {transactionDetails.paypalFee && `PayPal Fee: $${transactionDetails.paypalFee}`}
              <br />
              {transactionDetails.netAmount && `Net Amount: $${transactionDetails.netAmount}`}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Order Summary</h4>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({getTotalItems()} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'text-green-600' : ''}>
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
          <div className="space-y-3 max-h-64 overflow-y-auto order-summary">
            {renderReceiptContent()}
          </div>
          <div className="mt-6 flex justify-between">
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print Receipt
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </button>
            </div>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add some products before checking out</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="btn-primary"
          >
            Continue Shopping
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
            {status.details && (
              <div className="mt-2 text-sm opacity-75">
                {status.details.orderId && <p>Order ID: {status.details.orderId}</p>}
                {status.details.captureId && <p>Transaction ID: {status.details.captureId}</p>}
                {status.details.amount && (
                  <p>
                    Amount: ${status.details.amount} {status.details.currency}
                  </p>
                )}
                {status.details.netAmount && <p>Net Amount: ${status.details.netAmount}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  PaymentStatusAlert.propTypes = {
    status: PropTypes.shape({
      type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
      message: PropTypes.string.isRequired,
      details: PropTypes.shape({
        orderId: PropTypes.string,
        captureId: PropTypes.string,
        amount: PropTypes.string,
        currency: PropTypes.string,
        netAmount: PropTypes.string,
        status: PropTypes.string,
        responseCode: PropTypes.string,
      }),
    }),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <PaymentStatusAlert status={paymentStatus} />
      {showReceipt && <Receipt />}
      {!showReceipt && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-field"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-field"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="col-span-2 input-field"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  className="col-span-2 input-field"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input-field"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  className="input-field"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Payment Method
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
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                  <div className="ml-8 mt-2 flex space-x-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      MC
                    </div>
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      AMEX
                    </div>
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
                    <span className="font-medium">PayPal</span>
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
                    <span className="font-medium">Apple Pay</span>
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
                    <span className="font-medium">Google Pay</span>
                  </div>
                </div>
              </div>
              {paymentMethod === 'card' && (
                <div className="space-y-4 border-t pt-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number (1234 5678 9012 3456)"
                    className="w-full input-field"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className="input-field"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      className="input-field"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="cardholderName"
                    placeholder="Cardholder Name"
                    className="w-full input-field"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              {paymentMethod === 'paypal' && (
                <div className="border-t pt-4">
                  {!paypalLoaded ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading PayPal...</p>
                    </div>
                  ) : (
                    <div id="paypal-button-container"></div>
                  )}
                </div>
              )}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Order Review</h3>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Free' : `${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
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
                >
                  {isProcessing ? 'Processing...' : `Place Order - ${total.toFixed(2)}`}
                </button>
              )}
              {paymentMethod === 'applepay' && (
                <button
                  type="button"
                  onClick={() => handleDigitalPayment('applepay')}
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isProcessing ? 'Processing...' : `Pay with Apple Pay - ${total.toFixed(2)}`}
                </button>
              )}
              {paymentMethod === 'googlepay' && (
                <button
                  type="button"
                  onClick={() => handleDigitalPayment('googlepay')}
                  disabled={isProcessing}
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isProcessing ? 'Processing...' : `Pay with Google Pay - ${total.toFixed(2)}`}
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('cart')}
              className="w-full mt-3 btn-secondary"
            >
              Return to Cart
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