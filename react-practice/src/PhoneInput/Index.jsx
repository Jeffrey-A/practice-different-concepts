import React, { useState } from 'react';

const PLACEHOLDER = '(555) 555-5555';
const PHONE_LENGTH = 10;
const VALID_INPUT = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

export default function PhoneInput() {
  const [inputValue, setInputValue] = useState('');
  const isSubmitDisabled = cleanInput(inputValue).length < PHONE_LENGTH;
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatInputForDisplay(value);
    isInputValid(value) && setInputValue(formattedValue);
  }

  const handleSubmit = () => {
    setInputValue('');
  }

  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
            onChange={handleInputChange} 
            placeholder={PLACEHOLDER}
            value={inputValue}
        />
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
      </form>
    </>
  );
}

function isInputValid(inputValue) {
  const cleanedInput = cleanInput(inputValue);

  if (cleanedInput.length > PHONE_LENGTH) {
    return false;
  }
  
  for (let i = 0; i < cleanedInput.length; i++) {
    if (!VALID_INPUT[cleanedInput[i]]) {
      return false;
    }
  }
  return true;
}

function cleanInput(input) {
  let result = '';

  for (let i = 0; i < input.length; i++) {
    if (VALID_INPUT[input[i]]) {
      result += input[i];
    }
  }

  return result;
}

function formatInputForDisplay(inputValue, format=PLACEHOLDER) {
  const cleanedInput = cleanInput(inputValue);
  let result = '';

  Array.from(cleanedInput).forEach((value, index) => {
    if (index === 0) {
      result += '(' + value;
    } else if (index === 3) {
      result += ') ' + value;
    } else if (index === 6) {
      result += '-' + value;
    } else {
        result += value;
    }
  });

  return result;
}