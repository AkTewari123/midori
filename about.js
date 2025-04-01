// Timeline data
const timelineData = [
  {
    title: "2020",
    content: `
      <p>Conceived the idea for Midori during the global shift towards sustainable dining.</p>
      <p>Began researching traditional Japanese vegetarian cuisine and modern plant-based techniques.</p>
      <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
      <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
      <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
    `
  },
  {
    title: "2021",
    content: `
      <p>Developed our core menu with expert chefs and food scientists.</p>
      <p>Started partnerships with local organic farmers and suppliers.</p>
    `
  },
  {
    title: "2022",
    content: `
      <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>
       <p>Opened our first location in San Francisco.</p>
      <p>Received recognition for innovative plant-based Japanese cuisine.</p>

    `
  },
  {
    title: "2023",
    content: `
      <p>Expanded our menu to include seasonal specialties.</p>
      <p>Launched our sustainable packaging initiative.</p>
    `
  }
];

// Add team data
const teamMembers = [
  {
    name: "Anton",
    title: "Head Chef",
    image: "images/Escoffier-graduate-Trenin-Nubiru-stands-proudly-smiling-in-an-Escoffier-kitchen-768.jpg",
    bio: "Master of traditional Japanese cuisine with 15 years of experience"
  },
  {
    name: "Sarah",
    title: "Sous Chef",
    image: "images/Escoffier-graduate-Trenin-Nubiru-stands-proudly-smiling-in-an-Escoffier-kitchen-768.jpg",
    bio: "Specialist in plant-based innovations"
  },
  {
    name: "Mike",
    title: "Pastry Chef",
    image: "images/Escoffier-graduate-Trenin-Nubiru-stands-proudly-smiling-in-an-Escoffier-kitchen-768.jpg",
    bio: "Expert in vegan pastries and desserts"
  }
];

// Add info cards data
const infoCards = [
  {
    title: "Our Philosophy",
    icon: "🌱",
    content: "At Midori, we believe in the harmony between traditional Japanese cuisine and modern plant-based innovation. Every dish is crafted with respect for nature and commitment to sustainability.",
    direction: "left"
  },
  {
    title: "Our Promise",
    icon: "✨",
    content: "We promise to deliver not just meals, but memorable experiences that showcase the beauty of vegetarian cuisine. Each plate tells a story of dedication, creativity, and respect for our ingredients.",
    direction: "right"
  },
  {
    title: "Our Vision",
    icon: "🎯",
    content: "To revolutionize plant-based dining by combining traditional wisdom with modern innovation, creating sustainable and delicious experiences for everyone.",
    direction: "left"
  },
  {
    title: "Our Values",
    icon: "💫",
    content: "Quality, sustainability, and respect for both our ingredients and our customers guide everything we do at Midori.",
    direction: "right"
  }
];

let timelineHeight = 0;

// Initialize timeline
function initTimeline() {
  const timelineContent = document.getElementById('timeline-content');
  if (!timelineContent) return;

  const timelineContainer = document.getElementById('timeline-container');
  
  // Create timeline entries
  timelineData.forEach(item => {
    const entryEl = document.createElement('div');
    entryEl.className = 'timeline-entry';
    
    entryEl.innerHTML = `
      <div class="timeline-marker">
        <div class="timeline-dot-container">
          <div class="timeline-dot"></div>
        </div>
        <h3 class="timeline-marker-title">${item.title}</h3>
      </div>
      <div class="timeline-entry-content">
        <h3 class="timeline-entry-title">${item.title}</h3>
        ${item.content}
      </div>
    `;
    
    timelineContent.appendChild(entryEl);
  });

  // Create and append timeline lines
  const lineContainer = document.createElement('div');
  lineContainer.className = 'timeline-line-container';
  
  const backgroundLine = document.createElement('div');
  backgroundLine.className = 'timeline-background-line';
  
  const progressLine = document.createElement('div');
  progressLine.className = 'timeline-progress-line';
  
  lineContainer.appendChild(backgroundLine);
  lineContainer.appendChild(progressLine);
  timelineContent.appendChild(lineContainer);

  // Set initial height and setup animation after elements are rendered
  setTimeout(() => {
    timelineHeight = timelineContent.getBoundingClientRect().height;
    lineContainer.style.height = `${timelineHeight}px`;
    backgroundLine.style.height = `${timelineHeight}px`;

    // Setup scroll animation
    const { transform, scroll } = window.motion;
    
    const scrollTracker = scroll(window.motion.animate, {
      target: timelineContainer,
      offset: ["start 10%", "end 50%"]
    });

    const heightProgress = transform(scrollTracker, [0, 1], [0, timelineHeight]);
    const opacityProgress = transform(scrollTracker, [0, 0.1], [0, 1]);

    scrollTracker.update(() => {
      progressLine.style.height = `${heightProgress.get()}px`;
      progressLine.style.opacity = opacityProgress.get();
    });
  }, 100);
}

// Add team population function
function populateTeam() {
  const teamContainer = document.querySelector('.team-container');
  if (!teamContainer) return;

  teamContainer.innerHTML = teamMembers.map(member => `
    <div class="person">
      <div class="container">
        <div class="container-inner">
          <img 
            class="circle" 
            src="${member.image}"
            alt="${member.title} ${member.name}"
          />
        </div>
      </div>
      <div class="divider"></div>
      <div class="name">${member.name}</div>
      <div class="title">${member.title}</div>
    </div>
  `).join('');
}

// Update card template in populateInfoCards function
function populateInfoCards() {
  const cardsContainer = document.querySelector('.info-cards-container');
  if (!cardsContainer) return;

  // Create paired cards, alternating left and right
  cardsContainer.innerHTML = infoCards.reduce((html, card, index) => {
    const isOdd = index % 2 === 1;
    const direction = isOdd ? 'right' : 'left';
    
    return html + `
      <div class="info-card-wrapper">
        <div class="slide-in-${direction} group">
          <div class="philosophy-icon group-hover:scale-110 transition-transform">
            ${card.icon}
          </div>
          <h3 class="info-card-title group-hover:text-emerald-700 transition-colors">
            ${card.title}
          </h3>
          <p class="info-card-content">
            ${card.content}
          </p>
        </div>
      </div>
    `;
  }, '');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  populateTeam();
  initTimeline();
  populateInfoCards();
  
  // Setup sliding animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
});

// Update on window resize
window.addEventListener('resize', () => {
  const timelineContent = document.getElementById('timeline-content');
  const lineContainer = timelineContent.querySelector('.timeline-line-container');
  const backgroundLine = timelineContent.querySelector('.timeline-background-line');
  
  if (timelineContent && lineContainer && backgroundLine) {
    timelineHeight = timelineContent.getBoundingClientRect().height;
    lineContainer.style.height = `${timelineHeight}px`;
    backgroundLine.style.height = `${timelineHeight}px`;
  }
});
