import { useState } from "react";
import { useTranslation } from "@i18n/useTranslation";
import { useGameStore } from "@lib/persistence/store";
import type { StringId } from "@i18n/strings";

const STEPS: StringId[] = [
  "tutorial.step1",
  "tutorial.step2",
  "tutorial.step3",
  "tutorial.step4",
];

type TutorialOverlayProps = {
  onComplete: () => void;
};

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const { t } = useTranslation();
  const markTutorialSeen = useGameStore((state) => state.markTutorialSeen);
  const [stepIndex, setStepIndex] = useState(0);
  const isLastStep = stepIndex === STEPS.length - 1;

  function handleNext() {
    if (isLastStep) {
      markTutorialSeen();
      onComplete();
      return;
    }
    setStepIndex((index) => index + 1);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 p-6 text-white">
      <p className="max-w-md text-center text-lg">{t(STEPS[stepIndex])}</p>
      <button type="button" onClick={handleNext} className="rounded bg-blue-600 px-6 py-3">
        {isLastStep ? t("tutorial.done") : t("tutorial.next")}
      </button>
    </div>
  );
}
