const form = document.getElementById("trip-form");
const tripsGrid = document.getElementById("trips-grid");
const emptyState = document.getElementById("empty-state");

function displayTrips() {
    const trips = JSON.parse(localStorage.getItem("wanderlog_trips")) || [];
    
    tripsGrid.innerHTML = "";
    
    if (trips.length === 0) {
        emptyState.style.display = "block";
        return;
    }
    
    emptyState.style.display = "none";
    
    trips.forEach(trip => {
        const card = document.createElement("div");
        card.className = "trip-card"; 
        
        card.innerHTML = `
            <img src="${trip.coverUrl || 'https://via.placeholder.com/300'}" alt="${trip.destination}" style="width:100%; border-radius:8px;">
            <h3>${trip.title}</h3>
            <p><strong>Destination:</strong> ${trip.destination}</p>
            <p><strong>Date:</strong> ${trip.date}</p>
            <p>${trip.notes}</p>
        `;
        
        tripsGrid.appendChild(card);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const trip = {
        id: Date.now(),
        title: document.getElementById("trip-title").value,
        destination: document.getElementById("trip-destination").value,
        date: document.getElementById("trip-date").value,
        coverUrl: document.getElementById("trip-image").value,
        notes: document.getElementById("trip-notes").value,
    };
    
    const trips = JSON.parse(localStorage.getItem("wanderlog_trips")) || [];
    localStorage.setItem("wanderlog_trips", JSON.stringify([...trips, trip]));
    
    form.reset();
    displayTrips();
});

displayTrips();
    
   