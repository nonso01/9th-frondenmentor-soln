const d: Document = document;
const w: Window = window;
const log: Console = console;

const [html, body] = [dq("html"), dq("body")];
const load: HTMLDivElement | any = dq(".load");

let selectType: boolean = false;
let _random: number = 1400;

const appendSteps: void = (function () {
  const mainSteps: any = dq(".step__box");
  const data = [
    {
      id: 1,
      step: "STEP 1",
      tilte: "YOUR INFO",
      filter: "info",
    },
    {
      id: 2,
      step: "STEP 2",
      tilte: "SELECT PLAN",
      filter: "plan",
    },
    {
      id: 3,
      step: "STEP 3",
      tilte: "ADD-ONS",
      filter: "pick",
    },
    {
      id: 4,
      step: "STEP 4",
      tilte: "SUMMARY",
      filter: "summary",
    },
  ];
  // s = the steps
  let s = data
    .map((data, i) => {
      return `<div class="main__steps__box">
     <i data-step=${data.filter}>${data.id}</i>
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

function userSelectedChoice(element: string): void {
  const planBox: any = dqA(element);

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
userSelectedChoice(".plan__box");

function userGamingExperience(bol: boolean): void {
  const pick: any = dq(".card__pick");

  const data = [
    {
      title: "Online service",
      about: "Access to multiplayer games",
      price: selectType ? "+$10/yr" : "+$1/mo",
    },
    {
      title: "Larger storage",
      about: "Extra 1TB of cloud save",
      price: selectType ? "+$20/yr" : "+$2/mo",
    },
    {
      title: "Customizable profile",
      about: "Custom theme on your profile",
      price: selectType ? "+$20/yr" : "+$2/mo",
    },
  ];

  const s: string[] | string = data
    .map((data) => {
      return `<div class=card__pick__box> 
      <div class=p>

      <input type=checkbox name=check>
<div class=pp>
<h2> ${data.title}</h2>
<p class=title__sub> ${data.about}</p>
</div>
      </div>

      <span>${data.price}</span>
      </div>`;
    })
    .join("");

  pick.innerHTML = s;
}

userGamingExperience(selectType);

function calculatedSum():void | any {
  
}

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
      userChoices(selectType);
      userGamingExperience(selectType);
      userSelectedChoice(".plan__box");

      if (dom.classList.contains("click")) {
        nextBro.classList.toggle("choice");
        prevBro.classList.toggle("choice");
      } else {
        prevBro.classList.toggle("choice");
        nextBro.classList.toggle("choice");
      }
    },
  });

  // checkbox selected
  on(".card__pick__box input", {
    change(e: any) {
      const parent: any | HTMLDivElement = e.composedPath()[2];
      parent.classList.toggle("click");
    },
  });

  // selected numbered steps used for redirection
  on(".step__box i", {
    click(e: any) {
      const child: HTMLElement | any = e.composedPath()[0];
      const c: any = dqA(".step__box i") // select all instances of i
      const cardElement: HTMLDivElement | any = dqA(".card");
     

      cardElement.forEach((element: any, i:number) => {
        if (element?.dataset?.step === child?.dataset?.step) {
          // .8s before the new step pops up
          c[i].classList.add("click")

          setTimeout(() => {
            element.classList?.remove("hide");
            load.classList?.add("hide");
          }, _random);
        } else {
          c[i].classList.remove("click")
          load.classList?.remove("hide");
          element.classList?.add("hide");
        }
      });
    },
  });

  // prev, next,end buttons 
  on(".next", {
    click(e: any) {
      alert("clicked")
    }
  })
})();

/**
 *on - a function that adds multiple events to the selected 
 elements
 * @param element = string
 * @param event = object
 */
function on(element: string, event: object | any): void {
  for (let key in event) {
    const e: any = document.querySelectorAll(element);
    e.forEach((el: any) => el.addEventListener(key, event[key]));
  }
}

function dq(x: string): Element | null {
  return d.querySelector(x);
}
function dqA(x: string) {
  return d.querySelectorAll(x);
}
