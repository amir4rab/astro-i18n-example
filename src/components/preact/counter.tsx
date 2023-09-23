/** @jsxImportSource preact */

import { useState } from "preact/hooks";
import useTranslations from "../../hooks/preact/useTranslations";

const Counter = () => {
  const { t } = useTranslations();
  const [value, setValue] = useState(0);

  return (
    <div>
      <h2>{`${t("counter")}: ${value}`}</h2>
      <div style={{ display: "flex", gap: ".125rem", alignItems: "center" }}>
        <button onClick={() => setValue((curr) => curr - 1)}>-</button>
        <p>{value}</p>
        <button onClick={() => setValue((curr) => curr + 1)}>+</button>
      </div>
      <code>Preact</code>
    </div>
  );
};

export default Counter;
