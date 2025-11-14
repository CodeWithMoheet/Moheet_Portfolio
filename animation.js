// Professional roles for typewriter effect
const roles = [
    'A Web Developer',
    'A Front End Developer',
    'A Software Engineer',
    'A UI/UX Designer',
    'A Full Stack Developer',
    'A WordPress Developer',
    'An AI API Integrator',
    'Working with n8n Workflows'
];

// Typewriter effect implementation
class TypeWriter {
    constructor(element, words) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        const typeSpeed = this.isDeleting ? 50 : 150;

        if (this.isDeleting) {
            this.txt = currentWord.substring(0, this.txt.length - 1);
        } else {
            this.txt = currentWord.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        if (!this.isDeleting && this.txt === currentWord) {
            this.isDeleting = true;
            setTimeout(() => this.type(), 2000); // Wait before starting to delete
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            setTimeout(() => this.type(), 500); // Wait before typing next word
        } else {
            setTimeout(() => this.type(), typeSpeed);
        }
    }
}

// Initialize TAOS for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-[50px]');
                entry.target.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-1000', 'ease-out');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
        section.classList.add('opacity-0', 'translate-y-[50px]');
        observer.observe(section);
    });

    // Initialize typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        new TypeWriter(typewriterElement, roles);
    }
});