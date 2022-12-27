const d: Document = document;
const w: Window = window;
const log: Console = console;

const [html, body] = [dq("html"), dq("body")];

let selectYear: boolean = !false;

const appendSteps: void = (function () {
  const mainSteps: any = dq(".step__box");
  const data = [
    {
      id: 1,
      step: "STEP 1",
      tilte: "YOUR INFO",
    },
    {
      id: 2,
      step: "STEP 2",
      tilte: "SELECT PLAN",
    },
    {
      id: 3,
      step: "STEP 3",
      tilte: "ADD-ONS",
    },
    {
      id: 4,
      step: "STEP 4",
      tilte: "SUMMARY",
    },
  ];
  // s = the steps
  let s = data
    .map((data, i) => {
      return `<div class="main__steps__box">
     <i class=>${data.id}</i>
     <div> <span> ${data.step}</span> <h2> ${data.tilte}</h2></div>
     </div>`;
    })
    .join("");

  mainSteps.innerHTML = s;
})();

const userChoices: void = (function () {
  const plans: any = dq(".card__plan__select");

  const data = [
    {
      icon: "/assets/images/icon-arcade.svg",
      plan: "Arcade",
      price: selectYear ? "$90/yr" : "$9/mo",
    },
    {
      icon: "/assets/images/icon-advanced.svg",
      plan: "Advanced",
      price: selectYear ? "$120/yr" : "$12/mo",
    },
    {
      icon: "/assets/images/icon-pro.svg",
      plan: "Pro",
      price: selectYear ? "$150/yr" : "$15/mo",
    },
  ];

  let s = data
    .map((data) => {
      return `<div class=plan__box> 
    <img src=${data.icon} alt=${data.plan}>
     <div>
      <h1 class=title>${data.plan}</h1>
      <span> ${data.price} </span>
      </div>
      </div>`;
    })
    .join("");

  plans.innerHTML = s;
})();

const userInteractions: void = (function () {
  // const btn = dqA(".btn")

  on(".btn", {
    pointerover(e: any) {
      e.preventDefault();

      e.target.classList.add("click");
      setTimeout(() => e.target.classList.remove("click"), 400);
    },
  });
})();

/**
 * on - a function that adds multiple events to the selected element(s)
 * @param { type: string} element
 * @param {type: object} event
 */
function on(element: string, event: any): void {
  for (let key in event) {
    const e: any = document.querySelectorAll(element);
    e.forEach((el: any) => el.addEventListener(key, event[key]));
  }
}

function dq(x: string) {
  return d.querySelector(x);
}
function dqA(x: string) {
  return d.querySelectorAll(x);
}
