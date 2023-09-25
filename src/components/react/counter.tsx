import { useState } from "react";
import useTranslations from "../../hooks/react/useTranslations";

const Counter = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslations();

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-[calc(theme(borderRadius.3xl)_-_1rem)] relative">
      <h2 className="mt-0 mb-4">{`${t("counter")}: ${value}`}</h2>
      <div className="flex justify-center items-center gap-2">
        <button
          className="bg-neutral-300 dark:bg-neutral-700 rounded-xl p-2 aspect-square overflow-hidden block leading-none w-8"
          onClick={() => setValue((curr) => curr - 1)}
        >
          -
        </button>
        <p className="my-0">{value}</p>
        <button
          className="bg-neutral-300 dark:bg-neutral-700 rounded-xl p-2 aspect-square overflow-hidden block leading-none w-8"
          onClick={() => setValue((curr) => curr + 1)}
        >
          +
        </button>
      </div>
      <p className="text-xs mx-auto bg-green-200 dark:bg-green-800 p-2 rounded-xl block absolute top-4 right-4 font-mono leading-none my-0">
        React
      </p>
    </div>
  );
};

export default Counter;
