import amex from "/public/images/cards/amex.png";
import diners from "/public/images/cards/diners.png";
import discover from "/public/images/cards/discover.png";
import jcb from "/public/images/cards/jcb.png";
import mastercard from "/public/images/cards/mastercard.png";
import unionpay from "/public/images/cards/unionpay.png";
import visa from "/public/images/cards/visa.png";

const data = [
  {
    id: 1,
    name: "amex",
    logo: amex,
  },
  {
    id: 2,
    name: "diners",
    logo: diners,
  },
  {
    id: 3,
    name: "discover",
    logo: discover,
  },
  {
    id: 4,
    name: "jcb",
    logo: jcb,
  },
  {
    id: 5,
    name: "mastercard",
    logo: mastercard,
  },
  {
    id: 6,
    name: "unionpay",
    logo: unionpay,
  },
  {
    id: 7,
    name: "visa",
    logo: visa,
  },
];

// Card brand. Can be amex, diners, discover, eftpos_au, jcb, mastercard, unionpay, visa, or unknown.

export default function cardImgCheck(name) {
  const card = data.find((card) => card.name === name.toLocaleLowerCase());

  return card?.logo;
}
