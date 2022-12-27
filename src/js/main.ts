const d: Document = document;
const w: Window = window;
const log: Console = console;

const [html, body] = [dq("html"), dq("body")];

let selectType: boolean = false;
let _random: number;

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

function userChoices(bool: boolean): void {
  const plans: any = dq(".card__plan__select");

  const data = [
    {
      icon: "/assets/images/icon-arcade.svg",
      plan: "Arcade",
      price: selectType ? "$90/yr" : "$9/mo",
      free: selectType ? "2 months free" : "",
    },
    {
      icon: "/assets/images/icon-advanced.svg",
      plan: "Advanced",
      price: selectType ? "$120/yr" : "$12/mo",
      free: selectType ? "2 months free" : "",
    },
    {
      icon: "/assets/images/icon-pro.svg",
      plan: "Pro",
      price: selectType ? "$150/yr" : "$15/mo",
      free: selectType ? "2 months free" : " ",
    },
  ];
  // the plans
  let s = data
    .map((data) => {
      return `<div class=plan__box> 
    <img src=${data.icon} alt=${data.plan}>
     <div>
      <h1 class=title>${data.plan}</h1>
      <span> ${data.price} </span>
      <span class="free"> ${data.free}</span>
      </div>
      </div>`;
    })
    .join("");

  plans.innerHTML = s;
}
// called so as to display the informations
userChoices(selectType);

function userSelectedChoice(): void {
  const planBox: any = dqA(".plan__box");

  planBox.forEach((element: any, i: number) => {
    const prevBro: any = element.previousElementSibling;
    const nextBro: any = element.nextElementSibling;
    element.onclick = () => {
      switch (i) {
        case 0:
          element.classList.toggle("click");
          nextBro.classList?.remove("click");
          nextBro.nextElementSibling.classList?.remove("click");
          break;
        case 1:
          element.classList.toggle("click");
          prevBro.classList?.remove("click");
          nextBro.classList?.remove("click");
          break;
        case 2:
          element.classList.toggle("click");
          prevBro.classList?.remove("click");
          prevBro.previousElementSibling.classList?.remove("click");

          break;
      }
    };
  });
}
userSelectedChoice();

const userInteractions: void = (function () {
  // all navigation buttons
  on(".navBtn", {
    pointerover(e: any) {
      e.preventDefault();

      e.target.classList.add("click");
      setTimeout(() => e.target.classList.remove("click"), 400);
    },
  });

  // the year/month toggle btn
  on(".toggle", {
    click(e: any) {
      const dom: any = e.target;
      const nextBro: any = dom.nextElementSibling;
      const prevBro: any = dom.previousElementSibling;
      dom.classList.toggle("click");

      selectType = !selectType;
      /* since the dom get's updated, you will need to re-call userSelectedChoice
so as to keep things updated too
*/
      userSelectedChoice();

      if (dom.classList.contains("click")) {
        nextBro.classList.toggle("choice");
        prevBro.classList.toggle("choice");
      } else {
        prevBro.classList.toggle("choice");
        nextBro.classList.toggle("choice");
      }
    },
  });
})();

/**
 *on - a function that adds multiple events to the selected 
 elements
 * @param element = string
 * @param event = object
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
