/** @jsxImportSource preact */

import { useState } from "preact/hooks";
import useTranslations from "../../hooks/preact/useTranslations";

const Counter = () => {
  const { t } = useTranslations();
  const [value, setValue] = useState(0);

  return (
    <div class="bg-neutral-200 p-4 rounded-xl relative">
      <h2 class="mt-0 mb-4">{`${t("counter")}: ${value}`}</h2>
      <div class="flex justify-center items-center gap-2">
        <button
          class="bg-neutral-300 rounded-xl p-2 aspect-square overflow-hidden block leading-none w-8"
          onClick={() => setValue((curr) => curr - 1)}
        >
          -
        </button>
        <p class="my-0">{value}</p>
        <button
          class="bg-neutral-300 rounded-xl p-2 aspect-square overflow-hidden block leading-none w-8"
          onClick={() => setValue((curr) => curr + 1)}
        >
          +
        </button>
      </div>
      <p className="text-xs mx-auto bg-green-200 p-2 rounded-xl block absolute top-4 right-4 font-mono leading-none my-0">
        Preact
      </p>
    </div>
  );
};

export default Counter;
