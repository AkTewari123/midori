// // Timeline data
// const timelineData = [
//     {
//       title: "2022",
//       content: `
//         <p>Started working on the Aceternity concept. Initial research and planning phase.</p>
//         <p>Explored various technologies and frameworks to determine the best approach.</p>
//       `
//     },
//     {
//       title: "2023 Q1",
//       content: `
//         <p>Built the first prototype of Aceternity, focusing on core functionality.</p>
//         <p>Conducted user testing and gathered initial feedback from early adopters.</p>
//       `
//     },
//     {
//       title: "2023 Q2",
//       content: `
//         <p>Launched the beta version with improved UI/UX and additional features.</p>
//         <p>Started growing our community and addressing user feedback.</p>
//       `
//     },
//     {
//       title: "2023 Q3",
//       content: `
//         <p>Major performance improvements and optimization work.</p>
//         <p>Added support for mobile devices and responsive design.</p>
//       `
//     },
//     {
//       title: "2023 Q4",
//       content: `
//         <p>Released v1.0 with a completely redesigned interface.</p>
//         <p>Surpassed 10,000 users milestone.</p>
//       `
//     },
//     {
//       title: "2024 Q1",
//       content: `
//         <p>Introduced premium features and subscription model.</p>
//         <p>Expanded the team and opened our first office.</p>
//       `
//     }
//   ];

//   // DOM elements
//   const timelineContent = document.getElementById('timeline-content');
//   const timelineContainer = document.getElementById('timeline-container');
//   let timelineLineContainer;
//   let timelineProgressLine;
//   let timelineBackgroundLine;
//   let timelineHeight = 0;

//   // Initialize timeline
//   function initTimeline() {
//     // Create timeline entries
//     timelineData.forEach((item, index) => {
//       const entryEl = document.createElement('div');
//       entryEl.className = 'timeline-entry';

//       entryEl.innerHTML = `
//         <div class="timeline-marker">
//           <div class="timeline-dot-container">
//             <div class="timeline-dot"></div>
//           </div>
//           <h3 class="timeline-marker-title">${item.title}</h3>
//         </div>
//         <div class="timeline-entry-content">
//           <h3 class="timeline-entry-title">${item.title}</h3>
//           ${item.content}
//         </div>
//       `;

//       timelineContent.appendChild(entryEl);
//     });

//     // Create timeline line
//     timelineLineContainer = document.createElement('div');
//     timelineLineContainer.className = 'timeline-line-container';

//     // Create background line with gradient
//     timelineBackgroundLine = document.createElement('div');
//     timelineBackgroundLine.className = 'timeline-background-line';

//     // Create progress line
//     timelineProgressLine = document.createElement('div');
//     timelineProgressLine.className = 'timeline-progress-line';

//     timelineLineContainer.appendChild(timelineBackgroundLine);
//     timelineLineContainer.appendChild(timelineProgressLine);
//     timelineContent.appendChild(timelineLineContainer);

//     // Set initial height
//     setTimeout(() => {
//       timelineHeight = timelineContent.getBoundingClientRect().height;
//       timelineLineContainer.style.height = `${timelineHeight}px`;
//       timelineBackgroundLine.style.height = `${timelineHeight}px`;
//       setupScrollAnimation();
//     }, 100);
//   }

//   // Setup scroll animation
//   function setupScrollAnimation() {
//     const { transform, scroll } = window.motion;

//     const scrollTracker = scroll(window.motion.animate, {
//       target: timelineContainer,
//       offset: ["start 10%", "end 50%"]
//     });

//     const heightProgress = transform(scrollTracker, [0, 1], [0, timelineHeight]);
//     const opacityProgress = transform(scrollTracker, [0, 0.1], [0, 1]);

//     scrollTracker.update(() => {
//       timelineProgressLine.style.height = `${heightProgress.get()}px`;
//       timelineProgressLine.style.opacity = opacityProgress.get();

//       // Remove background gradient animation since we're using a solid color now
//       // timelineBackgroundLine.style.backgroundPosition = `0 ${gradientProgress.get()}%`;
//     });
//   }

//   // Toggle dark mode
//   function toggleDarkMode() {
//     document.body.classList.toggle('dark');
//   }

//   // Initialize on page load
//   window.addEventListener('load', initTimeline);

//   // Update on window resize
//   window.addEventListener('resize', () => {
//     timelineHeight = timelineContent.getBoundingClientRect().height;
//     timelineLineContainer.style.height = `${timelineHeight}px`;
//     timelineBackgroundLine.style.height = `${timelineHeight}px`;
//   });
document.addEventListener("DOMContentLoaded", () => {
  const members = document.querySelectorAll(".member-container");
  const teamHeader = document.getElementById("meet-team");
  teamHeader.classList.add("visible");
  const brilliantMinds = document.getElementById("brilliant-minds");
  brilliantMinds.classList.add("visible");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const name = entry.target.querySelector(".chef-name");
          const role = entry.target.querySelector(".chef-role");
          const caption = entry.target.querySelector(".chef-caption");
          const image = entry.target.querySelector(".chef-image");

          if (name) name.classList.add("visible");
          if (role) role.classList.add("visible");
          if (caption) caption.classList.add("visible");
          if (image) image.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  members.forEach((member) => observer.observe(member));
});
document.addEventListener("DOMContentLoaded", () => {
  const eventElements = document.querySelectorAll(".event-l, .event-r");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    },
    { threshold: 0.5 } // Trigger when 20% of the element is visible
  );

  eventElements.forEach((el) => observer.observe(el));
});
