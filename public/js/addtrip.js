const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector('#trip-name').value.trim();
  const city = document.querySelector('#trip-city').value.trim();
  const country = document.querySelector('#trip-country').value.trim();
  const startdate = document.querySelector('#trip-date').value.trim();
  const duration = document.querySelector('#trip-duration').value.trim();

  if (description && city && country && startdate && duration) {

    let destination_id;

    const destQuery = await fetch(`/destination/${city}@${country}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const destinations = await destQuery.json();

    if (destinations && destinations.length > 0) {
        destination_id = destinations[0].id;
    } else {
        const responseNew = await fetch(`/api/destination`, {
            method: 'POST',
            body: JSON.stringify({ city, country }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!responseNew.ok) {
            alert('Failed to add new destination.');
        } else {
            const destinations = await responseNew.json();
            destination_id = destinations.id;
        }
    }

    const response = await fetch('/api/trip/addtrip', {
      method: 'POST',
      body: JSON.stringify({ description, startdate, duration, destination_id }),
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


document
  .querySelector('.new-trip-form')
  .addEventListener('submit', newFormHandler);

