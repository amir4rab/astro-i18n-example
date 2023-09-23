import { __t, preactLocale } from "../../lib/i18n";
import { useMemo } from "preact/hooks";

const useTranslations = () => {
  const t = useMemo(
    () => __t.bind(null, preactLocale.value),
    [preactLocale.value]
  );

  return {
    t,
    preactLocale,
  };
};

export default useTranslations;
