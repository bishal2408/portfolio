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

function sendEmail(event)
{
  event.preventDefault(); 
  var params = {
    from_name: document.getElementById('name').value,
    email_id: document.getElementById('email').value,
    message: document.getElementById('message').value
  }
  const serviceId = 'service_1bsxwxf';
  const templateId = 'template_crmj3x4';

  emailjs.send(serviceId,templateId, params)
  .then(
    res => {
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('message').value = "";
      console.log(res);
      alert('Your message has been sent!');
    }
  ).catch((err) => console.log(err));
}



