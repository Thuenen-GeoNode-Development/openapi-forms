import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MultiSelectWidget = ({ id, options, value, required, disabled, readonly, onChange, onBlur, onFocus, placeholder }) => {
    // Convert the value to an array of { label, value } objects
    // const selectedOptions = value.map(val => ({ label: val, value: val }));

    // const handleChange = (selected) => {
    // When the selection changes, we receive an array of objects with 'label' and 'value'
    // We need to convert this back to an array of strings to match the expected format of react-jsonschema-form
    // const newValue = selected ? selected.map(option => option.value) : [];
    // onChange(newValue);
    // };
    const selectedOptions = value.map(val => options.find(option => option.value === val) || { label: val, value: val });

    const handleChange = (selected) => {
        onChange(selected ? selected.map(option => option.value) : []);
    };

    return (
        <Select
            id={id}
            isMulti
            isDisabled={disabled || readonly}
            components={animatedComponents}
            value={selectedOptions}
            options={options}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
};

export default MultiSelectWidget;
