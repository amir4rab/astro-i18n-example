/** @jsxImportSource preact */

import { useState } from "preact/hooks";

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h2>Preact Counter</h2>
      <div style={{ display: "flex", gap: ".125rem", alignItems: "center" }}>
        <button onClick={() => setValue((curr) => curr - 1)}>-</button>
        <p>{value}</p>
        <button onClick={() => setValue((curr) => curr + 1)}>+</button>
      </div>
    </div>
  );
};

export default Counter;
