const burgerTemplate = (burgerName, id, is_favorite) => {
    const burgerContainer = $('<div>').attr({
        class: 'content-burger__list',
        id: id
    });

    const img = $('<img>').attr({
        src: './images/cheeseburger.jpg',
        alt: ''
    });

    const name = $('<p>');

    const button = $('<button>').attr({
        'data-id': id,
        class: 'btn btn-dark favorites',
        'data-state': is_favorite
    });
    
    name.html(burgerName);
    button.html('add to Favorites')

    burgerContainer.append(img, name, button);

    return burgerContainer;
}

const addBurgerFail = (response) => {
    alert('Burger Failed');
}

const displayNewBurger = (burger) => {
    const name = burger.burger_name;
    const id = burger.id;
    const is_favorite = burger.is_favorite;

    const newBurger = burgerTemplate(name, id, is_favorite);

    $('.content-burger').append(newBurger);

    $('input').val('');
}

$('button[type="submit"]').on('click', function(event){
    event.preventDefault();

    const burgerName = $('input[name="burger_name"]').val();

        $.ajax({
            url: '/add',
            method: 'POST',
            data: {
                burger_name: burgerName
            }
        })
        .then(displayNewBurger)
        .catch(addBurgerFail);
});



// Delete Section

const removeBurgerOnDelete = (burger) => {
    const id = burger.id;

    $(`.all-burgers .burger[data-id=${id}]`).remove();
};

const removeBurgerFailed = () => {
    alert('Failed to Delete Burger');
}

$('.all-burgers .burger button').on('click', function() {
    const id = $(this).attr('data-id');

    $.ajax({
        url: '/delete/' + id,
        method: 'DELETE'
    })
    .then(removeBurgerOnDelete)
    .catch(removeBurgerFailed);
})


//Add to favorites Section

const addBurgerToFavorite = (burger) => {
    const id = burger.id;
    $(`#${id}`).remove();


}

const addBurgerToFavoriteFail = () => {
    alert('Fail adding it to Favorite');
}

$(document).on('click', '.favorites', function(){

    const id = $(this).attr('data-id');

    const value = $(this).attr('data-state');

    let condition = value === '0' ? true : false;

    $.ajax({
        url: `/${id}/${condition}`,
        method: 'PUT'
    })

    .then(addBurgerToFavorite)
    .catch(addBurgerToFavoriteFail)
});