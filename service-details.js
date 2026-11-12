
const serviceData = {
    "home-shifting": {
        category: "HOME RELOCATION",
        title: "Home Shifting Made Simple & Stress-Free.",
        highlight: "Stress-Free.",
        description: "Relocate your home with a well-organized moving experience. From apartments to independent houses and villas, plan every stage of your household move with care.",
        icon: "bi-house-door",
        overviewTitle: "A Better Way to Move Your Home",
        overview: "Moving to a new home is an important milestone. Our home shifting service is designed to help organize your household relocation, from preparing your belongings to coordinating transportation and delivery.",
        overview2: "Whether you're moving from a 1 BHK apartment or a spacious villa, you can plan your move according to your household requirements.",
        features: [
            ["bi-house-check", "Apartment & Villa Moves", "Moving support for apartments, independent houses and villas."],
            ["bi-box-seam", "Furniture Handling", "Organized handling of furniture and household essentials."],
            ["bi-boxes", "Room-wise Packing", "Keep your belongings grouped and labelled by room."],
            ["bi-truck", "Local & Intercity Moves", "Plan relocation between nearby locations or different cities."],
            ["bi-tools", "Furniture Setup", "Coordinate furniture dismantling and setup at the destination."],
            ["bi-clipboard-check", "Moving Coordination", "Keep your moving requirements and schedule organized."]
        ],
        process: [
            ["bi-clipboard-data", "Share Your Details", "Tell us about your home, locations and moving date."],
            ["bi-box-seam", "Prepare & Pack", "Organize household items and prepare them for transportation."],
            ["bi-truck", "Transport", "Coordinate the movement of your household belongings."],
            ["bi-house-check", "Settle In", "Receive your items and organize your new home."]
        ]
    },

    "office-relocation": {
        category: "BUSINESS MOVING",
        title: "Office Relocation Without the Unnecessary Downtime.",
        highlight: "Unnecessary Downtime.",
        description: "Plan your workplace relocation with an organized approach to moving desks, IT equipment, files and office essentials.",
        icon: "bi-building",
        overviewTitle: "Move Your Workplace with Confidence",
        overview: "Office relocation requires careful coordination to keep business activities organized. Our office moving service helps plan the movement of furniture, workstations, documents and equipment.",
        overview2: "From small offices to larger workplaces, plan the relocation around your team's requirements and preferred schedule.",
        features: [
            ["bi-calendar-week", "Flexible Scheduling", "Plan moving activities around suitable working hours."],
            ["bi-pc-display", "IT Equipment Care", "Organize the handling of computers and office equipment."],
            ["bi-file-earmark-text", "Document Organization", "Keep important files and records properly grouped."],
            ["bi-grid", "Workstation Moving", "Coordinate desk-by-desk relocation and setup."],
            ["bi-truck", "Office Transportation", "Plan the movement of office assets to the new location."],
            ["bi-diagram-3", "Move Coordination", "Organize moving tasks and workplace requirements."]
        ],
        process: [
            ["bi-building-check", "Office Assessment", "Identify the furniture, equipment and documents to move."],
            ["bi-clipboard-check", "Create a Plan", "Organize the moving schedule and responsibilities."],
            ["bi-truck", "Relocate Assets", "Coordinate packing, loading and transportation."],
            ["bi-pc-display", "Workplace Setup", "Arrange equipment and workstations at the new office."]
        ]
    },

    "packing-services": {
        category: "PROFESSIONAL PACKING",
        title: "Professional Packing for a Safer Moving Experience.",
        highlight: "Safer Moving Experience.",
        description: "Prepare your belongings for relocation with organized packing methods and suitable materials for everyday, delicate and valuable household items.",
        icon: "bi-box-seam",
        overviewTitle: "Give Every Belonging the Right Care",
        overview: "Packing is an important part of every relocation. Different belongings need different levels of attention and suitable packing materials.",
        overview2: "Organize your items with room-wise labels, protective wrapping and a clear packing plan to make unpacking easier at your destination.",
        features: [
            ["bi-box2", "Quality Packing Materials", "Choose suitable boxes and protective materials for your items."],
            ["bi-shield-check", "Fragile Item Protection", "Give crockery, glassware and delicate items extra attention."],
            ["bi-tags", "Labelled Boxes", "Identify packed items using clear room-wise labels."],
            ["bi-lamp", "Furniture Protection", "Prepare furniture and larger belongings for transportation."],
            ["bi-box-arrow-up", "Unpacking Assistance", "Organize unpacking support at your destination."],
            ["bi-list-check", "Packing Checklist", "Keep track of items during the packing process."]
        ],
        process: [
            ["bi-search", "Identify Items", "Understand the items and packing requirements."],
            ["bi-box-seam", "Select Materials", "Prepare suitable boxes and protective materials."],
            ["bi-tags", "Pack & Label", "Pack items carefully and organize labels."],
            ["bi-box-arrow-up", "Unpack", "Unpack and arrange items at the new location."]
        ]
    },

    "loading-unloading": {
        category: "MOVING HANDLING",
        title: "Careful Loading & Unloading for Every Move.",
        highlight: "Every Move.",
        description: "Organize the movement of furniture, boxes and household essentials with a planned loading and unloading process.",
        icon: "bi-boxes",
        overviewTitle: "A Well-Organized Moving Process",
        overview: "Loading and unloading are important stages of relocation. Items need to be organized before loading and carefully arranged when they reach their destination.",
        overview2: "Plan the movement of boxes, furniture and other belongings based on their size, handling needs and destination arrangements.",
        features: [
            ["bi-box-seam", "Box Handling", "Organized handling of packed household and office boxes."],
            ["bi-lamp", "Furniture Handling", "Plan the movement of furniture and larger items."],
            ["bi-truck", "Vehicle Loading", "Arrange belongings for transportation."],
            ["bi-house-check", "Destination Unloading", "Coordinate unloading at the new property."],
            ["bi-list-check", "Item Organization", "Use labels and lists to help identify belongings."],
            ["bi-people", "Moving Crew Coordination", "Plan handling tasks and movement responsibilities."]
        ],
        process: [
            ["bi-list-check", "Prepare Items", "Organize packed belongings before loading."],
            ["bi-box-seam", "Load Carefully", "Arrange belongings for the planned transportation."],
            ["bi-truck", "Move to Destination", "Coordinate transportation to the new location."],
            ["bi-house-check", "Unload Items", "Organize the unloading process at the destination."]
        ]
    },

    "vehicle-transport": {
        category: "VEHICLE RELOCATION",
        title: "Move Your Vehicle to Its New Destination.",
        highlight: "New Destination.",
        description: "Planning to relocate your car or two-wheeler? Organize vehicle transportation as part of your move with a clear process.",
        icon: "bi-car-front",
        overviewTitle: "Vehicle Moving, Planned Around Your Needs",
        overview: "Relocating to another city can also mean arranging transportation for your personal vehicle. A clear plan helps you understand the requirements before the vehicle is moved.",
        overview2: "Organize the vehicle details, collection and delivery arrangements, documentation and transportation coordination.",
        features: [
            ["bi-car-front", "Car Transportation", "Plan transportation arrangements for your car."],
            ["bi-bicycle", "Two-Wheeler Transport", "Organize moving arrangements for motorcycles and scooters."],
            ["bi-card-checklist", "Document Preparation", "Review the documents needed for vehicle transportation."],
            ["bi-camera", "Vehicle Condition Record", "Record the vehicle's condition before handover."],
            ["bi-geo-alt", "Route Coordination", "Plan collection and delivery locations."],
            ["bi-calendar-check", "Delivery Planning", "Coordinate the expected transportation schedule."]
        ],
        process: [
            ["bi-car-front", "Share Vehicle Details", "Provide the vehicle type and moving locations."],
            ["bi-card-checklist", "Prepare Documents", "Review required vehicle documents and details."],
            ["bi-truck", "Arrange Transport", "Coordinate the vehicle transportation."],
            ["bi-geo-alt", "Delivery", "Coordinate vehicle handover at the destination."]
        ]
    },

    "storage-services": {
        category: "STORAGE SOLUTIONS",
        title: "More Space for Your Belongings During a Move.",
        highlight: "During a Move.",
        description: "Need extra space before settling into your new location? Explore storage arrangements for belongings that cannot be moved immediately.",
        icon: "bi-boxes",
        overviewTitle: "Flexible Storage for Your Moving Journey",
        overview: "Sometimes your moving dates and property availability do not match. Storage can help bridge the gap between leaving your current location and settling into your new one.",
        overview2: "Organize your belongings, understand the storage requirements and plan access and collection arrangements before choosing a storage option.",
        features: [
            ["bi-box-seam", "Personal Belongings", "Organize household belongings for storage."],
            ["bi-building", "Furniture Storage", "Plan storage arrangements for furniture and larger items."],
            ["bi-shield-check", "Storage Preparation", "Prepare belongings with suitable packing and labels."],
            ["bi-calendar-range", "Flexible Duration", "Discuss storage duration based on your requirements."],
            ["bi-clipboard-check", "Inventory Organization", "Maintain a list of items placed in storage."],
            ["bi-truck", "Collection & Delivery", "Coordinate movement between your property and storage."]
        ],
        process: [
            ["bi-boxes", "List Your Items", "Identify the belongings that need storage."],
            ["bi-clipboard-check", "Plan Storage", "Discuss storage duration and requirements."],
            ["bi-box-seam", "Prepare Belongings", "Pack and organize items for storage."],
            ["bi-truck", "Arrange Collection", "Coordinate collection and later delivery."]
        ]
    }
};

const currentService = document.body.dataset.service;
const service = serviceData[currentService];

const app = document.getElementById("service-page");

if (!service || !app) {
    if (app) app.innerHTML = "<p>Service page not found.</p>";
} else {
    document.title = `${service.category} | MoveEase`;

    app.innerHTML = `
        <header class="sd-header">
            <a href="index.html" class="sd-logo">Move<span>Ease.</span></a>
            <nav class="sd-nav">
                <a href="index.html">Home</a>
                <a href="index.html#about">About Us</a>
                <a href="services.html">All Services</a>
                <a href="index.html#moving-tips">Moving Tips</a>
            </nav>
        </header>

        <section class="sd-hero">
            <div class="sd-hero-inner">
                <div class="sd-hero-content">
                    <span class="sd-eyebrow">
                        <i class="bi bi-stars"></i> ${service.category}
                    </span>
                    <h1>${service.title.replace(service.highlight,
                        `<span>${service.highlight}</span>`)}</h1>
                    <p class="sd-hero-copy">${service.description}</p>
                    <div class="sd-actions">
                        <a href="index.html#home-cta" class="sd-btn">
                            Get Started <i class="bi bi-arrow-up-right"></i>
                        </a>
                        <a href="services.html" class="sd-btn sd-btn-outline">
                            All Services <i class="bi bi-grid"></i>
                        </a>
                    </div>
                </div>

                <div class="sd-hero-visual">
                    <div class="sd-hero-orbit"></div>
                    <div class="sd-hero-icon">
                        <i class="bi ${service.icon}"></i>
                    </div>
                </div>
            </div>
        </section>

        <section class="sd-section">
            <div class="sd-container sd-overview-grid">
                <div class="sd-overview-copy">
                    <span class="sd-tag">SERVICE OVERVIEW</span>
                    <h2>${service.overviewTitle}</h2>
                    <p>${service.overview}</p>
                    <p>${service.overview2}</p>
                    <a href="index.html#home-cta" class="sd-btn">
                        Plan Your Move <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div class="sd-overview-visual">
                    <i class="bi ${service.icon}"></i>
                </div>
            </div>
        </section>

        <section class="sd-section sd-feature-section">
            <div class="sd-container">
                <div class="sd-heading">
                    <span class="sd-tag">WHAT'S INCLUDED</span>
                    <h2>Explore Our Service Features</h2>
                    <p>Moving support designed around the details that matter to your relocation.</p>
                </div>
                <div class="sd-feature-grid">
                    ${service.features.map(item => `
                        <article class="sd-feature-card">
                            <div class="sd-feature-icon">
                                <i class="bi ${item[0]}"></i>
                            </div>
                            <h3>${item[1]}</h3>
                            <p>${item[2]}</p>
                        </article>
                    `).join("")}
                </div>
            </div>
        </section>

        <section class="sd-section">
            <div class="sd-container">
                <div class="sd-heading">
                    <span class="sd-tag">HOW IT WORKS</span>
                    <h2>Four Steps to a Better Move</h2>
                    <p>A simple process to help you organize your moving requirements.</p>
                </div>
                <div class="sd-process-grid">
                    ${service.process.map((item, index) => `
                        <div class="sd-process-card">
                            <div class="sd-process-number">
                                <i class="bi ${item[0]}"></i>
                            </div>
                            <h3>${item[1]}</h3>
                            <p>${item[2]}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        </section>

        <section class="sd-benefits">
            <div class="sd-benefits-inner">
                <div class="sd-benefit">
                    <i class="bi bi-calendar-check"></i>
                    <div><strong>Organized Planning</strong><span>Plan your moving requirements clearly.</span></div>
                </div>
                <div class="sd-benefit">
                    <i class="bi bi-box-seam"></i>
                    <div><strong>Careful Handling</strong><span>Give your belongings the right attention.</span></div>
                </div>
                <div class="sd-benefit">
                    <i class="bi bi-headset"></i>
                    <div><strong>Moving Support</strong><span>Get help coordinating your move.</span></div>
                </div>
            </div>
        </section>

        <section class="sd-cta">
            <div class="sd-cta-inner">
                <span class="sd-tag">YOUR NEXT MOVE STARTS HERE</span>
                <h2>Let's Make Your Next Move <span>Easier.</span></h2>
                <p>${service.description}</p>
                <a href="index.html#home-cta" class="sd-btn">
                    Get Started with MoveEase
                    <i class="bi bi-arrow-up-right"></i>
                </a>
            </div>
        </section>

        <footer class="sd-footer">
            <div class="sd-footer-inner">
                <a href="index.html" class="sd-logo" style="color:white">Move<span>Ease.</span></a>
                <p>Making every move simpler.</p>
                <a href="services.html">Explore All Services <i class="bi bi-arrow-right"></i></a>
            </div>
        </footer>
    `;
}
