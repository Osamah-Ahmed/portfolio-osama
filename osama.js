document.addEventListener("DOMContentLoaded", function () {
    /* ==== 1️⃣ الانتقال السلس عند الضغط على الروابط ==== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* ==== 2️⃣ تأثيرات الظهور عند التمرير ==== */
    let sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach(section => {
            if (!section.classList.contains("visible")) {
                let sectionTop = section.getBoundingClientRect().top;
                let windowHeight = window.innerHeight;
                if (sectionTop < windowHeight - 100) {
                    section.classList.add("visible");
                }
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // تأكد من استدعاء الدالة فور تحميل الصفحة

    /* ==== 3️⃣ تصغير الهيدر عند التمرير للأسفل ==== */
    let header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100 && header.style.height !== "70px") {
            header.style.height = "70px";
        } else if (window.scrollY <= 100 && header.style.height !== "100px") {
            header.style.height = "100px";
        }
    });

    /* ==== 4️⃣ زر العودة للأعلى ==== */
    if (!document.getElementById("backToTop")) {
        let backToTop = document.createElement("button");
        backToTop.id = "backToTop";
        backToTop.innerText = "⬆";
        backToTop.style.position = "fixed";
        backToTop.style.bottom = "20px";
        backToTop.style.right = "20px";
        backToTop.style.background = "#FFD700";
        backToTop.style.color = "#000";
        backToTop.style.border = "none";
        backToTop.style.padding = "10px 15px";
        backToTop.style.borderRadius = "5px";
        backToTop.style.cursor = "pointer";
        backToTop.style.display = "none";
        backToTop.style.fontSize = "20px";
        document.body.appendChild(backToTop);

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", function () {
            backToTop.style.display = window.scrollY > 300 ? "block" : "none";
        });
    }

    /* ==== 5️⃣ فورم إرسال المقترحات ==== */
    const suggestionForm = document.getElementById("suggestionForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    if (suggestionForm && confirmationMessage) {
        suggestionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            confirmationMessage.style.display = "block";

            setTimeout(() => {
                confirmationMessage.style.display = "none";
                suggestionForm.reset();
            }, 3000);
        });
    }

    /* ==== 6️⃣ تمييز القسم النشط في شريط التنقل ==== */
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks[index]?.classList.add("active-section");
            } else {
                navLinks[index]?.classList.remove("active-section");
            }
        });
    });

    /* ==== 7️⃣ شريط التقدم عند التمرير ==== */
    if (!document.querySelector(".scroll-progress")) {
        const progressBar = document.createElement("div");
        progressBar.className = "scroll-progress";
        document.body.appendChild(progressBar);

        window.addEventListener("scroll", () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    /* ==== 8️⃣ زر تفعيل الوضع الليلي ==== */
    if (!document.getElementById("darkModeToggle")) {
        const darkModeToggle = document.createElement("button");
        darkModeToggle.id = "darkModeToggle";
        darkModeToggle.innerHTML = "🌓";
        darkModeToggle.style.position = "fixed";
        darkModeToggle.style.top = "20px";
        darkModeToggle.style.left = "20px";
        document.body.appendChild(darkModeToggle);

        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
});
