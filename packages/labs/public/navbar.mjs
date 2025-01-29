console.log("hello");



 function createNavbar(){
    const navbar = document.createElement("nav");
    navbar.classList.add("nav");

    const heading = document.createElement("h1");
    heading.textContent = "Saiyushi Kumar";
    heading.classList.add("nav-heading");

    const navList = document.createElement("ul");
    navList.classList.add("nav-list");

    const links = [
        { text: "Home", href: "index.html" },
        { text: "Hobbies", href: "hobbies.html"}
    ];

    links.forEach(link => {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");

        const anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.textContent = link.text;
        anchor.classList.add("nav-link");

        listItem.appendChild(anchor);
        navList.appendChild(listItem);
    });

    navbar.appendChild(navList);

    window.addEventListener("load", () => { 
        const oldNavbar = document.querySelector(".navbar");
        if (oldNavbar) {
            oldNavbar.replaceWith(navbar);
        } else {
            // Insert the new navbar at the top of the body
            document.body.prepend(navbar);
        }
    });
}
createNavbar();