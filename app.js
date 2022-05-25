const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });

/* Pour créer la ligne qui se bend on est aller dans figma et on a simplement créer une ligne. 
Cette ligne on l'as transoformée en path (svg tag) car au standard elle se met en line (svg tag) 
une fois qu'on a la ligne en path on peux ajouter un point au centre et bend la ligne
on a donc une start path et une end path pour les deux ligne. 
Elle sont reproduites en dessous.*/
//Line
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

// Elastic :

/* On va loupé sur les containers et voir si ils sont focus pour déclancher l'animation.  */

containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");

  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      );
      tl.to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%");
      //placeholder shift
      tl.to(
        placeholder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<15%"
      );
    }
    // Name validation.
    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          //Ajoute de couleur.
          colorize("#6391E8", line, placeholder);
        } else {
          colorize("#FE8C99", line, placeholder);
        }
      }
      if (e.target.type === "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          //Ajoute de couleur.
          colorize("#6391E8", line, placeholder);
        } else {
          colorize("#FE8C99", line, placeholder);
        }
      }
      if (e.target.type === "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          //Ajoute de couleur.
          colorize("#6391E8", line, placeholder);
        } else {
          colorize("#FE8C99", line, placeholder);
        }
      }
    });
  });
});

// revert back if it' not focused.

form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }
  });
});

// Ici les deux fonction qui vont check l'email.
// on a un regex qui permet de checker que les caractère rentré dans l'input correspondent bien à un email et tel.
//pour ça je peux aller chercher les éléments sur le regex generator ou chercher une fonction qui check email et number
//Les fonctions ici return true quand l'input est correct;
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

//Fonction d'ajout de couleur :

function colorize(color, line, placeholder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { stroke: color, duration: 0.75 });
}

//Checkbox animation fill

const checkbox = document.querySelector(".checkbox");
const tl2 = gsap.timeline({
  defaults: { duration: 0.5, ease: "Power2.easeOut" },
});
const tickMarkPath = document.querySelector(".tick-mark path");
const pathLength = tickMarkPath.getTotalLength();

/* Ici le gsap.set permet de donner des propriété standard à notre checkbox
On en a besoin parce que notre checkbox les propriété standard sont les propriété finales de notre animation
et on aimerais qu'elle ai les propriété initiale de notre animation.
*/
gsap.set(tickMarkPath, {
  strokeDashoffset: pathLength,
  strokeDasharray: pathLength,
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    tl2.to(".checkbox-fill", { top: "0%" });
    tl2.fromTo(
      tickMarkPath,
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 },
      "<50%"
    );
    tl2.to(".checkbox-label", { color: "#6391E8" }, "<");
  } else {
    tl2.to(".checkbox-fill", { top: "100%" });
    tl2.fromTo(
      tickMarkPath,
      { strokeDashoffset: 0 },
      { strokeDashoffset: pathLength },
      "<50%"
    );
    tl2.to(".checkbox-label", { color: "#C5c5c5" }, "<");
  }
});

/* Animation des yeux du personnage et du bras. */
/* Au standard les yeux se ferment du bas vers le haut alors on doit set un transform au center pour que l'animation
se produise au centre et que les yeux se ferment d'en haut et d'en bas. */

gsap.set("#eye", { transformOrigin: "center" });

gsap.fromTo(
  "#eye",
  { scaleY: 1 },
  {
    scaleY: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "Power2.easeOut",
  }
);

gsap.fromTo(
  "#eyebrow",
  { y: 0 },
  { y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: "Power2.easeOut" }
);
