import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const initialSign = "add";
const initialResult = { result: "" };
const appBoxSX = { m: 1, display: "flex" };
const resultTextFieldInputProps = { readOnly: true };

function App() {
  const [sign, setSign] = React.useState(initialSign);
  const [result, setResult] = React.useState(initialResult);
  const formRef = React.useRef(null);

  const handleChangeSign = (event) => {
    setSign(event.target.value);
    resetResult();
  };

  const resetResult = () => {
    setResult(initialResult);
  };

  const handleClick = async () => {
    const { current: form } = formRef;
    if (form === null) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const request = await fetch("/evaluate", fetchOptions);
    if (request.status === 200) {
      const response = await request.json();
      setResult(response);
    } else {
      resetResult();
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={appBoxSX} ref={formRef}>
      <TextField
        type="number"
        variant="outlined"
        label="left"
        id="left"
        name="left"
        onChange={resetResult}
      />
      <Select
        value={sign}
        label="Sign"
        name="sign"
        onChange={handleChangeSign}
      >
        <MenuItem value={"add"}>+</MenuItem>
        <MenuItem value={"sub"}>-</MenuItem>
        <MenuItem value={"mul"}>*</MenuItem>
        <MenuItem value={"div"}>/</MenuItem>
      </Select>
      <TextField
        type="number"
        variant="outlined"
        label="right"
        id="right"
        name="right"
        onChange={resetResult}
      />
      <Button variant="outlined" size="large" onClick={handleClick}>=</Button>
      <TextField
        variant="outlined"
        InputProps={resultTextFieldInputProps}
        value={result.result}
      />
    </Box>
  );
}

export default App;
