
document.addEventListener("DOMContentLoaded", () => {
    const header = `
    <header class="header">
        <div class="header-container">
            <a href="index.html" class="brand">
                <img src="images/Dynamic Moving Truck Emblem1.png" alt="MoveEase Logo">
                <div>
                    <h2><span>MOVE</span>EASE</h2>
                    <small>PACKING & MOVING SERVICES</small>
                </div>
            </a>

            <nav class="navbar" id="navbar">
                <a href="index.html" class="nav-link">Home</a>
                <a href="about.html" class="nav-link">About Us</a>
                <a href="services.html" class="nav-link active">Services</a>
                <a href="blog.html" class="nav-link">Blog</a>
                <a href="pricing.html" class="nav-link">Pricing</a>
                <a href="contact.html" class="nav-link">Contact</a>
                <a href="login.html" class="nav-link">Dashboard</a>
            </nav>

            <div class="header-actions">
                <button class="icon-btn" id="rtlMode" type="button">RTL</button>
                <button class="icon-btn" id="themeBtn" type="button" aria-label="Toggle theme">
                    <i class="bi bi-moon"></i>
                </button>
                <a href="login.html" class="book-btn">Login</a>
            </div>

            <button class="menu-toggle" id="menuToggle" type="button" aria-label="Toggle menu">
                <i class="bi bi-list"></i>
            </button>
        </div>
    </header>`;

    const footer = `
    <footer class="footer">
        <div class="footer-container">
            <div>
                <h3>MOVE EASE</h3>
                <p>Your trusted partner for safe, reliable and affordable home and office relocation services.</p>
            </div>

            <div>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                </ul>
            </div>

            <div>
                <h3>Our Services</h3>
                <ul>
                    <li><a href="home-shifting.html">Home Shifting</a></li>
                    <li><a href="office-relocation.html">Office Relocation</a></li>
                    <li><a href="packing-services.html">Packing Services</a></li>
                    <li><a href="vehicle-transport.html">Vehicle Transport</a></li>
                    <li><a href="storage-services.html">Storage Services</a></li>
                </ul>
            </div>

            <div>
                <h3>Contact Us</h3>
                <p><i class="bi bi-telephone"></i> +91 98765 43210</p>
                <p><i class="bi bi-envelope"></i> support@moveease.com</p>
                <p><i class="bi bi-geo-alt"></i> Bengaluru, Karnataka</p>
            </div>
        </div>
        <div class="copyright">
            © 2026 MoveEase. All Rights Reserved.
        </div>
    </footer>`;

    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menuToggle.setAttribute(
            "aria-expanded",
            navbar.classList.contains("active")
        );
    });

    const themeBtn = document.getElementById("themeBtn");

    if (localStorage.getItem("moveease-theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = '<i class="bi bi-sun"></i>';
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        localStorage.setItem("moveease-theme", isDark ? "dark" : "light");

        themeBtn.innerHTML = isDark
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';
    });

    const rtlMode = document.getElementById("rtlMode");

    rtlMode.addEventListener("click", () => {
        const isRTL = document.documentElement.dir === "rtl";
        document.documentElement.dir = isRTL ? "ltr" : "rtl";
        localStorage.setItem("moveease-direction", isRTL ? "ltr" : "rtl");
    });

    const savedDirection = localStorage.getItem("moveease-direction");
    if (savedDirection) {
        document.documentElement.dir = savedDirection;
    }
});
