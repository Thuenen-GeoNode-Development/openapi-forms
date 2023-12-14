import React from 'react';
import validator from '@rjsf/validator-ajv8';

//import Form from '@rjsf/core'
//import Form from '@rjsf/bootstrap-4'
import Form from '@rjsf/antd'


import MultiSelectWidget from './components/MultiSelectWidget';
import schema from './dataset_schema.json'
import UiSchema from './UIschema.json'
import regions from './data/regions.json';
import formData from './data/formData.json'


function App() {

  // const widgets = {
  //   MultiSelect: (props) => <MultiSelectWidget {...props} options={regions} />
  // };

  const widgets = {
    MultiSelect: (props) => {
      console.log("Widget ID:", props.id); // Add this to check the actual ID
      let options = [];
      if (props.id === "root_regions") { // Adjust the field name
        options = regions;
      } else if (props.id === "root_free_text_keywords") { // Adjust for another field
        // options for another field
      }

      return <MultiSelectWidget {...props} options={options} />;
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <Form
          schema={schema}
          widgets={widgets}
          uiSchema={UiSchema}
          formData={formData}
          validator={validator}
          onSubmit={({ formData }) => console.log(formData)}
        />
      </div>
    </div>
  );
}

export default App;