// Selecting DOM Elements
const tripForm = document.getElementById("trip-form");
const tripsGrid = document.getElementById("trips-grid");
const emptyState = document.getElementById("empty-state");

// Function to display all saved trips from LocalStorage
function displayTrips() {
  const trips = JSON.parse(localStorage.getItem("wanderlog_trips")) || [];

  tripsGrid.innerHTML = "";

  // Show empty state if no trips exist
  if (trips.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  // Create card for each trip
  trips.forEach((trip) => {
    const card = document.createElement("div");
    card.className = "trip-card";

    const imageUrl = trip.coverUrl ? trip.coverUrl : "https://via.placeholder.com/300";

    card.innerHTML = `
      <img src="${imageUrl}" alt="${trip.destination}">
      <div class="card-content">
        <h3>${trip.title}</h3>
        <p><strong>Destination:</strong> ${trip.destination}</p>
        <p><strong>Date:</strong> ${trip.date}</p>
        <p>${trip.notes}</p>
        <button class="delete-btn" onclick="deleteTrip(${trip.id})">Delete</button>
      </div>
    `;

    tripsGrid.appendChild(card);
  });
}

// Event listener for form submission
tripForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newTrip = {
    id: Date.now(),
    title: document.getElementById("trip-title").value,
    destination: document.getElementById("trip-destination").value,
    date: document.getElementById("trip-date").value,
    coverUrl: document.getElementById("trip-image").value,
    notes: document.getElementById("trip-notes").value
  };

  const trips = JSON.parse(localStorage.getItem("wanderlog_trips")) || [];
  trips.push(newTrip);
  
  localStorage.setItem("wanderlog_trips", JSON.stringify(trips));

  tripForm.reset();
  displayTrips();
});

// Function to delete a trip
function deleteTrip(id) {
  let trips = JSON.parse(localStorage.getItem("wanderlog_trips")) || [];
  trips = trips.filter((trip) => trip.id !== id);
  
  localStorage.setItem("wanderlog_trips", JSON.stringify(trips));
  displayTrips();
}

// Initial call to load trips on page refresh
displayTrips();
    
   