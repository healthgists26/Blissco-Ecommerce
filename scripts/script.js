const BASE_URL  = "https://fakestoreapi.com"
const products = JSON.parse(localStorage.getItem('products')) 

async function getProductsfromStore (){
    try {

        fetch(`${BASE_URL}/products`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('products', JSON.stringify(data))            
        }
        );
    } catch (error) {
        console.log(error)
    }   
}

function getProducts (){
    console.log('got heree')
    if (products && products.length > 0){
        return products
    }else{
        getProductsfromStore()
    }
}

function getCategories (){
    const categoryBox = document.getElementById('category-list')
    if(products){
        const uniqueCategories  = [...new Set(products.map(products => products.category))]  
        categoryBox.innerHTML = uniqueCategories.map((i)=> `<a style="text-transform: capitalize;" href=""><span>${i}</span></a>`)
        console.log(uniqueCategories)
    }

}

document.getElementById('flash-sales-box').innerHTML = products.slice(0, 5).map((product)=>{

    return(
            `<div key={} class="box2">
                <div class="box-img">
                    <img src=${product.image} alt="">
                </div>
                <div class="box-text">
                    <h6>${product.title}</h6>
                    <div class="box-price">
                        <p>$120 </p>
                        <span>$160</span>
                    </div>
                </div>
                <img class="rating" src="Images\Frame 566five star.png" alt="">
            </div>`
    )
})

console.log(products)

document.addEventListener('DOMContentLoaded', ()=>{
    if(products && products.length > 0){
        getCategories()
    }else{
        getProducts()
        setTimeout(getCategories, 1000)
    }
})

