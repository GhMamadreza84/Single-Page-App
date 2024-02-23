const routerInfo = {
  home: {
    page: "./index.html",
    title: "Home Page",
  },
  blogs: {
    page: "./blogs.html",
    title: "Blog Page",
  },
  contact: {
    page: "./contact.html",
    title: "Contact Page",
  },
  courses: {
    page: "./courses.html",
    title: "Courses Page",
  },
};

// Elements
const navLink = document.querySelectorAll(".nav-link");
const contentContainer = document.getElementById("content-container");

navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href").substring(1);
    changeUrlRoute(href);
  });
});

const changeUrlRoute = (href) => {
  window.history.pushState({}, "", `#${href}`);
  changePageContent(href);
};

const changePageContent = async (href) => {
  contentContainer.innerHTML = "";
  const { page, title } = routerInfo[href];

  const res = await fetch(page);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  contentContainer.appendChild(doc.body);
};
