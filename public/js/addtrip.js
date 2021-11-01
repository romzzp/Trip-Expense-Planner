const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#trip-name').value.trim();
  const description = document.querySelector('#trip-desc').value.trim();
  const dest = document.querySelector('#trip-destination').value.trim();
  const startDate = document.querySelector('#trip-date').value.trim();
  const tripDuration = document.querySelector('#trip-length').value.trim();
  const budget = document.querySelector('#trip-budget').value.trim();

  if (name && description && dest && startDate && tripDuration && budget) {
    const response = await fetch(`/mytrips`, {
      method: 'POST',
      body: JSON.stringify({ name, description, dest, startDate, tripDuration, budget }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/mytrips');
    } else {
      alert('Failed to create trip');
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/trips/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/mytrips');
//     } else {
//       alert('Failed to delete trip');
//     }
//   }
// };

document
  .querySelector('.new-trip-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.trip-list')
//   .addEventListener('click', delButtonHandler);
