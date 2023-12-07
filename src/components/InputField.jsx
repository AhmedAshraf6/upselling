import React from 'react';

export default function InputField({
  placeHolder,
  type,
  name,
  defaultValue,
  handleChange,
  min,
  max,
  minLength,
  maxLength,
  value,
  required,
  labelText,
  autoComplete,
  passwordRef,
}) {
  return (
    <>
      {labelText ? (
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>{labelText}</span>
          </div>
          <input
            placeholder={placeHolder}
            className='input input-bordered input-sm sm:input-md w-full'
            name={name}
            type={type}
            defaultValue={defaultValue}
            onChange={handleChange}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
            value={value}
            required={required}
            autoComplete={autoComplete}
            ref={passwordRef}
          />
        </label>
      ) : (
        <div className='form-control w-full'>
          <input
            placeholder={placeHolder}
            className='input input-bordered input-sm sm:input-md w-full'
            name={name}
            type={type}
            defaultValue={defaultValue}
            onChange={handleChange}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
            value={value}
            required={required}
            autoComplete={autoComplete}
            ref={passwordRef}
          />
        </div>
      )}
    </>
  );
}
