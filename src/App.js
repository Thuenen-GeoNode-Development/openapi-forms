import React from 'react';
import Form, { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import validator from '@rjsf/validator-ajv8';


const FormWithTheme = withTheme(Bootstrap4Theme);
const schema = {
  title: "My Form",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name"
    },
    lastName: {
      type: "string",
      title: "Last name"
    },
    age: {
      type: "integer",
      title: "Age"
    },
    bio: {
      type: "string",
      title: "Bio"
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3
    }
  }
};

function App() {
  return (
    <div className="App">
      <div className="form-container">
        <FormWithTheme schema={schema} validator={validator} onSubmit={({ formData }) => console.log(formData)} />
      </div>
    </div>
  );
}

export default App;