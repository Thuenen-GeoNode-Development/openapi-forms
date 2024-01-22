import React, { useState, useEffect } from 'react';
import validator from '@rjsf/validator-ajv8';

import Form from '@rjsf/core';
//import Form from '@rjsf/bootstrap-4';
//import Form from '@rjsf/antd';


import MultiSelectWidget from './components/MultiSelectWidget';
import hardcoded_schema from './dataset_schema.json';
import UiSchema from './UIschema.json';
import regions from './data/regions.json';
import formData from './data/formData.json';

const fetchSchema = async () => {
  try {
    const response = await fetch('/api/v2/schema/?format=json');
    const schemaDict = await response.json();

    // Assume fetched schema is similar in structure to hardcoded schema
    const fetchedProperties = schemaDict["components"]["schemas"]["Dataset"]["properties"];

    // Filter fetched properties based on hardcoded schema
    const cleanProperties = Object.keys(fetchedProperties)
      .filter(key => key in hardcoded_schema.properties) // Check if property exists in hardcoded schema
      .reduce((obj, key) => {
        obj[key] = fetchedProperties[key];
        return obj;
      }, {});

    // Prepare the clean schema to be returned
    const clean_schema = {
      title: "Metadata Editor",
      type: "object",
      properties: cleanProperties,
    };

    return clean_schema
  } catch (error) {
    console.error('Error fetching schema:', error);
    return null;
  }
};


function App() {
  const [schema, setSchema] = useState(null); // State to hold the fetched schema

  useEffect(() => {
    fetchSchema().then(fetchedSchema => {
      if (fetchedSchema) {
        setSchema(fetchedSchema); // Update the state with the fetched schema
      }
    });
  }, []);


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

  console.log(hardcoded_schema)
  console.log(schema)

  if (!schema) {
    return <div>Loading schema...</div>; // Show loading state or a spinner
  }

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