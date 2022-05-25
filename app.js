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
