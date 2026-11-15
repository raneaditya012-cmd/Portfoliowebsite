"""Single source of truth for portfolio content. Edit freely."""

PROFILE = {
    "name": "Aditya Rane",
    "role": "Software Engineer",
    "location": "Mumbai, India",
    "tagline": "I build intelligent, scalable systems — from ESP32 firmware to drone swarms to the cloud.",
    "summary": (
        "B.Tech in Electronics & Telecommunication Engineering. I work at the intersection of "
        "software engineering, AI, robotics and autonomous technologies — full-stack, backend, "
        "cloud, data engineering, IoT and embedded systems."
    ),
    "interests": [
        "Software Engineering", "AI & Agentic Systems", "Autonomous Robotics",
        "Distributed Systems", "IoT", "System Architecture",
    ],
    "links": {
        "github": "https://github.com/",      # TODO: your handle
        "linkedin": "https://linkedin.com/",  # TODO: your handle
        "email": "mailto:you@example.com",    # TODO: your email
        "resume": "/resume.pdf",              # drop your PDF in frontend/public
    },
}

SKILLS = [
    {"group": "languages", "items": ["Python", "C++", "JavaScript"], "note": "Day-to-day languages across backend, embedded and web."},
    {"group": "frontend", "items": ["React"], "note": "Component-driven interfaces."},
    {"group": "backend", "items": ["Node.js", "Express", "REST APIs"], "note": "APIs and services."},
    {"group": "data", "items": ["MongoDB", "PostgreSQL", "ETL pipelines", "Data warehousing"], "note": "Modelling, pipelines and analytics."},
    {"group": "cloud", "items": ["AWS"], "note": "Ingestion, storage and compute."},
    {"group": "iot-embedded", "items": ["ESP32", "RFID", "Secure device comms"], "note": "Hardware that talks to software."},
    {"group": "robotics", "items": ["ROS 2", "PX4", "Gazebo"], "note": "Autonomy stack and simulation."},
    {"group": "exploring", "items": ["System design", "Distributed architectures", "Agentic AI", "Multi-agent systems", "Human-machine interaction"], "note": "What I read and tinker with."},
]

PROJECTS = [
    {
        "slug": "petroconnect", "status": "Published · IEEE", "title": "PetroConnect", "kind": "IoT · Embedded",
        "blurb": "IEEE-published automated fueling system with RFID authentication, ESP32 hardware and a MERN dashboard.",
        "story": "Fueling stations rely on manual verification. PetroConnect authenticates users via RFID, "
                 "talks to an ESP32 controller over a secured channel, and surfaces everything in a MERN web app.",
        "highlights": ["RFID-based user authentication", "ESP32 firmware with secure device communication",
                       "MERN-stack monitoring web app", "Peer-reviewed & published by IEEE"],
        "stack": ["ESP32", "RFID", "React", "Node.js", "MongoDB", "Express"],
        "stats": {"Published": "IEEE", "Layers": "HW + Web", "Auth": "RFID"},
        "featured": True, "links": {"paper": "#", "code": "#"},
    },
    {
        "slug": "aegis-mas", "status": "In progress", "title": "Aegis-MAS", "kind": "Autonomous Robotics",
        "blurb": "Autonomous drone swarm exploring multi-agent communication and distributed decision-making.",
        "story": "A swarm that plans missions and coordinates without a central brain — agents negotiate tasks, "
                 "share state and adapt, simulated in Gazebo with PX4 and ROS 2.",
        "highlights": ["Multi-agent communication", "Distributed decision-making", "Mission planning & coordination",
                       "Simulation-first workflow (Gazebo + PX4)"],
        "stack": ["ROS 2", "PX4", "Gazebo", "Python", "C++"],
        "stats": {"Agents": "Swarm", "Sim": "Gazebo", "Stack": "ROS 2"},
        "featured": True, "links": {"code": "#"},
    },
    {
        "slug": "customer-behaviour-analytics", "status": "Completed", "title": "Customer Behaviour Analytics", "kind": "Data Engineering",
        "blurb": "AWS data platform: ingestion, ETL pipelines, warehousing and analytics.",
        "story": "End-to-end pipeline that ingests raw behavioural events, transforms them through ETL, "
                 "lands them in a warehouse and exposes analytics.",
        "highlights": ["Event ingestion on AWS", "ETL pipelines", "Data warehouse modelling", "Analytics layer"],
        "stack": ["AWS", "Python", "SQL", "ETL", "Data Warehouse"],
        "stats": {"Cloud": "AWS", "Flow": "ETL", "Output": "Analytics"},
        "featured": False, "links": {"code": "#"},
    },
    {
        "slug": "wanderway", "status": "Completed", "title": "WanderWay", "kind": "Full-Stack · MERN",
        "blurb": "A full-stack travel platform built on the MERN stack.",
        "story": "A travel platform for discovering and planning trips, built end to end with the MERN stack.",
        "highlights": ["Full-stack MERN architecture", "REST API design", "Responsive React UI"],
        "stack": ["MongoDB", "Express", "React", "Node.js"],
        "stats": {"Stack": "MERN", "Type": "Platform", "Scope": "Full-stack"},
        "featured": False, "links": {"code": "#"},
    },
    {
        "slug": "donation-platform", "status": "Shipped · Internship", "title": "Donation Platform", "kind": "Web · Payments",
        "blurb": "Web app with Razorpay payment processing, built during an internship at The Sparks Foundation.",
        "story": "Built during my internship at The Sparks Foundation: a donation web app with secure Razorpay checkout.",
        "highlights": ["Razorpay payment integration", "Payment verification flow", "Internship delivery"],
        "stack": ["JavaScript", "Node.js", "Razorpay", "Web"],
        "stats": {"Payments": "Razorpay", "Where": "Sparks Fdn", "Type": "Internship"},
        "featured": False, "links": {"code": "#"},
    },
]

TIMELINE = [
    {"year": "now", "ref": "HEAD -> main", "title": "Software Engineer", "text": "Building across full-stack, cloud, data and autonomous systems."},
    {"year": "research", "ref": "tag: ieee", "title": "IEEE Publication — PetroConnect", "text": "IoT automated fueling system, published in IEEE."},
    {"year": "internship", "ref": "", "title": "The Sparks Foundation", "text": "Built a Razorpay-powered donation platform."},
    {"year": "degree", "ref": "origin", "title": "B.Tech, Electronics & Telecommunication", "text": "The hardware-meets-software foundation."},
]

HOBBIES = [
    {"icon": "football", "title": "Football", "text": "Playing and watching. Teamwork and positioning carry over to how I build systems."},
    {"icon": "gym", "title": "Fitness & Gym", "text": "Consistency over intensity — the same discipline I bring to shipping code."},
    {"icon": "tech", "title": "Emerging Tech", "text": "Always tinkering with the next thing in AI, robotics and software engineering."},
]
