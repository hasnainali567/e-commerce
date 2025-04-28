let main = document.getElementById("main");

let promise = new Promise((res, rej) => {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((json) => res(json));
});

promise.then((res) => {
  let products = res.products;

  for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
    
    let img = products[i].images;
    let title = (products[i].title);
    let description = products[i].description;
    let price = products[i].price;
    let stock = products[i].stock;

    if (description.length > 51) {
        description = description.slice(0, 50);
        description = description.slice(0, description.lastIndexOf(' ')) + ' ....';
    }

    if (stock <= 5) {
        stock = `Just ${stock} left`
    } else if (stock <= 10) {
        stock = `only ${stock} left`
    }
    

    if (img.length > 1) {
      let carouselItems = "";
      img.forEach((element, i) => {
        carouselItems += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img loading="lazy" src="${element}" class="d-block w-100" height="200px" style="object-fit: cover;" alt="...">
            </div>`;
      });


      let carousel = `<div id="carousel${i}" class="carousel slide">
  <div class="carousel-inner">
    ${carouselItems}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel${i}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next primary" type="button" data-bs-target="#carousel${i}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

      let cards = `<div class="card" style="width: 18rem;">
                        ${carousel}
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text mb-2">${description}</p>
                            <div class="rat-stock mb-2 d-flex align-item-center">
                                <div class="rating">

                                Rating : ${products[i].rating} / 5 ⭐
                                </div>
                                <div class="stock">${stock}</div>
                            </div>
                            <a href="#" class="btn btn-success mb-2 w-100 fw-bold">$ ${price}</a>
                            <a href="#" class="btn btn-primary w-100 fw-bold">Show Details</a>
                            </div>
                            </div>`;
                            
                            main.innerHTML += cards;
                        } else {
                            let cards = `<div class="card" style="width: 18rem;">
                            <img loading="lazy" src="${img}" height="200px" style="object-fit: cover;" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text mb-2">${description}</p>
                            <div class="rat-stock mb-2 d-flex align-item-center">
                                <div class="rating">
                                    Rating : ${products[i].rating} / 5 ⭐
                                </div>
                                <div class="stock">
                                    ${stock}
                                </div>
                            </div>
                            <a href="#" class="btn btn-success mb-2 w-100 fw-bold">$ ${price}</a>
                            <a href="#" class="btn btn-primary w-100 fw-bold">Show Details</a>
                        </div>
                    </div>`;
      main.innerHTML += cards;
    }
  }
});
