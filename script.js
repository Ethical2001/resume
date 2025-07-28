// Terminal Functionality
const commandInput = document.getElementById('command-input');
const output = document.getElementById('output');

// Command data
const commands = {
    about: `\n<strong>about - Learn about me</strong>\n\nI'm Muhammad Talha Saeed, a motivated cybersecurity enthusiast and WordPress developer with hands-on experience in network security, penetration testing, and SOC operations. I combine my passion for cybersecurity with a solid foundation in programming, web development, and digital media, always striving to stay ahead in the fast-evolving tech landscape.`,
    projects: `\n<strong>projects - View my projects</strong>\n\n• DDoS Attack Detection & Recommendation System (Python + ML)\n• SQL Injection Detection System (Python + ML)\n• AI-Based Movie Recommendation System (Python)\n• Student & Library Management Systems (Java)\n• Portfolio Website (HTML, CSS, PHP)\n• E-commerce WordPress Websites (Delivered 20+ client projects via Fiverr)`,
    skills: `\n<strong>skills - See my technical skills</strong>\n\n<strong>Languages:</strong> Python, Java, JavaScript, HTML, CSS, Bootstrap\n<strong>Tools:</strong> WordPress, Wazuh, Metasploit, Nmap, John the Ripper, Hydra, OpenVAS, Cisco Packet Tracer\n<strong>Cybersecurity:</strong> Penetration Testing, SOC Analysis, Vulnerability Assessment, SIEM, Threat Detection, CTFs\n<strong>Database:</strong> SQL, PostgreSQL\n<strong>Design:</strong> Canva, Adobe Photoshop`,
    experience: `\n<strong>experience - My work experience</strong>\n\n<strong>SOC Analyst, Defence Housing Authority</strong>\nHands-on SOC experience: implemented firewalls, IDS/IPS, conducted reconnaissance & penetration testing on Windows & Linux environments.\n\n<strong>Cybersecurity Intern, KaiRiz Cyber Technologies</strong>\nPerformed real-world penetration testing, vulnerability scanning, and CVE analysis on live systems.\n\n<strong>WordPress Developer, Freelancing on Fiverr</strong>\nCreated secure and responsive websites, tailored e-commerce solutions, and custom UIs with client satisfaction and SEO in mind.\n\n<strong>Digital Media Intern, Liverify</strong>\nCreated social media content, scheduled campaigns, and assisted in brand promotion via digital storytelling.`,
    contact: `\n<strong>contact - How to reach me</strong>\n\n<strong>Email:</strong> mtalhasaeed88@gmail.com\n<strong>Phone:</strong> +92-349-5305079\n<strong>LinkedIn:</strong> linkedin.com/in/talhachoudhary`,
    education: `\n<strong>education - My educational background</strong>\n\n<strong>BS Computer Science</strong>\nNational University of Modern Languages (NUML), Rawalpindi\n\n<strong>Additional Learning:</strong>\n- Continuous professional development in cybersecurity\n- Self-guided study in ethical hacking and penetration testing\n- Regular participation in CTF competitions and security workshops`,
    certifications: `
<strong>certifications - View my certifications</strong><br><br>

• CompTIA Security+ (Udemy)<br>
<img src="images/security-plus.png" alt="CompTIA Security+" style="width:200px; border-radius:10px;"><br><br>

• SQL Injection (EC-Council)<br>
<img src="images/sql-injection.png" alt="SQL Injection" style="width:200px; border-radius:10px;"><br><br>

• 5th Position in CTF (Military College of Signals – MCS)<br>
<img src="images/ctf-mcs.jpg" alt="CTF Certificate" style="width:200px; border-radius:10px;"><br><br>

• Completed150+ rooms on TryHackMe<br>
<img src="images/tryhackme.jpg" alt="TryHackMe" style="width:200px; border-radius:10px;"><br>
`,

    leadership: `\n<strong>leadership - Leadership and community involvement</strong>\n\n• Ranked 5th in Capture The Flag (CTF) competition at MCS, showcasing competitive cyber skills.\n• Regular participant in cybersecurity communities via TryHackMe and CTF events, demonstrating ongoing involvement and commitment to learning and sharing knowledge.`,
    help: `\n<strong>help - Available commands</strong>\n\nabout - Learn about me\nprojects - View my projects\nskills - See my technical skills\nexperience - My work experience\ncontact - How to reach me\neducation - My educational background\ncertifications - View my certifications\nleadership - Leadership and community involvement\nclear - Clear the terminal\nexit - Close the website\n\nType any command to continue...`,
    clear: ``,
    exit: ``
};

// Handle command input
commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        this.value = '';
        
        const prompt = document.createElement('div');
        prompt.className = 'terminal-prompt';
        prompt.innerHTML = `<span class="user">talha@portfolio:~$</span> <span class="command">${command}</span>`;
        output.appendChild(prompt);
        
        if (commands.hasOwnProperty(command)) {
            if (command === 'clear') {
                output.innerHTML = '';
            } else if (command === 'exit') {
                window.close();
                typeWriter(`\nTo fully exit, please close this browser tab/window.`, output);
            } else {
                typeWriter(commands[command], output);
            }
        } else {
            typeWriter(`\nCommand not found: ${command}. Type 'help' for available commands.`, output);
        }
        
        output.scrollTop = output.scrollHeight;
    }
});

// Typewriter effect
function typeWriter(text, element) {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'typewriter';
    element.appendChild(outputDiv);
    
    let i = 0;
    const speed = 10;
    
    function type() {
        if (i < text.length) {
            if (text.substring(i, i+1) === '<') {
                const tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    outputDiv.innerHTML += text.substring(i, tagEnd+1);
                    i = tagEnd+1;
                }
            } else {
                outputDiv.innerHTML += text.substring(i, i+1).replace(/\n/g, '<br>');
                i++;
            }
            setTimeout(type, speed);
        } else {
            outputDiv.classList.remove('typewriter');
        }
    }
    
    type();
}

// Elastic Hanging Card with Swing
const card = document.getElementById('idCard');
const hangingString = document.getElementById('hangingString');
const frontImage = document.getElementById('frontImage');
const backImage = document.getElementById('backImage');
let isDragging = false;
let startX, startY;
let swingInterval;

// Start swinging when mouse leaves card
card.addEventListener('mouseleave', () => {
    if (!isDragging) {
        startSwinging();
    }
});

// Stop swinging when mouse enters
card.addEventListener('mouseenter', () => {
    stopSwinging();
});

function startSwinging() {
    if (!swingInterval) {
        card.classList.add('swing');
    }
}

function stopSwinging() {
    card.classList.remove('swing');
    clearInterval(swingInterval);
    swingInterval = null;
}

function updateCardPosition(x, y) {
    // Only the bottom part of the string moves
    const stringAngle = Math.atan2(x, 120) * (180 / Math.PI);
    hangingString.style.transform = `
        translateX(-50%)
        rotate(${stringAngle}deg)
    `;
    
    // Card moves with physics
    const distance = Math.sqrt(x * x + y * y);
    const maxStretch = 200;
    const stretchFactor = Math.min(distance / maxStretch, 1);
    const dampedX = x * (1 - stretchFactor * 0.3);
    const dampedY = y * (1 - stretchFactor * 0.3);
    
    card.style.transform = `
        translate(${dampedX}px, ${dampedY}px)
        rotateY(${dampedX * 0.5}deg)
        rotateX(${dampedY * 0.1}deg)
    `;
}

// Mouse down event
card.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    stopSwinging();
    card.style.transition = 'none';
    hangingString.style.transition = 'none';
    e.preventDefault();
});

// Mouse move event
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    updateCardPosition(deltaX, deltaY);
});

// Mouse up event
document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    const deltaX = e.clientX - startX;
    
    card.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    hangingString.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Flip card if dragged enough
    if (Math.abs(deltaX) > 100) {
        const flipDirection = deltaX > 0 ? 180 : -180;
        card.style.transform = `rotateY(${flipDirection}deg)`;
    } else {
        card.style.transform = 'translate(0, 0) rotateY(0) rotateX(0)';
        startSwinging();
    }
    
    hangingString.style.transform = 'translateX(-50%) rotate(0)';
});
 
    // Touch events for mobile support
    card.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        
        card.style.transition = 'none';
        hangingString.style.transition = 'none';
        
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        updateCardPosition(deltaX, deltaY);
        
        e.preventDefault();
    });
    
    document.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        isDragging = false;
        
        card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        hangingString.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        card.style.transform = 'translate(0px, 0px) rotate(0deg)';
        hangingString.style.height = '100px';
        hangingString.style.transform = 'translateX(-50%) rotate(0deg)';
    });


// Update date and time every second
function updateDateTime() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    datetime.innerHTML = `${dateString}<br>${timeString}`;
}
setInterval(updateDateTime, 1000);
updateDateTime(); // Initialize immediately
setupImageUpload(frontImage);
setupImageUpload(backImage);

// Start swinging initially
startSwinging();