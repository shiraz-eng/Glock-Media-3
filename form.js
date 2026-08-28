const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const button = form.querySelector(".form-submit");

    button.disabled = true;
    button.innerHTML = "Sending...";

    emailjs.sendForm(
        "service_98ntudh",
        "template_vqqpwhf",
        this
    )

    .then(() => {

        success.style.display = "block";

        form.reset();

        button.disabled = false;
        button.innerHTML = "Send Message →";

        setTimeout(() => {
            success.style.display = "none";
        }, 5000);

    })

    .catch((error) => {

        console.error(error);

        alert("Something went wrong.");

        button.disabled = false;
        button.innerHTML = "Send Message →";

    });

});