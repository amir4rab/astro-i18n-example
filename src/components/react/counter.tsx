import { useState } from "react";
import useTranslations from "../../hooks/react/useTranslations";

const Counter = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslations();

  return (
    <div>
      <h2>{`${t("counter")}: ${value}`}</h2>
      <div style={{ display: "flex", gap: ".125rem", alignItems: "center" }}>
        <button onClick={() => setValue((curr) => curr - 1)}>-</button>
        <p>{value}</p>
        <button onClick={() => setValue((curr) => curr + 1)}>+</button>
      </div>
      <code>React</code>
    </div>
  );
};

export default Counter;
