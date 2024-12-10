document.addEventListener('DOMContentLoaded', () => {
    const optInCheckbox = document.getElementById('sms-opt-in-cb');
    const smsForm = document.getElementById('smsForm');

    optInCheckbox.addEventListener('change', () => {
        if (optInCheckbox.checked) {
            smsForm.style.display = 'block'; // Show the phone number form
        } else {
            smsForm.style.display = 'none'; // Hide the phone number form
        }
    });
});