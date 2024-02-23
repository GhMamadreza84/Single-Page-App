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
  window.history.pushState({ href }, "", `#${href}`);
  changePageContent(href);
};
// function to change content of container dynamicly
const changePageContent = async (href) => {
  contentContainer.innerHTML = "";
  const { page, title } = routerInfo[href];
  // fetch to current page
  const res = await fetch(page);
  const html = await res.text();

  // change html format from text into valid html
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  // check if new content is home page or another page
  const existHeader = doc.body.querySelector("#main-header");

  // if it was home page ,just add main content ( not header )
  if (existHeader) {
    const homeMainContent = doc.body.querySelector("#content-container");
    contentContainer.innerHTML = homeMainContent.outerHTML;
  } else {
    // if it was another page ,add whole html into container
    contentContainer.innerHTML = doc.body.outerHTML;
  }
  document.title = title;

  navLink.forEach((link) => {
    link.classList.remove("active");
    if (link.textContent.toLocaleLowerCase() === href) {
      link.classList.add("active");
    }
  });
};
// update content when click in go back button
window.addEventListener("popstate", (e) => {
  if (e.state === null) {
    changePageContent("home");
  } else {
    changePageContent(e.state.href);
  }
});
// update last loaded content when refresh
window.addEventListener("DOMContentLoaded", () => {
  const initialState = location.hash ? location.hash.substring(1) : "home";
  changePageContent(initialState);
});
