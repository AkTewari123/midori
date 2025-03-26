// // Initialize timeline
// function initTimeline() {
//   const timelineContent = document.getElementById('timeline-content');
//   const timelineContainer = document.getElementById('timeline-container');
//   let timelineLineContainer;
//   let timelineProgressLine;
//   let timelineBackgroundLine;
//   let timelineHeight = 0;

//   // Create timeline entries
//   timelineData.forEach((item, index) => {
//     const entryEl = document.createElement('div');
//     entryEl.className = 'timeline-entry';
    
//     entryEl.innerHTML = `
//       <div class="timeline-marker">
//         <div class="timeline-dot-container">
//           <div class="timeline-dot"></div>
//         </div>
//         <h3 class="timeline-marker-title">${item.title}</h3>
//       </div>
//       <div class="timeline-entry-content">
//         <h3 class="timeline-entry-title">${item.title}</h3>
//         ${item.content}
//       </div>
//     `;
    
//     timelineContent.appendChild(entryEl);
//   });

//   // Create timeline line
//   timelineLineContainer = document.createElement('div');
//   timelineLineContainer.className = 'timeline-line-container';
  
//   // Create background line
//   timelineBackgroundLine = document.createElement('div');
//   timelineBackgroundLine.className = 'timeline-background-line';
  
//   // Create progress line
//   timelineProgressLine = document.createElement('div');
//   timelineProgressLine.className = 'timeline-progress-line';
  
//   timelineLineContainer.appendChild(timelineBackgroundLine);
//   timelineLineContainer.appendChild(timelineProgressLine);
//   timelineContent.appendChild(timelineLineContainer);

//   // Set initial height
//   setTimeout(() => {
//     timelineHeight = timelineContent.getBoundingClientRect().height;
//     timelineLineContainer.style.height = `${timelineHeight}px`;
//     timelineBackgroundLine.style.height = `${timelineHeight}px`;
//     setupScrollAnimation();
//   }, 100);
// }

// // Toggle dark mode
// function toggleDarkMode() {
//   document.body.classList.toggle('dark');
// }

// // Setup scroll animation
// function setupScrollAnimation() {
//   const { transform, scroll } = window.motion;

//   const scrollTracker = scroll(window.motion.animate, {
//     target: document.getElementById('timeline-container'),
//     offset: ["start 10%", "end 50%"]
//   });

//   const heightProgress = transform(scrollTracker, [0, 1], [0, timelineHeight]);
//   const opacityProgress = transform(scrollTracker, [0, 0.1], [0, 1]);

//   scrollTracker.update(() => {
//     timelineProgressLine.style.height = `${heightProgress.get()}px`;
//     timelineProgressLine.style.opacity = opacityProgress.get();
//   });
// }
