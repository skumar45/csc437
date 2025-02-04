import { attachShadow } from "./utils.mjs";

// Define the template for the header
const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
       .nav {
            display: flex;
            flex-direction: column;
            background-color: var(--color-nav-background);
            align-items: left;
        }

        .header {
            display: flex;
            background-color: var(--color-nav-background);
            align-items: center;
            gap: 1em;
            justify-content: space-between;
        }

        .heading {
            font-family: var(--font-family-secondary);
            font-weight: var(--font-weight-regular);
            font-style: var(--font-style-normal);
            font-size: var(--font-size-h1);
            color: var(--color-heading);
        }

        .nav-list {
            list-style: none;
            flex-direction: column;
            gap: 2em;
            padding: 0;
            margin: 0;
            display: none;
        }

        .nav-item {
            text-align: left;
        }

        .nav-link {
            color: white; 
            text-decoration: none; 
            font-weight: bold;
            padding: 5px 10px;
        }

        .nav-link.active {
            color: var(--color-heading);
            border-bottom: 3px solid var(--color-heading);
        }

        button {
            justify-content: right;
            width: 20%;
            height: 20%;
        }

        .nav-list.open {
            display: flex;
            gap: 1em;
            padding-bottom: 2em;
        }

        label {
        text-align: right;}


        /* desktop */
        @media (min-width: 768px) {
            .nav {
                display: flex;
                flex-direction: row;
                background-color: var(--color-nav-background);
                align-items: center;
            }

            button {
                display: none;
            }  

            .header{
                display: flex;
            }

            label {
                justify-content: right;
            }

            .nav-list {
                list-style: none;
                display: flex;
                flex-direction: row;
                gap: 15px;
                padding: 0;
                margin: 0;
            } 

            .nav-item {
                display: inline;
            }
        }   
    </style>
    <nav class="nav">
    <header class="header">
        <h1 class="heading">Saiyushi Kumar</h1>
        <label>
            <input type="checkbox" autocomplete="off" />
            Dark mode
        </label>
        <button type="button" class="menu-button">Menu</button> 
    </header>
        <ul class="nav-list">
            <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="hobbies.html" class="nav-link">Hobbies</a></li>
        </ul>
    </nav>
`;

// Define the custom element class
class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
    }

    connectedCallback() {
        this.highlightActiveLink();
        this.setupMenuToggle();
        this.setupDarkModeToggle();
    }

    highlightActiveLink() {
        const currentPage = window.location.pathname.split("/").pop();
        const links = this.shadowRoot.querySelectorAll(".nav-list a");

        links.forEach((link) => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }

    setupMenuToggle() {
        const menuButton = this.shadowRoot.querySelector(".menu-button");
        const navList = this.shadowRoot.querySelector(".nav-list");

        menuButton.addEventListener("click", () => {
            if (navList.classList.contains("open")) {
                navList.classList.remove("open");
            } else {
                navList.classList.add("open");
            }
        });

        document.addEventListener("click", (event) => {
            if (!this.contains(event.target)) {
                navList.classList.remove("open");
            }
        });
}

setupDarkModeToggle() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        checkbox.checked = true;
    }


    checkbox.addEventListener("change", (event) => {
        if (event.target.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });
}

}

customElements.define("my-header", MyHeader);