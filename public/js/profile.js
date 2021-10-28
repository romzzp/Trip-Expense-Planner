const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#trip-name').value.trim();
  const needed_budget = document.querySelector('#trip-budget').value.trim();
  const description = document.querySelector('#trip-desc').value.trim();

  if (name && needed_budget && description) {
    const response = await fetch(`/api/trips`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_budget, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create trip');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/trips/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete trip');
    }
  }
};

document
  .querySelector('.new-trip-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.trip-list')
  .addEventListener('click', delButtonHandler);
