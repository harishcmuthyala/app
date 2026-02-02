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
  resumeUrl: "https://drive.google.com/file/d/1RjfHp_tOuE_AtjEWsLR5NszeDI1VxnU8/view",
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
      "Collaborated with cross-functional teams to manage and deliver technology projects aligned with university strategic goals, ensuring project visibility and successful implementation.",
      "Led migration from FootPrints to TeamDynamix platform, enabling self-service IT request submission for 20,000+ students and faculty while configuring 3 workflow automation systems that replaced email-based processes with centralized dashboards—modernizing service delivery for 80+ IT staff."
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
      "Architected end-to-end Retrieval-Augmented Generation (RAG) pipeline that automated credit memo generation from financial documents, reducing underwriting time by 75% for Accenture’s banking clients.",
      "Deployed OpenSearch vector database with Titan embeddings to enable sub-second retrieval from complex financial documents, processing 200+ page reports into queryable insights for credit committee decision-making.",
      "Engineered few-shot prompt templates with domain-specific examples, achieving compliance-ready credit memo generation with accurate financial notation including bracketed negatives and industry-standard formatting.",
      "Built robust ETL pipelines in Pandas for preprocessing financial data, implementing data quality checks and chunking strategies that maintained 99%+ accuracy in extracting structured data from diverse financial statements."
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
      "Engineered an end-to-end ML automation platform using CloudFormation templates that deploys SageMaker Autopilot pipelines in isolated VPC environments, automatically generating scalable API endpoints from user-uploaded S3 datasets without manual intervention.",
      "Implemented real-time data and model quality monitoring via SageMaker Model Monitor, detecting drift by comparing live inference data against baseline statistics from ground truth datasets.",
      "Built end-to-end QuickSight migration platform with web UI for CloudFormation deployment and RESTful API for automated cross-region dashboard transfers, reducing migration time from hours to minutes."
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "LLM Inference Acceleration Research",
    description: "Researched a hybrid approach combining quantization and speculative decoding to achieve speedup in LLM inference while maintaining accuracy.",
    details: [
      "Conducted systematic review of 22 research papers on LLM inference acceleration, comparing quantization and speculative decoding techniques across performance metrics (speed, memory, accuracy) to identify optimal optimization strategies.",
      "Identified that hybrid approaches combining both techniques achieve 2.6× speedup and 45% memory reduction while maintaining 99% accuracy outperforming individual methods by addressing complementary bottlenecks.",
      "Determined synergistic mechanism: quantization frees memory enabling deeper speculation, while draft-verify correction preserves accuracy despite compression—findings validated by production deployments at Google and IBM."
    ],
    technologies: ["Quantization", "Speculative Decoding"],
    category: "Research"
  },
  {
    id: 2,
    title: "LLM Performance & Efficiency Visualization",
    description: "Interactive visualization project analyzing performance, efficiency, and environmental impact of Large Language Models to guide informed model selection.",
    details: [
      "Analyzed model architectures (Llama, Qwen2, Mistral) across multiple benchmarks including IFEval, BBH, GPQA, MMLU, and MATH",
      "Explored precision impact (float16 vs bfloat16) revealing bfloat16 performs better for most model types",
      "Visualized CO2 emissions correlation with model performance, emphasizing responsible AI development",
      "Demonstrated that architecture and design matter more than parameter count for model performance"
    ],
    technologies: ["Python", "R", "Rawgraphs", "Data Visualization", "Hugging Face"],
    category: "Research",
    link: "https://www.linkedin.com/posts/harish-muthyala_visualization-on-large-language-models-activity-7419407994133770240-LeUy"
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
    title: "MLOps Pipeline for Enterprise",
    description: "End-to-end ML pipeline with automated model training, deployment, and monitoring for enterprise-scale applications.",
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
    specializations: ["Machine Learning", "Generative AI", "Image Processing"]
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
    icon: "Cloud",
    link: "https://www.linkedin.com/posts/harish-muthyala_aws-certified-solutions-architect-associate-activity-7185641445817565184-Iujx"
  },
  {
    id: 2,
    name: "Accenture Trailblazer Award",
    issuer: "Accenture - FY24 Q1",
    icon: "Award",
    link: "https://www.linkedin.com/posts/harish-muthyala_trailblazer-activity-7168496550732554240-D8LT"
  },
  {
    id: 3,
    name: "AWS Article",
    issuer: "Amazon CodeWhisperer at Accenture",
    icon: "FileText",
    link: "https://www.linkedin.com/posts/nino-leenus-764455aa_how-accenture-is-using-amazon-codewhisperer-activity-7052485126248640512-d8-_"
  },
  {
    id: 4,
    name: "Hawks Scholarship",
    issuer: "University of Houston",
    icon: "GraduationCap",
    link: null
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
