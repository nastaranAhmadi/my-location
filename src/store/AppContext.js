import React from "react";

// set the defaults
const LanguageContext = React.createContext({
  state: {},
  setState: () => {}
});

export default LanguageContext;