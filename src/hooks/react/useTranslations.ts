import { __t, reactLocale } from "../../lib/i18n";
import { useMemo } from "react";

const useTranslations = () => {
  const t = useMemo(
    () => __t.bind(null, reactLocale.value),
    [reactLocale.value]
  );

  return {
    t,
    reactLocale,
  };
};

export default useTranslations;
