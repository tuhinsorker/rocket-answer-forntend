import { Fragment } from "react";

const StepLine = ({ active, title }) => {
  return (
    <Fragment>
      <h2 className="text-2xl leading-[30px] text-[var(--primary)] font-semibold">
        {title}
      </h2>

      <div className="flex flex-wrap items-center mb-10">
        {[
          ["step-1", "Primary Information"],
          ["step-2", "Education"],
          ["step-3", "Job Summery"],
          ["step-4", "Licenses & Certification"],
        ].map(([step, title], i) => (
          <div
            key={i}
            className={`flex-1 py-5 border-b-8 ${
              active === step
                ? "text-[var(--secondary)] border-[var(--secondary)]"
                : "text-[var(--slate)] hidden sm:block"
            }`}
          >
            <h2 className="text-xl leading-6 font-semibold capitalize">
              {step}
            </h2>
            <p>{title}</p>
          </div>
        ))}
        {/* <div className="flex-1 text-[var(--slate)] py-5 border-b-8 hidden sm:block">
          <h2 className="text-xl leading-6 font-semibold">Step-2</h2>
          <p>Education</p>
        </div>
        <div
          className={`flex-1 py-5 border-b-8 ${
            active
              ? "text-[var(--secondary)] border-[var(--secondary)]"
              : "text-[var(--slate)]"
          }`}
        >
          <h2 className="text-xl leading-6 font-semibold">Step-3</h2>
          <p>Job Summery</p>
        </div>
        <div className="flex-1 text-[var(--slate)] py-5 border-b-8 hidden sm:block">
          <h2 className="text-xl leading-6 font-semibold">Step-4</h2>
          <p>Licenses & Certification</p>
        </div> */}
      </div>
    </Fragment>
  );
};

export default StepLine;
