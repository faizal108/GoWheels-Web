// gsap.registerPlugin(ScrollTrigger);

// let sections = gsap.utils.toArray(".panel");

// let scrollTween = gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".gothrough-container",
//     pin: true,
//     scrub: 0.1,
//     // snap: 1 / (sections.length - 1),
//     end: () => "+=" + document.querySelector(".gothrough-container").offsetWidth,
//   }
// });

// let scrollTween = gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: "none", // <-- IMPORTANT!
//   scrollTrigger: {
//     trigger: ".container",
//     pin: true,
//     scrub: 0.1,
//     onRefresh: (self) => {
//       dragRatio =
//         (self.end - self.start) /
//         ((sections.length - 1) * sections[0].offsetWidth);
//     },
//     //snap: directionalSnap(1 / (sections.length - 1)),
//     end: "+=3000"
//   }
// });

gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");

// Define images for each panel
let images = [
  "./assets/login-1.jpeg",
  "./assets/login.png",
  "./assets/home-page.png",
  "./assets/Booking.png",
  "./assets/History.png"
];

let currentPanel = 0; // Track current panel index

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".gothrough-container",
    pin: true,
    scrub: true, // Increase scrub speed
    snap: {
      snapTo: 1 / (sections.length - 1), // Snap to the closest section
      duration: 0.2, // Reduce snap duration
      ease: "power1.inOut" // Optional: adjust easing for snap
    },
    onUpdate: (self) => {
      let progress = self.progress;
      let panelIndex = Math.round(progress * (sections.length - 1)); // Determine current panel index

      // Change image only if panel index changes
      if (panelIndex !== currentPanel) {
        currentPanel = panelIndex;
        let floatGoThrough = document.querySelector(".float-gothrough");

        if (panelIndex === 0) {
          // Remove the image if panel index is 0
          let img = document.getElementById("dynamicImage");
          if (img) {
            img.remove();
          }
        } else {
          // Add the image if panel index is not 0
          if (!document.getElementById("dynamicImage")) {
            let img = document.createElement("img");
            img.id = "dynamicImage";
            img.src = images[currentPanel];
            floatGoThrough.appendChild(img);
            // Fade in the new image
            gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.1 });
          } else {
            let img = document.getElementById("dynamicImage");
            let tl = gsap.timeline();
            // Simultaneously fade out the old image and change the src
            tl.add(() => {
                img.src = images[currentPanel];
              })
              .to(img, { opacity: 1, duration: 0.1 });
          }
        }
      }
    },
    end: () =>
      "+=" + document.querySelector(".gothrough-container").offsetWidth,
  },
});


// testimonial bottom car image

// Animate the image
// gsap.to("#float-taxi", {
//   x: "100%",
//   scrollTrigger: {
//       trigger: ".about-section",
//       start: "top bottom", // When the top of the container hits the bottom of the viewport
//       end: "bottom top",   // When the bottom of the container hits the top of the viewport
//       scrub: true          // Smoothly scrubs the animation
//   }
// });

// About us taxi animation

if (document.querySelector(".about-section")) {
  gsap.to("#float-taxi", {
    xPercent: 700,
    ease: "none",
    scrollTrigger: {
      trigger: "#float-taxi",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// about us Service card animation

if (document.querySelector(".about-section")) {
  // Elements moving from right to left
  gsap.from(".ser-card:nth-child(odd)", {
    xPercent: 50, // Start from 100% to the right
    ease: "none",
    scrollTrigger: {
      trigger: ".ser-card",
      start: "top 50%",
      end: "top 25%",
      scrub: true,
    },
  });

  // Elements moving from left to right
  gsap.from(".ser-card:nth-child(even)", {
    xPercent: -50, // Start from 100% to the left
    ease: "none",
    scrollTrigger: {
      trigger: ".ser-card",
      start: "top 50%",
      end: "top 25%",
      scrub: true,
    },
  });
}



// top wave path following


// gsap.to("#floatingImg", {
//   duration: 10,
//   repeat: -1,
//   ease: "none",
//   motionPath: {
//     path: "#svgPath",
//     align: "#svgPath",
//     autoRotate: true,
//     alignOrigin: [0.5, 0.5]
//   }
// });



// content animation

// Function to handle when an observed element enters or leaves the viewport
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animation'); // Add 'animate' class to start animation
    } else {
      entry.target.classList.remove('animation'); // Remove 'animate' class to reset animation
    }
  });
}

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // viewport
  threshold: 0.8
});

// Observe the element
const animatedElements = document.querySelectorAll('.panel');
animatedElements.forEach(element => {
  observer.observe(element);
});
