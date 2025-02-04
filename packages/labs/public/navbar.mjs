console.log("hello");


export function toHtmlElement(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstElementChild;
}

function createNavbar() {
    const navbar = toHtmlElement(`
        <nav class="nav">
            <h1 class="nav-heading">Saiyushi Kumar</h1>
            <ul class="nav-list">
                <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="hobbies.html" class="nav-link">Hobbies</a></li>
            </ul>
        </nav>
    `);
    
    window.addEventListener("load", () => {
        const oldNavbar = shadowRoot.querySelector(".nav");
        if (oldNavbar) {
            oldNavbar.replaceWith(navbar);
        } else {
            document.body.prepend(navbar);
        }

        highlightActiveLink();
    });
}
function highlightActiveLink() {
    const currentUrl = window.location.pathname;  // Get current URL path
    const links = shadowRoot.querySelectorAll('.nav-link');  // Get all nav links
    
    links.forEach(link => {
        if (link.href.endsWith(currentUrl)) {  // Match the link's href with the current page
            link.classList.add('active');  // Add 'active' class to the matching link
        } else {
            link.classList.remove('active');  // Ensure others are not highlighted
        }
    });
}

createNavbar();