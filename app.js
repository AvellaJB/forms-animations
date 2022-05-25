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
  });
});
