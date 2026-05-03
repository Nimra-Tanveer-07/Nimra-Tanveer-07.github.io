
//welcome 
window.addEventListener("load", () => {
    setTimeout(() => {
        const intro = document.getElementById("introScreen");
        intro.style.opacity = "0";
        intro.style.transition = "opacity 0.8s ease";

        setTimeout(() => intro.remove(), 800);
    }, 1800);
});

// intersection Observor
const reveals = document.querySelectorAll("section, .glass-panel");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});
//cursor 
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// receiving user's message in localstorage and then showing it in alert box
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        openPopup('Message Sent!', 'I will get back to you soon.');
        form.reset();
    } else {
        openPopup('Error', 'Message failed to send.');
    }
});

//arrow handling
window.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("projectSlider");
    const arrows = document.querySelectorAll("#projects button");

    if (slider.children.length <= 3) {
        arrows.forEach(btn => btn.style.display = "none");
    }
});

// PARTICLE GENERATOR
const particleContainer = document.getElementById("particles");

for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (5 + Math.random() * 10) + "s";
    p.style.animationDelay = Math.random() * 10 + "s";

    particleContainer.appendChild(p);
}
//open pop up message 
function openPopup(title, message) {
    document.getElementById("popupTitle").innerText = title;
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("popup").classList.remove("hidden");
}
//close pop up
function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

//responsiveness 
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuItems = document.querySelectorAll(".menu-item");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("translate-x-full");

    // animate only when opening
    if (!mobileMenu.classList.contains("translate-x-full")) {
        menuItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(20px)";

            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
                item.style.transition = "all 0.3s ease";
            }, index * 100);
        });
    }
});

// close when clicking any item
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
    });
});

//Editor Mode Toggle 
let toggleState = false; // false = off, true = on
const securityKey = "rayajeenu07@";
const toggleSwitch = document.getElementById("toggleSwitch");
const toggleCircle = document.getElementById("toggleCircle");
const cross = document.getElementById("cross");

toggleSwitch.addEventListener("click", () => {
    if (toggleState) {

        toggleState = false;

        // UI back to OFF
        toggleSwitch.classList.remove("bg-green-700");
        toggleSwitch.classList.add("bg-gray-400");

        toggleCircle.classList.remove("right-0.5", "bg-gray-400");
        toggleCircle.classList.add("left-0.5", "bg-green-700");

        openPopup("Editor Mode Disabled", "You exited editor mode.");

        return; // ❗ stop here (no popup input)
    }
    
    openPopup("SECURITY KEY", "Enter Security Key to Continue: ");

    const popupContent = document.getElementById("popupContent");
    const existingValue = document.getElementById("securityInput");
    if (existingValue)
        existingValue.remove();

    const existingInputField = document.getElementById("inputField");
    if (existingInputField)
        existingInputField.remove();

    const inputDiv = document.createElement("div");
    inputDiv.id = "inputField";
    inputDiv.classList.add("w-full", "relative", "mt-4");


    const input = document.createElement('input');
    input.type = "password";
    input.id = "securityKey";
    input.placeholder = "Enter Key....";
    input.classList.add(
        "w-full",
        "bg-gray-400",
        "placeholder-black/40",
        "focus-green",
        "text-black",
        "p-2",
        "pr-10",
        "rounded-full",
        "outline-none"
    );

    const tickBtn = document.createElement("button");
    tickBtn.id = "tickBtn";
    tickBtn.innerHTML = "✓";

    tickBtn.classList.add(
        "absolute",
        "right-2",
        "top-1/2",
        "-translate-y-1/2",
        "bg-green-600",
        "text-white",
        "w-7",
        "h-7",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "hover:bg-green-700"
    );

    tickBtn.onclick = () => {
        if (input.value === securityKey) {
            toggleState = true;
            inputDiv.remove();
            popupContent.classList.add("success-glow");

            setTimeout(() => {
                toggleSwitch.classList.remove("success-glow");
            }, 600);

            openPopup("ACCESS GRANTED", "Editor Mode is now Enabled");
            toggleSwitch.classList.remove("bg-gray-400");
            toggleSwitch.classList.add("bg-green-700");
            toggleCircle.classList.remove("left-0.5", "bg-green-700");
            toggleCircle.classList.add("bg-gray-400", "right-0.5");
            
        } else {

            inputDiv.remove();
            popupContent.classList.add("shake");

            setTimeout(() => {
               popupContent.classList.remove("shake");
            }, 400);
            openPopup("ACCESS DENIED", "You are Not the Owner!");
            
        }
    };

    inputDiv.appendChild(input);
    inputDiv.appendChild(tickBtn);
    popupContent.appendChild(inputDiv);
});