"use strict";
const d = document;
const w = window;
const log = console;
const [html, body] = [dq("html"), dq("body")];
const load = dq(".load");
let selectType = false;
let _random = 1400;
const appendSteps = (function () {
    const mainSteps = dq(".step__box");
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
function userChoices(bool) {
    const plans = dq(".card__plan__select");
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
function userSelectedChoice(element) {
    const planBox = dqA(element);
    planBox.forEach((element, i) => {
        const prevBro = element.previousElementSibling;
        const nextBro = element.nextElementSibling;
        element.onclick = () => {
            var _a, _b, _c, _d, _e, _f;
            switch (i) {
                case 0:
                    element.classList.toggle("click");
                    (_a = nextBro.classList) === null || _a === void 0 ? void 0 : _a.remove("click");
                    (_b = nextBro.nextElementSibling.classList) === null || _b === void 0 ? void 0 : _b.remove("click");
                    break;
                case 1:
                    element.classList.toggle("click");
                    (_c = prevBro.classList) === null || _c === void 0 ? void 0 : _c.remove("click");
                    (_d = nextBro.classList) === null || _d === void 0 ? void 0 : _d.remove("click");
                    break;
                case 2:
                    element.classList.toggle("click");
                    (_e = prevBro.classList) === null || _e === void 0 ? void 0 : _e.remove("click");
                    (_f = prevBro.previousElementSibling.classList) === null || _f === void 0 ? void 0 : _f.remove("click");
                    break;
            }
        };
    });
}
userSelectedChoice(".plan__box");
function userGamingExperience(bol) {
    const pick = dq(".card__pick");
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
    const s = data
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
function calculatedSum() {
}
const userInteractions = (function () {
    // all navigation buttons
    on(".navBtn", {
        pointerover(e) {
            e.preventDefault();
            e.target.classList.add("click");
            setTimeout(() => e.target.classList.remove("click"), 400);
        },
    });
    // the year/month toggle btn
    on(".toggle", {
        click(e) {
            const dom = e.target;
            const nextBro = dom.nextElementSibling;
            const prevBro = dom.previousElementSibling;
            dom.classList.toggle("click");
            selectType = !selectType;
            userChoices(selectType);
            userGamingExperience(selectType);
            userSelectedChoice(".plan__box");
            if (dom.classList.contains("click")) {
                nextBro.classList.toggle("choice");
                prevBro.classList.toggle("choice");
            }
            else {
                prevBro.classList.toggle("choice");
                nextBro.classList.toggle("choice");
            }
        },
    });
    // checkbox selected
    on(".card__pick__box input", {
        change(e) {
            const parent = e.composedPath()[2];
            parent.classList.toggle("click");
        },
    });
    // selected numbered steps used for redirection
    on(".step__box i", {
        click(e) {
            const child = e.composedPath()[0];
            const c = dqA(".step__box i"); // select all instances of i
            const cardElement = dqA(".card");
            cardElement.forEach((element, i) => {
                var _a, _b, _c, _d;
                if (((_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.step) === ((_b = child === null || child === void 0 ? void 0 : child.dataset) === null || _b === void 0 ? void 0 : _b.step)) {
                    // .8s before the new step pops up
                    c[i].classList.add("click");
                    setTimeout(() => {
                        var _a, _b;
                        (_a = element.classList) === null || _a === void 0 ? void 0 : _a.remove("hide");
                        (_b = load.classList) === null || _b === void 0 ? void 0 : _b.add("hide");
                    }, _random);
                }
                else {
                    c[i].classList.remove("click");
                    (_c = load.classList) === null || _c === void 0 ? void 0 : _c.remove("hide");
                    (_d = element.classList) === null || _d === void 0 ? void 0 : _d.add("hide");
                }
            });
        },
    });
    // prev, next,end buttons 
    on(".next", {
        click(e) {
            alert("clicked");
        }
    });
})();
/**
 *on - a function that adds multiple events to the selected
 elements
 * @param element = string
 * @param event = object
 */
function on(element, event) {
    for (let key in event) {
        const e = document.querySelectorAll(element);
        e.forEach((el) => el.addEventListener(key, event[key]));
    }
}
function dq(x) {
    return d.querySelector(x);
}
function dqA(x) {
    return d.querySelectorAll(x);
}
