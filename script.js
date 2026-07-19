const form = document.getElementById("trip-form");
form.addEventListener("submit",(e)=> {
    e.preventDefault();
    const trip = {
        id:Date.now() ,
        title:document.getElementById("trip-title").value ,
        destination:document.getElementById("trip-destination").value ,
        date:document.getElementById("trip-date").value ,
        coverUrl:document.getElementById("trip-image").value ,
        notes:document.getElementById("trip-notes").value ,
    };
        const trips = JSON.parse(localStorage.getItem("wanderlog_trips")) || [];
        localStorage.setItem("wanderlog_trips" , JSON.stringify([...trips,trip]));
        form.reset();
});