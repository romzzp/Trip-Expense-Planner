const updateTripHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#trip-description').value.trim();
    const city = document.querySelector('#trip-city').value.trim();
    const country = document.querySelector('#trip-country').value.trim();
    const tripDate = document.querySelector('#trip-date').value.trim();
    const duration = document.querySelector('#trip-duration').value.trim();
    const id = document.querySelector('#trip-description').getAttribute('data-tripid');
    const status = "P";
    let destination_id;

    const destQuery = await fetch(`/destination/${city}@${country}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const destinations = await destQuery.json();
    console.log("Answer");
    console.log(destinations);

    if (destinations && destinations.length > 0) {
        destination_id = destinations[0].id;
        console.log(destination_id);
    } else {
        console.log("Create new destination");
        const responseNew = await fetch(`/api/destination`, {
            method: 'POST',
            body: JSON.stringify({ city, country }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(responseNew);

        if (!responseNew.ok) {
            alert('Failed to add new destination.');
        } else {
            const destinations = await responseNew.json();
            console.log(destinations);
            destination_id = destinations.id;
            console.log(destination_id);
        }
    }


    // if (description && tripDate && duration) {
    //     console.log("Update");
    //     const response = await fetch(`/api/trip/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ description, tripDate, duration, status, destination_id }),
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    //     console.log(response);

    //     if (response.ok) {
    //         document.location.replace('/mytrips');
    //     } else {
    //         alert('Failed to update trip.');
    //     }
    // }
};

const deleteTripHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#trip-description').getAttribute('data-tripid');

    const response = await fetch(`/api/trip/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/mytrips');
    } else {
        alert('Failed to delete blog.');
    }

};

const expenseFormHandler = async (event) => {
    event.preventDefault();
    console.log("New expense");
    const category = document.querySelector('#expense-category').value.trim();
    const budget = document.querySelector('#expense-budget').value.trim();
    const spent = document.querySelector('#expense-spent').value.trim();
    const trip_id = document.querySelector('#new-exp').getAttribute('data-tripid');
    console.log(trip_id);

    if (category) {
        const response = await fetch(`/api/expenses`, {
          method: 'POST',
          body: JSON.stringify({ trip_id, category, budget, spent }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace(`/trip/${trip_id}`);
        } else {
          alert('Failed to create project');
        }
      }
    
}

const updateExpenseHandler = async (event) => {
    event.preventDefault();
    console.log("Update ");
    console.log(event.target);
    console.log(event.target.getAttribute('data-expid'));
    const id = event.target.getAttribute('data-expid');
    console.log(id);
}

const updateDeleteExpenseHandler = async (event) => {
    event.preventDefault();
    const trip_id = document.querySelector('#new-exp').getAttribute('data-tripid');
    console.log(trip_id);
    console.log("Delete");
    console.log(event.target);
    console.log(event.target.getAttribute('data-expid'));
    const id = event.target.getAttribute('data-expid');
    console.log(id);
    console.log(event.target.className);
    if (event.target.className=="update"){
        let category = document.querySelector(`#expense-category-${id}`).value;
        let budget = document.querySelector(`#expense-budget-${id}`).value;
        let spent = document.querySelector(`#expense-spent-${id}`).value;
        console.log("Category:"+spent);
        let response ;
        if (spent){
            response = await fetch(`/api/expenses/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ trip_id: trip_id, category: category, budget: budget, spent:spent, id: id }),
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            response = await fetch(`/api/expenses/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ trip_id: trip_id, category: category, budget: budget, id: id }),
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
    
        if (response.ok) {
            alert("Expense updated.");
        } else {
            alert('Failed to delete expense.');
        }
    } else if (event.target.className=="delete"){
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace(`/trip/${trip_id}`);
        } else {
            alert('Failed to delete expense.');
        }
    }
}

const eupd = document.querySelector('#edit-update');
if (eupd) {
    eupd.addEventListener('click', updateTripHandler);
}

const edel = document.querySelector('#edit-delete');
if (edel) {
    edel.addEventListener('click', deleteTripHandler);
}

// const expf = document.querySelector('.expense-form');
// if (expf){
//     expf.addEventListener('submit', expenseFormHandler);
// }

const nexp = document.querySelector('#new-exp');
if (nexp) {
    nexp.addEventListener('click', expenseFormHandler);
}

const dexp = document.querySelector(".expense-group");
if (dexp) {
    dexp.addEventListener('click', updateDeleteExpenseHandler);
}
