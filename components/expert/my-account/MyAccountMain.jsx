"use client";

import { Fragment, useState } from "react";
import StepOneMain from "../profile/step1/StepOneMain";
import StepTwoMain from "../profile/step2/StepTwoMain";
import StepThreeMain from "../profile/step3/StepThreeMain";
import StepFourMain from "../profile/step4/StepFourMain";

const MyAccountMain = () => {
  const [step, setStep] = useState(1);

  const handleStep = (s) => {
    setStep(s);
  };

  return (
    <Fragment>
      {step === 1 && <StepOneMain readOnly={true} handleStep={handleStep} />}
      {step === 2 && <StepTwoMain readOnly={true} handleStep={handleStep} />}
      {step === 3 && <StepThreeMain readOnly={true} handleStep={handleStep} />}
      {step === 4 && <StepFourMain readOnly={true} handleStep={handleStep} />}
    </Fragment>
  );
};

export default MyAccountMain;
