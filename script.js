function rcSubmitContactForm() {
  const firstNameEl = document.getElementById('rc-first-name');
  const emailEl      = document.getElementById('rc-email');
  const phoneEl      = document.getElementById('rc-phone');
  const questionEl   = document.getElementById('rc-question');
  const btn          = document.getElementById('rc-send-btn');
  const errEl        = document.getElementById('rc-error');
  const formCard     = document.getElementById('rc-form-card');
  const thankyou     = document.getElementById('rc-thankyou');

  errEl.style.display = 'none';

  const firstName = firstNameEl.value.trim();
  const email     = emailEl.value.trim();
  const phone     = phoneEl.value.trim();
  const question  = questionEl.value.trim();

  if (!firstName) {
    errEl.textContent = 'Please enter your first name.';
    errEl.style.display = 'block';
    firstNameEl.focus();
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block';
    emailEl.focus();
    return;
  }

  btn.classList.add('loading');
  btn.disabled = true;

  fetch('https://services.leadconnectorhq.com/hooks/uhLI3atfL6jskyRIKRqT/webhook-trigger/7a80d743-b63e-482a-a584-5f7757fe0b69', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: firstName,
      email: email,
      phone: phone,
      question: question,
      tags: ['contact-form'],
      source: 'contact-page'
    })
  })
  .then(() => {
    formCard.style.display = 'none';
    thankyou.style.display = 'block';
  })
  .catch(() => {
    errEl.textContent = 'Something went wrong. Please try again.';
    errEl.style.display = 'block';
    btn.classList.remove('loading');
    btn.disabled = false;
  });
}
