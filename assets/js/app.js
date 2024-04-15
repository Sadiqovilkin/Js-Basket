const row = document.querySelector('.rowData')
const tbody = document.getElementById('tableBody')



class Basket {
    static id = 1
    constructor(name, price, percentage, imgSrc) {
        this.id = Basket.id++;
        this.name = name;
        this.price = price;
        this.percentage = percentage;
        this.imgSrc = imgSrc;
    }
    mathPrice() {
        if (this.percentage !== 0) {
            let endPrice = this.price - ((this.price * this.percentage) / 100)
            return endPrice
        }
        else {
            return this.price
        }
    }
}

const basketProd1 = new Basket('Snikers', 5, 0, "https://w7.pngwing.com/pngs/134/761/png-transparent-snickers-chocolate-pack-chocolate-bar-snickers-bounty-mars-3-musketeers-snickers-food-peanut-butter-candy-bar.png")
const basketProd2 = new Basket('Bounty', 5, 50, "https://e7.pngegg.com/pngimages/759/499/png-clipart-bounty-chocolate-pack-ice-cream-chocolate-bar-bounty-waffle-twix-snickers-food-milk-chocolate.png")
const basketProd3 = new Basket('Mars', 5, 20, "https://banner2.cleanpng.com/20180717/jlk/kisspng-mars-bounty-ice-cream-chocolate-bar-snickers-ice-cream-5b4e7a006b2cd1.496113631531869696439.jpg")

const basketArr = [basketProd1, basketProd2, basketProd3]



// console.log(basketProd1.mathPrice());
// console.log(basketProd2.mathPrice());


function addData() {
    renderData(basketArr)
}

function renderData(basketAr) {
    row.innerHTML = ""
    basketAr.forEach(el => {
        row.innerHTML += `
        <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="card  ">
                    <img src="${el.imgSrc}" width="240" height="240"  class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${el.name}</h5>
                        <p>${el.percentage == 0 ? `${el.price} $` : `<del>${el.price}$</del> ${el.mathPrice()}$`}</p>
                        
                    </div>
                    <div class='d-flex gap-1  p-3'>
                        <a data-id="${el.id}" href="#" class="btn btn-primary  w-50">del</a>
                        <a data-id="${el.id}" href="#" class=" basketAdd btn btn-primary w-50">basket</a>
                    </div>
                  </div>
            </div>
        `
    });
    BasketAdd()


}
window.addEventListener('load', () => {
    if (!localStorage.getItem('basket')) {
        localStorage.setItem('basket', JSON.stringify([]))
        Swal.fire({
            position: "center",
            icon: "success",
            title: "LocalStorage added basket array",
            showConfirmButton: false,
            timer: 800
        });
    }
})
function BasketAdd() {
    const basketBtns = document.querySelectorAll('.basketAdd')
    basketBtns.forEach((baskBtn) => {
        baskBtn.addEventListener('click', function(e){
            e.preventDefault()
            // console.log(this.getAttribute('data-id'));
            const btnId = this.getAttribute('data-id')
            let baskArray = JSON.parse(localStorage.getItem('basket'))
            let findArr = baskArray.find((x) => x.id == btnId)
            if (!findArr) {
                baskArray.push({id:btnId , count:1})}
            else{
                findArr.count ++
                // console.log(findArr.count);
            }
            localStorage.setItem("basket",JSON.stringify(baskArray))
            renderbasketData(basketArr,baskArray)
        })
    })
}

function renderbasketData(bskArr , findArr ) {
    tbody.innerHTML = '';

    // console.log(findArr);
    // console.log(bskArr);
    bskArr.forEach(basketEl => {
        const getCount = findArr.find((x) => x.id == basketEl.id)
        console.log(getCount);
        tbody.innerHTML += `
        <tr>
                        <th>${basketEl.id}</th>
                        <th>${basketEl.name}</th>
                        <th>Product İmg</th>
                        <th>${basketEl.mathPrice()* getCount.count }</th>
                        <th>${getCount.count}</th>
                        <th><button class="btn btn-dark "><i class="fa-solid fa-plus"></i></button></th>
                        <th><button disabled class="btn btn-dark "><i class="fa-solid fa-minus"></i></button></th>
                        <th><button class="btn btn-dark "><i class="fa-solid fa-trash"></i></button></th>
                    </tr>
        `
    });
}









addData()