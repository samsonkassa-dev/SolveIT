/* reaveal on scroll section*/
ScrollReveal().reveal('#section1', {
    reset: true,
    delay: 150,
    distance: '100px',
    origin: 'left'
});
ScrollReveal().reveal('#section2', {
    reset: true,
    delay: 250,
    distance: '50px',
    scale: 0.85
});
ScrollReveal().reveal('#section3', {
    reset: true,
    delay: 350,
    distance: '50px',
    scale: 0.85
});
ScrollReveal().reveal('#section4', {
    reset: true,
    delay: 500,
    scale: 0.85
});
ScrollReveal().reveal('#section5', {
    reset: true,
    origin: 'left'
});

/* typewriter animation */
var i = 0;
var txt = 'Hey, Do you need help?';
var speed = 50;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("help-text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();

/* smooth scrolling */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        if (e.target.classList.contains('side')) {
            document.querySelector('.help-sidebar').classList.add('hidden-sidebar');
        }

    });
});

/* Add a background to the nav bar on scroll */
var scrollpos = window.scrollY;
var header = document.querySelector(".hh-nav");
var header_height = header.offsetHeight;
var add_class_on_scroll = () => header.classList.add("nav-gradient-background");
var remove_class_on_scroll = () => header.classList.remove("nav-gradient-background");
window.addEventListener('scroll', function () {
    scrollpos = window.scrollY;
    var page_title = document.querySelector('.page-title');
    if(page_title){
        if (scrollpos >= header_height) {
            add_class_on_scroll();
            page_title.classList.remove('invisible');
        } else {
            remove_class_on_scroll();
            page_title.classList.add('invisible');
        }
    }
    
});

/* sidebar reveal */
document.getElementById('showSidebar').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.help-sidebar').classList.toggle('hidden-sidebar');
});

document.querySelector('.help-sidebar').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.body.addEventListener('click', (e) => {
    var sidebar = document.querySelector('.help-sidebar')
    if (!e.target.classList.contains('help-sidebar') && sidebar) {
        sidebar.classList.add('hidden-sidebar');
    }
});
