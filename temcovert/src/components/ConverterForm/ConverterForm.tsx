import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Grid } from '@material-ui/core';
import { useConverter } from '../../contexts/ConverterContext';
import { useStyles } from './ConverterForm.styles';

interface ConversionOption {
  label: string;
  value: string;
}

const ConverterForm: React.FC = () => {
  const classes = useStyles();
  const { celsiusToFahrenheit, fahrenheitToCelsius, sqYardToSqFt, sqFtToSqYard, cmToM, mToCm } = useConverter();
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number | null>(null);
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [conversionType, setConversionType] = useState<string>('temperature');

  const temperatureOptions: ConversionOption[] = [
    { label: 'Celsius', value: 'celsius' },
    { label: 'Fahrenheit', value: 'fahrenheit' },
  ];

  const areaOptions: ConversionOption[] = [
    { label: 'Sq Yard', value: 'sqYard' },
    { label: 'Sq Ft', value: 'sqFt' },
  ];

  const lengthOptions: ConversionOption[] = [
    { label: 'M', value: 'm' },
    { label: 'Cm', value: 'cm' },
  ];

  const handleConvert = () => {
    let result = 0;
    switch (conversionType) {
      case 'temperature':
        result = fromUnit === 'celsius' ? celsiusToFahrenheit(inputValue) : fahrenheitToCelsius(inputValue);
        break;
      case 'area':
        result = fromUnit === 'sqYard' ? sqYardToSqFt(inputValue) : sqFtToSqYard(inputValue);
        break;
      case 'length':
        result = fromUnit === 'm' ? mToCm(inputValue) : cmToM(inputValue);
        break;
      default:
        result = inputValue;
        break;
    }
    setOutputValue(result);
  };

  useEffect(() => {
    // Update output value whenever input value, from unit, to unit, or conversion type changes
    handleConvert();
  }, [inputValue, fromUnit, toUnit, conversionType, celsiusToFahrenheit, fahrenheitToCelsius, sqYardToSqFt, sqFtToSqYard, cmToM, mToCm]);

  return (
    <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
        <TextField
          label="Select Type"
          select
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value as string)}
          fullWidth
        >
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="area">Area</MenuItem>
          <MenuItem value="length">Length</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Input Value"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="From"
          select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value as string)}
          fullWidth
        >
          {conversionType === 'temperature' &&
            temperatureOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          {conversionType === 'area' &&
            areaOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          {conversionType === 'length' &&
            lengthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Output Value"
          type="number"
          value={outputValue === null ? '' : outputValue}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="To"
          select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value as string)}
          fullWidth
        >
          {conversionType === 'temperature' &&
            temperatureOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          {conversionType === 'area' &&
            areaOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          {conversionType === 'length' &&
            lengthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      
      
      
    </Grid>
  );
};

export default ConverterForm;
