import React from "react";
import Index from "./Components";

const App = () => {
  return (
    <div>
      <Index url={"https://picsum.photos/v2/list"} limit={"13"}/>
    </div>
  );
};

export default App;
