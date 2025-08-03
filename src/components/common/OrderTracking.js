import React from 'react';
import PropTypes from 'prop-types';

const OrderTracking = ({ currentStep }) => {
  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="flex items-center justify-between mt-6">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
              index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </div>
          <span className="mt-2 text-sm">{step}</span>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-full ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

OrderTracking.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default OrderTracking;