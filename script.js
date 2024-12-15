"use strict";

const plusIcons = Array.from(document.querySelectorAll(".plus-icon"));

const minusIcons = Array.from(document.querySelectorAll(".minus-icon"));

const questions = Array.from(document.querySelectorAll(".line h4"));

const lines = Array.from(document.querySelectorAll(".line"));

document.querySelector(".faqs").style.borderTop = 0;
console.log(plusIcons);

let currentOne = 0;

const toggleFunc = function (element, block, none) {
  const seniorNumber = element.children[0].classList.value.split("_")[1];

  const reply = document.querySelector(`.reply_${seniorNumber}`);

  reply.style.display = block;

  lines.forEach((each) => each.classList.remove("js-hover-class"));

  reply.parentNode.children[0].classList.add("js-hover-class");

  plusIcons[seniorNumber - 1].style.display = none;

  minusIcons[seniorNumber - 1].style.display = block;
};

const closeAnotherFunc = function (eTarget, none, block) {
  const openedNumber =
    eTarget.parentNode.children[0].classList.value.split("_")[1];

  const reply = document.querySelector(`.reply_${openedNumber}`);

  reply.style.display = none;

  plusIcons[openedNumber - 1].style.display = block;

  minusIcons[openedNumber - 1].style.display = none;
};

plusIcons.forEach((each) => {
  each.addEventListener("click", (e) => {
    const theOne = minusIcons.find((element) => {
      return window.getComputedStyle(element).display === "block";
    });
    toggleFunc(e.target.parentNode, "block", " none");
    if (theOne) {
      closeAnotherFunc(theOne, "none", "block");
    }
  });
});

minusIcons.forEach((each) => {
  each.addEventListener("click", (e) => {
    toggleFunc(e.target.parentNode, "none", "block");
  });
});

questions.forEach((each) => {
  each.addEventListener("click", (e) => {
    const theOne = minusIcons.find((element) => {
      return window.getComputedStyle(element).display === "block";
    });
    toggleFunc(e.target.parentNode, "block", " none");
    if (theOne) {
      closeAnotherFunc(theOne, "none", "block");
    }

    // console.log(e.target);

    currentOne = questions.findIndex((ele) => ele === e.target);
  });
});

// KEYBOARD NAVIGATION

lines[currentOne].classList.add("js-hover-class");
document.addEventListener("keydown", function (e) {
  console.log(e);

  if (e.key === "ArrowDown") {
    closeAnotherFunc(lines[currentOne].children[0], "none", " block");

    lines[currentOne]?.classList.remove("js-hover-class");

    currentOne = (currentOne + 1) % lines.length;
    console.log(currentOne);
    lines[currentOne].classList.add("js-hover-class");

    console.log("well it went down");
  }
  if (e.key === "ArrowUp") {
    console.log("well it went up");

    closeAnotherFunc(lines[currentOne].children[0], "none", " block");

    lines[currentOne]?.classList.remove("js-hover-class");

    currentOne = (currentOne - 1 + lines.length) % lines.length;

    console.log(currentOne);
    lines[currentOne].classList.add("js-hover-class");
  }

  if (e.key === "Enter") {
    const child = lines[currentOne];
    const replyDIsplayed =
      document.querySelector(
        `.reply_${child.children[0].classList.value.split("_")[1]}`
      ).style.display === "block";
    console.log(replyDIsplayed);
    console.log(child.children[0].classList.value.split("_")[1]);

    toggleFunc(child, "block", " none");

    if (replyDIsplayed) {
      console.log("done");
      closeAnotherFunc(child.children[0], "none", "block");
    }
  }

  //   const theOne = minusIcons.find((element) => {
  //     return window.getComputedStyle(element).display === "block";
  //   });

  //   if (theOne) {
  //     closeAnotherFunc(theOne, "none", "block");
  //   }
});
