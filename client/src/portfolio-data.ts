// ==========================================
// EDIT GUIDE - YOUR PORTFOLIO CONTENT
// ==========================================
// Update the variables below to customize your portfolio.
// The site will automatically update.
//
// Tips for hiring managers:
// - Keep it punchy. No generic buzzwords.
// - Focus on outcomes (metrics, time saved, revenue).
// - Show, don't tell. Let the case studies do the talking.
// ==========================================

export const portfolioData = {
    // 1. Basic Info
    name: "Dillon Schaffer",
    role: "Software Engineer",
    email: "dillonaschaffer@gmail.com", // Used for the contact buttons
    phone: "+1 760-525-7634",
    github: "https://github.com/dillman10",
    linkedin: "https://www.linkedin.com/in/dillon-schaffer-30b18b347/",
  
    // 2. Hero Section
    hero: {
      // "I build [type of software] that [business/user outcome]."
      headline: "Dillon Schaffer",
      // One supporting line (max 12–16 words) with credibility signal
      subheadline:
        "Software engineer focused on building AI-powered applications and scalable systems.",
      // A small "proof" row (e.g. "React • Node • AWS" + "X years")
      proof: [
        { text: "Full-Stack Web Development", icon: "code" },
        { text: "AI-Powered Applications", icon: "cpu" },
        { text: "Strong CS Fundamentals", icon: "server" },
      ],
    },
  
    // 3. Projects (ONLY 3 PROJECTS TOTAL)
    projects: [
      {
        id: "project-1",
        title: "Neural Network from Scratch",
        impact:
          "Built a fully functional feedforward neural network from first principles without ML frameworks.",
        metrics: [
          "Implemented forward & backpropagation manually",
          "Added SGD, momentum, L2 regularization & dropout",
          "Validated model performance on classification datasets",
        ],
        stack: ["Python", "NumPy"],
        link: "https://github.com/dillman10/Neural-Network",
        caseStudy: {
          problem:
            "Most ML practitioners rely heavily on high-level libraries without understanding the underlying mechanics of neural networks.",
          role: "Sole Developer. Designed and implemented the neural network architecture and training system from scratch.",
          process:
            "Implemented matrix-based forward propagation, backpropagation with gradient descent, and modular layer abstraction. Added optimization strategies (SGD, momentum) and regularization techniques (L2, dropout) to improve generalization.",
          results:
            "Successfully trained and evaluated the model on classification datasets, demonstrating strong conceptual understanding of deep learning fundamentals.",
          nextSteps:
            "Extend to convolutional layers and experiment with performance benchmarking against PyTorch implementations.",
        },
      },
      {
        id: "project-2",
        title: "Google Drive Clone",
        impact:
          "Built a full-stack cloud storage application with authentication and real-time file handling.",
        metrics: [
          "Implemented secure user authentication",
          "Enabled real-time file uploads & downloads",
          "Integrated Firebase storage & database services",
        ],
        stack: ["React.js", "Firebase", "JavaScript", "HTML", "CSS"],
        link: "https://github.com/dillman10/gmail-clone",
        caseStudy: {
          problem:
            "Users need simple, reliable cloud storage solutions with secure authentication and real-time data syncing.",
          role: "Full-Stack Developer. Designed frontend UI and implemented backend cloud storage integration.",
          process:
            "Built a responsive React frontend. Integrated Firebase Authentication for user login and Firebase Storage for file uploads/downloads. Structured cloud database to support real-time file updates and user-specific storage.",
          results:
            "Delivered a functional cloud storage app replicating core Google Drive features including authentication and file management.",
          nextSteps:
            "Add file sharing permissions, folder hierarchies, and usage analytics dashboard.",
        },
      },
      {
        id: "project-3",
        title: "AI Decision Assistant (Next Action)",
        impact:
          "Developed and deployed a production-ready AI web app for personalized task generation.",
        metrics: [
          "Integrated Claude API with structured LLM validation",
          "Implemented time-aware scoring & uniqueness filtering",
          "Deployed to Vercel with secure environment configuration",
        ],
        stack: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "Claude API",
          "NextAuth",
        ],
        link: "https://next-action-blq8nryou-dillon-schaffers-projects.vercel.app/",
        caseStudy: {
          problem:
            "People struggle with decision fatigue and often waste time determining their next productive action.",
          role: "Full-Stack Developer. Designed system architecture, AI integration, database schema, and deployment pipeline.",
          process:
            "Built a Next.js + TypeScript frontend with responsive mobile optimization. Integrated Claude API with structured output validation and scoring logic to generate personalized next-step recommendations. Implemented authentication using NextAuth + Resend and managed relational data with PostgreSQL + Prisma.",
          results:
            "Successfully deployed a production-grade AI web app capable of generating personalized, context-aware action recommendations.",
          nextSteps:
            "Introduce user behavior tracking to refine recommendation accuracy and implement feedback loops for model improvement.",
        },
      },
    ],
  
    // 4. About Section
    about: {
      // 2-3 sentences max. Focus on how you work + what you optimize for.
      bio: "I'm a software engineering student who enjoys building full-stack and AI-driven applications from the ground up. I focus on writing clean, maintainable code and understanding the underlying systems I work with — whether that's implementing neural networks from scratch or deploying production-ready web apps.",
      // Small skills grid
      skills: [
        "Python",
        "HTML + CSS",
        "JavaScript",
        "React + Firebase",
        "Neural Networks",
        "Model Training & Evaluation",
        "Object Oriented Programming",
        "Data Structures & Algorithms",
      ],
    },
  };
  