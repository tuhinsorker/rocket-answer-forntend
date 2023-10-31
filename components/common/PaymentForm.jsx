import Image from "next/image";
import pay_pal from "/public/images/logos/paypal_logo.png";

const PaymentForm = () => {
  return (
    <form className="mt-[30px] md:mt-10">
      <div className="flex items-center gap-10 md:gap-20">
        <div className="flex gap-2">
          <input type="radio" name="card" id="card" defaultChecked />
          <label className="text-sm lg:text-lg text-[var(--primary)]">
            Credit Card
          </label>
        </div>

        <div className="flex gap-2">
          <input type="radio" name="card" />
          <label>
            <Image src={pay_pal} alt="pay-pal" />
          </label>
        </div>
      </div>

      <div className="mt-5 lg:mt-[30px]">
        <label className="text-sm lg:text-lg text-[var(--gray-2)]">
          Email Address
        </label>
        <input
          className="form-item mt-[5px] md:mt-[10px]"
          type="email"
          placeholder="exapmle@gmail.com"
          required
        />
      </div>

      <div className="mt-5 lg:mt-[30px]">
        <label className="text-sm lg:text-lg text-[var(--gray-2)]">
          Credit card number
        </label>
        <input
          className="form-item mt-[5px] md:mt-[10px]"
          type="number"
          placeholder="Xxxx xxxxx xxxxxx xxxxxxx"
          required
        />
      </div>

      <div className="flex justify-between gap-5 mt-5 lg:mt-[30px]">
        <div className="w-1/3">
          <label className="text-sm lg:text-lg text-[var(--gray-2)]">
            Expiration
          </label>
          <input
            className="form-item mt-[5px] md:mt-[10px]"
            type="text"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="w-1/3">
          <label className="text-sm lg:text-lg text-[var(--gray-2)]">CVC</label>
          <input
            className="form-item mt-[5px] md:mt-[10px]"
            type="number"
            placeholder="CVC"
            required
          />
        </div>
        <div className="w-1/3">
          <label className="text-sm lg:text-lg text-[var(--gray-2)]">
            Zip/Postal code
          </label>
          <input
            className="form-item mt-[5px] md:mt-[10px]"
            type="number"
            placeholder="123465"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="block w-full text-[16px] leading-[20px] btn-secondary mt-[30px] lg:mt-[50px]"
      >
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
