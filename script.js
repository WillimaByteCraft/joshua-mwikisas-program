// Teacher Database
const teachers = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        age: 42,
        contact: "sarah.j@integrity.edu",
        phone: "+0978888782",
        experience: "15 years",
        specialties: ["english", "history"],
        competency: 92,
        bio: "Dedicated English and History teacher with a passion for literature and historical analysis.",
        status: "L/Stone Secondary School",
        passRate: 94
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        age: 38,
        contact: "m.chen@integrity.edu",
        phone: "+0978888782",
        experience: "12 years",
        specialties: ["math", "addmath"],
        competency: 96,
        bio: "Mathematics expert specializing in advanced calculus and algebraic structures.",
        status: "Woodlands A Secondary School",
        passRate: 98
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        age: 45,
        contact: "e.rodriguez@integrity.edu",
        phone: "+0978888782",
        experience: "18 years",
        specialties: ["history", "civics"],
        competency: 89,
        bio: "Social studies specialist with expertise in civic education and historical contexts.",
        status: "Kingsdomen Secondary School",
        passRate: 91
    },
    {
        id: 4,
        name: "Mr. James Wilson",
        age: 35,
        contact: "j.wilson@integrity.edu",
        phone: "+0978888782",
        experience: "8 years",
        specialties: ["computer", "math"],
        competency: 94,
        bio: "Computer science and mathematics teacher focusing on programming and algorithms.",
        status: "Tonemac Secondary School",
        passRate: 96
    },
    {
        id: 5,
        name: "Ms. Amanda Parker",
        age: 31,
        contact: "a.parker@integrity.edu",
        phone: "0978888782",
        experience: "6 years",
        specialties: ["english", "civics"],
        competency: 87,
        bio: "English literature and civic education teacher with innovative teaching methods.",
        status: "L/Stone Secondary School",
        passRate: 89
    },
    {
        id: 6,
        name: "Dr. Robert Kim",
        age: 48,
        contact: "r.kim@integrity.edu",
        phone: "+0978888782",
        experience: "20 years",
        specialties: ["addmath", "computer"],
        competency: 97,
        bio: "Advanced mathematics and computer studies expert with research background.",
        status:"MetalLands Secondary School",
        passRate: 99
    },
    {
        id: 7,
        name: "Mrs. Lisa Thompson",
        age: 39,
        contact: "l.thompson@integrity.edu",
        phone: "+0978888782",
        experience: "11 years",
        specialties: ["history", "english"],
        competency: 90,
        bio: "History and English teacher specializing in interdisciplinary approaches.",
        status: "L/Stone Secondary School",
        passRate: 92
    },
    {
        id: 8,
        name: "Mr. David Martinez",
        age: 33,
        contact: "d.martinez@integrity.edu",
        phone: "+0978888782",
        experience: "7 years",
        specialties: ["math", "computer"],
        competency: 93,
        bio: "Mathematics and computer science teacher with industry experience.",
        status: "L/Stone Secondary School",
        passRate: 95
    }
];

// DOM Elements
const teachersGrid = document.getElementById('teachersGrid');
const teacherCount = document.getElementById('teacherCount');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const applyFiltersBtn = document.getElementById('applyFilters');
const sortSelect = document.getElementById('sortSelect');
const teacherModal = document.getElementById('teacherModal');
const teacherProfile = document.getElementById('teacherProfile');
const closeModal = document.querySelector('.close');

// Filter checkboxes
const specialtyCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');

// Current filters state
let currentFilters = {
    specialties: ['english', 'math', 'addmath', 'history', 'civics', 'computer'],
    searchQuery: '',
    sortBy: 'competency'
};

// Initialize the application
function init() {
    renderTeachers();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    applyFiltersBtn.addEventListener('click', handleFilterApply);
    sortSelect.addEventListener('change', handleSortChange);
    closeModal.addEventListener('click', () => teacherModal.style.display = 'none');
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === teacherModal) {
            teacherModal.style.display = 'none';
        }
    });
}

// Handle search
function handleSearch() {
    currentFilters.searchQuery = searchInput.value.toLowerCase();
    renderTeachers();
}

// Handle filter application
function handleFilterApply() {
    const selectedSpecialties = Array.from(specialtyCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    currentFilters.specialties = selectedSpecialties;
    renderTeachers();
}

// Handle sort change
function handleSortChange() {
    currentFilters.sortBy = sortSelect.value;
    renderTeachers();
}

// Filter and sort teachers
function getFilteredTeachers() {
    let filtered = teachers.filter(teacher => {
        // Filter by search query
        const matchesSearch = currentFilters.searchQuery === '' || 
            teacher.name.toLowerCase().includes(currentFilters.searchQuery) ||
            teacher.specialties.some(specialty => 
                getSpecialtyDisplayName(specialty).toLowerCase().includes(currentFilters.searchQuery)
            );
        
        // Filter by specialties
        const matchesSpecialties = teacher.specialties.some(specialty => 
            currentFilters.specialties.includes(specialty)
        );
        
        return matchesSearch && matchesSpecialties;
    });
    
    // Sort teachers
    filtered.sort((a, b) => {
        switch (currentFilters.sortBy) {
            case 'competency':
                return b.competency - a.competency;
            case 'competency-asc':
                return a.competency - b.competency;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'experience':
                return parseInt(b.experience) - parseInt(a.experience);
            default:
                return 0;
        }
    });
    
    return filtered;
}

// Render teachers grid
function renderTeachers() {
    const filteredTeachers = getFilteredTeachers();
    
    teachersGrid.innerHTML = '';
    teacherCount.textContent = `${filteredTeachers.length} teachers`;
    
    if (filteredTeachers.length === 0) {
        teachersGrid.innerHTML = `
            <div class="no-results">
                <h3>No teachers found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    filteredTeachers.forEach(teacher => {
        const teacherCard = createTeacherCard(teacher);
        teachersGrid.appendChild(teacherCard);
    });
}

// Create teacher card element
function createTeacherCard(teacher) {
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.addEventListener('click', () => showTeacherProfile(teacher));
    
    const specialtiesHTML = teacher.specialties.map(specialty => 
        `<span class="specialty-badge">${getSpecialtyDisplayName(specialty)}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="teacher-header">
            <div class="teacher-name">${teacher.name}</div>
            <div class="teacher-age">${teacher.age} yrs</div>
        </div>
        
        <div class="teacher-specialties">
            ${specialtiesHTML}
        </div>
        
        <div class="teacher-stats">
            <div class="experience">${teacher.experience} experience</div>
            <div class="progress-circle">
                <div class="progress-bg"></div>
                <div class="progress-fill" style="transform: rotate(${(teacher.competency / 100) * 360}deg)"></div>
                <div class="progress-mask">${teacher.competency}%</div>
            </div>
        </div>
    `;
    
    return card;
}

// Show teacher profile in modal
function showTeacherProfile(teacher) {
    const specialtiesHTML = teacher.specialties.map(specialty => 
        `<span class="specialty-badge">${getSpecialtyDisplayName(specialty)}</span>`
    ).join('');
    
    teacherProfile.innerHTML = `
        <div class="profile-header">
            <h2 class="profile-name">${teacher.name}</h2>
            <div class="profile-title">${teacher.experience} Teaching Experience</div>
        </div>
        
        <div class="profile-details">
            <div class="detail-group">
                <h4>Personal Information</h4>
                <div class="detail-item">
                    <strong>Age:</strong>
                    <span>${teacher.age} years</span>
                </div>
                <div class="detail-item">
                    <strong>Contact:</strong>
                    <span>${teacher.contact}</span>
                </div>
                <div class="detail-item">
                    <strong>Phone:</strong>
                    <span>${teacher.phone}</span>
                </div>
                <div class="detail-item">
                    <strong>Works at:</strong>
                    <span>${teacher.status} currently</span>
                </div>
            </div>
            
            <div class="detail-group">
                <h4>Specialties</h4>
                <div class="teacher-specialties">
                    ${specialtiesHTML}
                </div>
                <div style="margin-top: 15px;">
                    <h4>Bio</h4>
                    <p style="color: #ccc; line-height: 1.6;">${teacher.bio}</p>
                </div>
            </div>
        </div>
        
        <div class="profile-competency">
            <div class="large-progress progress-circle">
                <div class="progress-bg"></div>
                <div class="progress-fill" style="transform: rotate(${(teacher.passRate / 100) * 360}deg)"></div>
                <div class="progress-mask">${teacher.passRate}%</div>
            </div>
            <div class="competency-label">Latest Pass Percentage</div>
            <p style="color: #ccc; margin-top: 10px;">Based on student performance metrics</p>
        </div>
    `;
    
    teacherModal.style.display = 'block';
}

// Get display name for specialty
function getSpecialtyDisplayName(specialty) {
    const names = {
        'english': 'English',
        'math': 'Mathematics',
        'addmath': 'Additional Math',
        'history': 'History',
        'civics': 'Civic Education',
        'computer': 'Computer Studies'
    };
    return names[specialty] || specialty;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);