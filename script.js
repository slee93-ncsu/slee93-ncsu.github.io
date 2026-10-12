document.addEventListener('DOMContentLoaded', function() {
    // Load profile information
    loadProfileInfo();

    // Make all links open in a new tab
    makeAllLinksOpenInNewTab();

    // Set up MutationObserver to watch for dynamically added links
    setupLinkObserver();

    // Publication filters - including "First Author" for publications where user is first author or has equal contribution
    const filterBtns = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication');
    
    // Load publications data from JSON file
    loadPublications();
    loadRelatedPublications();
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter publications
            const pubElements = document.querySelectorAll('.publication');
            pubElements.forEach(pub => {
                if (filterValue === 'all') {
                    pub.style.display = 'flex';
                } else if (pub.classList.contains(filterValue)) {
                    pub.style.display = 'flex';
                } else {
                    pub.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply smooth scrolling to hash links (internal page links)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Update active class
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Path from the current page to the site root. Pages in a subfolder set
// <body data-root="../"> so shared data and assets resolve correctly.
function siteRoot() {
    return document.body.dataset.root || '';
}

// Function to load profile information
function loadProfileInfo() {
    const root = siteRoot();
    const isSubpage = root !== '';
    const profileJsonPath = root + 'data/profile-info.json';

    // Get profile-info container
    const profileInfoContainer = document.querySelector('.profile-info');
    if (!profileInfoContainer) return;

    fetch(profileJsonPath, { cache: 'no-cache' })
        .then(response => response.json())
        .then(data => {
            // Clear existing content
            profileInfoContainer.innerHTML = '';
            
            // Add name
            const nameElement = document.createElement('h1');
            nameElement.textContent = data.name;
            profileInfoContainer.appendChild(nameElement);
            
            // Add subtitle
            const subtitleElement = document.createElement('p');
            subtitleElement.className = 'subtitle';
            subtitleElement.innerHTML = data.subtitle;
            profileInfoContainer.appendChild(subtitleElement);
            
            // Add social links container
            const contactInfo = document.createElement('div');
            contactInfo.className = 'contact-info';
            
            // Add each social link
            data.socialLinks.forEach(link => {
                const linkContainer = document.createElement('p');
                const anchor = document.createElement('a');
                // Adjust URL paths for subpages
                if (isSubpage && link.url.startsWith('assets/')) {
                    anchor.href = root + link.url;
                } else {
                    anchor.href = link.url;
                }
                
                // Set target attribute - either from JSON or default to "_blank" for external links
                if (link.target) {
                    anchor.target = link.target;
                } else if (link.url && !link.url.startsWith('#')) {
                    anchor.target = '_blank';
                }
                
                // Fix SVG icon paths for subpages
                let iconHtml = link.icon;
                if (isSubpage && link.type === 'dblp') {
                    iconHtml = iconHtml.replace('src="assets/', 'src="' + root + 'assets/');
                }
                
                anchor.innerHTML = iconHtml;
                linkContainer.appendChild(anchor);
                contactInfo.appendChild(linkContainer);
            });
            
            profileInfoContainer.appendChild(contactInfo);
            
            // Update profile image if there's a profile-image container
            const profileImageContainer = document.querySelector('.profile-image img');
            if (profileImageContainer && data.profileImage) {
                profileImageContainer.src = root + data.profileImage;
                profileImageContainer.alt = data.name;
            }
        })
        .catch(error => {
            console.error('Error loading profile information:', error);
        });
}

// Build the card for one publication entry from data/publications.json
function createPublicationElement(pub) {
    const pubElement = document.createElement('div');
    const classes = ['publication', pub.type];
    if (pub.isFirstAuthor) classes.push('first-author');
    pubElement.className = classes.join(' ');

    const numberElement = document.createElement('span');
    numberElement.className = 'pub-number';
    numberElement.textContent = pub.number;

    const contentElement = document.createElement('div');
    contentElement.className = 'pub-content';

    const titleElement = document.createElement('h3');
    titleElement.textContent = pub.title;
    contentElement.appendChild(titleElement);

    const authorsElement = document.createElement('p');
    authorsElement.className = 'authors';
    authorsElement.innerHTML = pub.authors;
    contentElement.appendChild(authorsElement);

    if (pub.venue) {
        const venueElement = document.createElement('p');
        venueElement.className = 'venue';
        venueElement.textContent = pub.venue;
        contentElement.appendChild(venueElement);
    }

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'pub-tags';
    pub.tags.forEach(tag => {
        if (tag.link) {
            const tagLink = document.createElement('a');
            tagLink.href = tag.link;
            tagLink.className = `tag ${tag.class}`;
            tagLink.textContent = tag.text;
            if (!tag.link.startsWith('#')) {
                tagLink.setAttribute('target', '_blank');
            }
            tagsContainer.appendChild(tagLink);
        } else {
            const tagSpan = document.createElement('span');
            tagSpan.className = `tag ${tag.class}`;
            tagSpan.textContent = tag.text;
            tagsContainer.appendChild(tagSpan);
        }
    });
    contentElement.appendChild(tagsContainer);

    pubElement.appendChild(numberElement);
    pubElement.appendChild(contentElement);
    return pubElement;
}

function fetchPublications() {
    return fetch(siteRoot() + 'data/publications.json', { cache: 'no-cache' })
        .then(response => response.json());
}

// Function to load publications from JSON
function loadPublications() {
    const publicationsList = document.querySelector('.publications-list');
    if (!publicationsList) return;

    publicationsList.innerHTML = '';

    fetchPublications()
        .then(publications => {
            publications.forEach(pub => {
                publicationsList.appendChild(createPublicationElement(pub));
            });
        })
        .catch(error => {
            console.error('Error loading publications data:', error);
        });
}

// Fill each <div class="related-publications" data-pubs="P5,C13"> with the
// listed entries from data/publications.json, in the order given.
function loadRelatedPublications() {
    const containers = document.querySelectorAll('.related-publications[data-pubs]');
    if (containers.length === 0) return;

    fetchPublications()
        .then(publications => {
            const byNumber = new Map(publications.map(pub => [pub.number, pub]));
            containers.forEach(container => {
                container.innerHTML = '';
                container.dataset.pubs.split(',').map(id => id.trim()).forEach(id => {
                    const pub = byNumber.get(id);
                    if (pub) container.appendChild(createPublicationElement(pub));
                });
            });
        })
        .catch(error => {
            console.error('Error loading publications data:', error);
        });
}

// Function to render news items
function renderNewsItems(newsData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Add each news item to the container
    newsData.forEach(newsItem => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        
        // Create the date element
        const dateElement = document.createElement('div');
        dateElement.className = 'news-date';
        
        const dateHighlight = document.createElement('span');
        dateHighlight.className = 'year-highlight';
        dateHighlight.textContent = newsItem.date;
        dateElement.appendChild(dateHighlight);
        
        // Create the content element
        const contentElement = document.createElement('div');
        contentElement.className = 'news-content';
        
        // Create the title element
        const titleElement = document.createElement('h3');
        
        // Check if title contains HTML (like '<a href=')
        if (newsItem.title && newsItem.title.includes('<a href=')) {
            // Parse HTML in title
            titleElement.innerHTML = newsItem.title;
        } else {
            titleElement.textContent = newsItem.title;
        }
        
        contentElement.appendChild(titleElement);
        
        // Create the paragraph for content
        const paragraphElement = document.createElement('p');
        paragraphElement.innerHTML = newsItem.content;
        
        // Add links if provided in the links array format
        if (newsItem.links && newsItem.links.length > 0) {
            newsItem.links.forEach(link => {
                // Add a space if needed
                const space = document.createTextNode(' ');
                paragraphElement.appendChild(space);
                
                // Create link
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.textContent = link.text;
                // Add target="_blank" for external links
                if (link.url && !link.url.startsWith('#')) {
                    linkElement.setAttribute('target', '_blank');
                }
                paragraphElement.appendChild(linkElement);
            });
        }
        
        // Check for old style link (backward compatibility)
        if (newsItem.link && newsItem.linkText) {
            const space = document.createTextNode(' ');
            paragraphElement.appendChild(space);
            
            const linkElement = document.createElement('a');
            linkElement.href = newsItem.link;
            linkElement.textContent = newsItem.linkText;
            // Add target="_blank" for external links
            if (newsItem.link && !newsItem.link.startsWith('#')) {
                linkElement.setAttribute('target', '_blank');
            }
            paragraphElement.appendChild(linkElement);
        }
        
        contentElement.appendChild(paragraphElement);
        
        // Add date and content to the news item
        newsElement.appendChild(dateElement);
        newsElement.appendChild(contentElement);
        
        // Add the news item to the container
        container.appendChild(newsElement);
    });
}

// Function to make all links open in a new tab
function makeAllLinksOpenInNewTab() {
    // Get all links in the document
    const links = document.querySelectorAll('a');
    
    // Loop through each link
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Skip in-page anchors (#...), links without href, and the top menu,
        // whose links move between pages of this site
        if (href && !href.startsWith('#') && !link.closest('nav')) {
            // Set target to _blank to open in a new tab
            link.setAttribute('target', '_blank');
        }
    });
}

// Function to set up a MutationObserver to watch for new links
function setupLinkObserver() {
    // Select the target node (in this case, the entire document body)
    const targetNode = document.body;
    
    // Options for the observer (which mutations to observe)
    const config = { 
        childList: true, // observe direct children
        subtree: true, // and lower descendants too
        characterData: false, // don't care about text changes
        attributes: false // don't care about attribute changes
    };
    
    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Check if any new nodes were added
        let newLinksAdded = false;
        
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any of the added nodes are links or contain links
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) { // ELEMENT_NODE
                        if (node.tagName === 'A') {
                            newLinksAdded = true;
                            break;
                        } else if (node.querySelectorAll) {
                            const links = node.querySelectorAll('a');
                            if (links.length > 0) {
                                newLinksAdded = true;
                                break;
                            }
                        }
                    }
                }
            }
            
            if (newLinksAdded) break;
        }
        
        // If new links were added, update them to open in new tabs
        if (newLinksAdded) {
            makeAllLinksOpenInNewTab();
        }
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
} 