var form = document.getElementById("registration-form");
var confirmation = document.getElementById("confirmation");
var list = document.getElementById("registration-list");
var emptyMessage = document.getElementById("empty-message");
var clearButton = document.getElementById("clear-all");

function showRegistrations() {
    var saved = localStorage.getItem("registrations");

    var registrations = saved ? JSON.parse(saved) : [];

    list.innerHTML = "";
    emptyMessage.hidden = registrations.length > 0;

    registrations.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.fullName + " | " + item.email + " | " +
            item.phone + " | " + item.eventChoice + " | " + item.hearAbout;
        list.appendChild(li);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();                    // this will stop the page from reloading

    var registration = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        eventChoice: document.getElementById("event-choice").value,
        hearAbout: document.querySelector('input[name="hearAbout"]:checked').value
    };

    var saved = localStorage.getItem("registrations");
    var registrations = saved ? JSON.parse(saved) : [];
    registrations.push(registration);

    localStorage.setItem("registrations", JSON.stringify(registrations));

    confirmation.textContent = "Thank you, " + registration.fullName +
        "! You are registered for " + registration.eventChoice + ".";
    form.reset();
    showRegistrations();
});

clearButton.addEventListener("click", function () {
    localStorage.removeItem("registrations");
    confirmation.textContent = "All registrations cleared.";
    showRegistrations();
});

showRegistrations();   // this will show anything that is already saved when the page loads