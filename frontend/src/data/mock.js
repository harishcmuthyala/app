// Mock data for Harish Muthyala's Portfolio

export const profileData = {
  name: "Harish Muthyala",
  title: "Generative AI Engineer",
  tagline: "Building production-ready ML/GenAI applications that transform industries",
  location: "Houston, TX",
  email: "harishcmuthyala@gmail.com",
  phone: "+1 (281) 965-2335",
  linkedin: "https://linkedin.com/in/harish-muthyala",
  github: "https://github.com/harishcmuthyala",
  profileImage: "https://customer-assets.emergentagent.com/job_e611e29c-5e13-4c3f-bd8d-8cbf16ab7906/artifacts/q110qoyq_1758485323492.png",
  bio: "Machine Learning Engineer with 3+ years of experience designing and delivering cloud-native AI/ML solutions. Passionate about LLM Inference optimization and building production-grade Generative AI applications. AWS Certified Solutions Architect with a proven track record of transforming proof-of-concepts into impactful client solutions."
};

export const experienceData = [
  {
    id: 1,
    role: "Project Analyst",
    company: "University of Houston",
    department: "Office of Information Technology",
    location: "Houston, TX",
    period: "Oct 2024 - Present",
    type: "current",
    highlights: [
      "Collaborating with cross-functional teams to manage and deliver technology projects aligned with university strategic goals",
      "Serving as internal SME for migrating IT service tools from FootPrints to TeamDynamix, affecting 80+ IT staff",
      "Significantly improving workflow visibility and tracking across departments"
    ]
  },
  {
    id: 2,
    role: "Generative AI Engineer",
    company: "Accenture AWS Business Group",
    department: "Senior Analyst - Velocity Team",
    location: "Hyderabad, India",
    period: "May 2023 - July 2024",
    type: "past",
    highlights: [
      "Architected RAG pipeline reducing manual underwriting processes by 75% for credit underwriting workflow",
      "Implemented OpenSearch Serverless vector DB with Titan embeddings for fast retrieval of structured client data",
      "Designed few-shot prompt templates improving accuracy for complex financial notations",
      "Engineered preprocessing pipelines using Pandas for robust and scalable ingestion of tabular financial data"
    ]
  },
  {
    id: 3,
    role: "Machine Learning Operations Engineer",
    company: "Accenture AWS Business Group",
    department: "Application Engineering Analyst",
    location: "Hyderabad, India",
    period: "Aug 2022 - Jan 2024",
    type: "past",
    highlights: [
      "Deployed SageMaker Autopilot pipelines in secure VPC environments for telecom customer churn prediction",
      "Implemented real-time model drift detection via SageMaker Model Monitor for proactive retraining",
      "Automated migration of QuickSight Dashboards across AWS accounts, preserving dataset integrity"
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "LLM Inference Acceleration Research",
    description: "Researched a hybrid approach combining quantization and speculative decoding to achieve speedup in LLM inference while maintaining accuracy.",
    details: [
      "Conducted comparative analysis across short-prompt and long-context workloads",
      "Addressed real-world deployment challenges in latency, memory, and cost optimization",
      "Validated synergies between draft-verify parallelization and low-precision computation"
    ],
    technologies: ["PyTorch", "CUDA", "Quantization", "Speculative Decoding"],
    category: "Research"
  },
  {
    id: 2,
    title: "Model Context Protocol (MCP)",
    description: "Comprehensive research and implementation on MCP architecture for LLM communication and context management.",
    details: [
      "Conducted comprehensive research on MCP architecture for LLM communication",
      "Implemented MCP client-server architecture enabling seamless LLM-application communication",
      "Created implementation examples showcasing file creation and Google Maps integration"
    ],
    technologies: ["Python", "Claude", "Langchain", "Research"],
    category: "AI/ML"
  },
  {
    id: 3,
    title: "RAG Pipeline for Credit Underwriting",
    description: "Production-grade Retrieval-Augmented Generation pipeline that transformed manual underwriting processes.",
    details: [
      "Reduced manual underwriting processes by 75%",
      "Integrated OpenSearch Serverless with Titan embeddings",
      "Designed scalable data ingestion pipelines for financial documents"
    ],
    technologies: ["AWS Bedrock", "OpenSearch", "LangChain", "Step Functions"],
    category: "GenAI"
  },
  {
    id: 4,
    title: "Telecom Churn Prediction System",
    description: "End-to-end ML pipeline for predicting customer churn in telecom industry with real-time monitoring.",
    details: [
      "Deployed SageMaker Autopilot in secure VPC environments",
      "Implemented real-time model drift detection",
      "Enabled API-based scalable inference for production use"
    ],
    technologies: ["SageMaker", "Model Monitor", "VPC", "MLOps"],
    category: "MLOps"
  }
];

export const skillsData = {
  languages: [
    { name: "Python", level: 95 },
    { name: "Java", level: 80 },
    { name: "C/C++", level: 75 },
    { name: "SQL", level: 85 },
    { name: "JavaScript", level: 70 }
  ],
  aiml: [
    { name: "LangChain", level: 90 },
    { name: "RAG Pipelines", level: 95 },
    { name: "MLOps", level: 85 },
    { name: "TensorFlow", level: 80 },
    { name: "PyTorch", level: 85 },
    { name: "Generative AI", level: 90 }
  ],
  cloud: [
    { name: "AWS S3", level: 90 },
    { name: "AWS Lambda", level: 85 },
    { name: "SageMaker", level: 90 },
    { name: "Bedrock", level: 90 },
    { name: "EC2/VPC", level: 85 },
    { name: "DynamoDB", level: 80 },
    { name: "QuickSight", level: 75 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 75 },
    { name: "VS Code", level: 95 },
    { name: "Jupyter", level: 90 },
    { name: "PostgreSQL", level: 80 }
  ]
};

export const educationData = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "University of Houston",
    location: "Houston, TX",
    period: "Aug 2024 - May 2026",
    gpa: "3.8/4.0",
    specializations: ["Machine Learning", "Generative AI", "Advanced Operating Systems"]
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Computer Science",
    institution: "Vellore Institute of Technology",
    location: "Vellore, India",
    period: "Jul 2018 - Apr 2022",
    gpa: null,
    specializations: ["Data Structures", "Software Engineering", "Computer Networks", "Artificial Intelligence"]
  }
];

export const certificationsData = [
  {
    id: 1,
    name: "AWS Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    icon: "Cloud"
  },
  {
    id: 2,
    name: "Accenture Trailblazer Award",
    issuer: "Accenture - FY24 Q1",
    icon: "Award"
  },
  {
    id: 3,
    name: "Hawks Scholarship",
    issuer: "University of Houston",
    icon: "GraduationCap"
  }
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" }
];
