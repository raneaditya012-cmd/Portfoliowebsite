"""Single source of truth for portfolio content."""

PROFILE = {
    "name": "Aditya Rane",
    "role": "Software Engineer",
    "company": "ICICI Lombard",
    "location": "Mumbai, India",
    "intro": (
        "Software engineer at ICICI Lombard, where I built the chatbot customers use to buy "
        "travel insurance on icicilombard.com. My other work includes an IEEE-published IoT "
        "fueling system and a drone swarm project built on ROS 2 and PX4."
    ),
    "about": [
        "I have a B.Tech in Electronics and Telecommunication Engineering, and my work has covered "
        "full-stack and backend development, cloud and data engineering, IoT and embedded systems.",
        "I am most interested in system design, distributed architectures, agentic AI and "
        "multi-agent systems, and autonomous robotics. I like understanding how a system works "
        "end to end before I build it.",
    ],
    "outside": "Outside work I play football, train at the gym, and follow robotics and AI research.",
    "facts": [
        ["Location", "Mumbai, India"],
        ["Education", "B.Tech, Electronics and Telecommunication"],
        ["Publication", "PetroConnect, published in IEEE"],
    ],
    "links": {
        "github": "https://github.com/raneaditya012-cmd",
        "linkedin": "https://www.linkedin.com/in/aditya-rane1012",
        "email": "raneaditya012@gmail.com",
    },
}

EXPERIENCE = [
    {
        "label": "Current", "title": "Software Engineer", "org": "ICICI Lombard",
        "text": "Built the travel insurance chatbot on icicilombard.com, which takes customers through buying a policy in a conversation.",
        "link": {"label": "See it live", "href": "https://www.icicilombard.com/travel-buying-chat/conversation"},
    },
    {
        "label": "Internship", "title": "Intern", "org": "The Sparks Foundation",
        "text": "Built a donation web application with Razorpay payment processing.",
        "link": None,
    },
    {
        "label": "Education", "title": "B.Tech, Electronics and Telecommunication Engineering", "org": "",
        "text": "PetroConnect, an IoT fueling system, was published in IEEE.",
        "link": None,
    },
]

SKILLS = [
    {"group": "Languages", "items": ["Python", "C++", "JavaScript"]},
    {"group": "Web", "items": ["React", "Node.js", "Express"]},
    {"group": "Data", "items": ["MongoDB", "PostgreSQL", "ETL pipelines", "Data warehousing"]},
    {"group": "Cloud", "items": ["AWS"]},
    {"group": "Embedded and IoT", "items": ["ESP32", "RFID"]},
    {"group": "Robotics", "items": ["ROS 2", "PX4", "Gazebo"]},
]

PROJECTS = [
    {
        "slug": "travel-insurance-chatbot", "title": "Travel Insurance Chatbot", "kind": "ICICI Lombard", "status": "Live",
        "blurb": "A chatbot on icicilombard.com that takes customers through buying a travel insurance policy.",
        "overview": "I built this as a software engineer at ICICI Lombard. Instead of a long form, the customer "
                    "answers questions in a conversation and finishes with a booked travel insurance policy. "
                    "It is live on the company website.",
        "highlights": ["Conversational flow for buying a travel insurance policy", "Running in production on icicilombard.com"],
        "stack": [],
        "links": {"Open the chatbot": "https://www.icicilombard.com/travel-buying-chat/conversation"},
    },
    {
        "slug": "petroconnect", "title": "PetroConnect", "kind": "IoT and embedded", "status": "Published in IEEE",
        "blurb": "An automated fueling system with RFID authentication, ESP32 hardware and a MERN web application.",
        "overview": "PetroConnect is an IoT-based automated fueling system. A customer is authenticated with an "
                    "RFID tag, an ESP32 controls the hardware, the device communicates with the server over a "
                    "secured channel, and a MERN-stack web application manages the system. The work was published in IEEE.",
        "highlights": ["RFID authentication", "ESP32 embedded hardware", "Secure device communication", "MERN-stack web application"],
        "stack": ["ESP32", "RFID", "MongoDB", "Express", "React", "Node.js"],
        "links": {},
    },
    {
        "slug": "aegis-mas", "title": "Aegis-MAS", "kind": "Autonomous robotics", "status": "In progress",
        "blurb": "An autonomous drone swarm project exploring multi-agent communication and coordination.",
        "overview": "Aegis-MAS is an ongoing drone swarm initiative. It explores how multiple agents communicate, "
                    "make decisions without a central controller, plan missions and coordinate autonomously, "
                    "using ROS 2 and PX4 with simulation in Gazebo.",
        "highlights": ["Multi-agent communication", "Distributed decision-making", "Mission planning", "Autonomous coordination"],
        "stack": ["ROS 2", "PX4", "Gazebo"],
        "links": {},
    },
    {
        "slug": "customer-behaviour-analytics", "title": "Customer Behaviour Analytics", "kind": "Data engineering", "status": "",
        "blurb": "An AWS data engineering project covering ingestion, ETL pipelines, warehousing and analytics.",
        "overview": "A data engineering project on AWS. Data is ingested, transformed through ETL pipelines, "
                    "loaded into a data warehouse and used for analytics on customer behaviour.",
        "highlights": ["Data ingestion", "ETL pipelines", "Data warehousing", "Analytics"],
        "stack": ["AWS"],
        "links": {},
    },
    {
        "slug": "wanderway", "title": "WanderWay", "kind": "Full-stack web", "status": "",
        "blurb": "A full-stack travel platform built on the MERN stack.",
        "overview": "WanderWay is a travel platform built end to end with MongoDB, Express, React and Node.js.",
        "highlights": [],
        "stack": ["MongoDB", "Express", "React", "Node.js"],
        "links": {},
    },
    {
        "slug": "donation-platform", "title": "Donation Platform", "kind": "The Sparks Foundation", "status": "",
        "blurb": "A donation web application with Razorpay payment processing, built during an internship.",
        "overview": "A web application for accepting donations, with payments handled through Razorpay. "
                    "I built it during my internship at The Sparks Foundation.",
        "highlights": [],
        "stack": ["Razorpay"],
        "links": {},
    },
]
