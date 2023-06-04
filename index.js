function toggleNavMenu() {
    var nav = document.getElementById("myNav");
    if (nav.className === "nav") {
      nav.className += " responsive";
      document.getElementById('myHeader').className = "responsive";
    } else {
      nav.className = "nav";
      document.getElementById('myHeader').className = "";
    }
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  console.log('I am here');
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetElement = document.querySelector(this.getAttribute('href'));
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
