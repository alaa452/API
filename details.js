

const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));

const itemsProduct = document.querySelector(".itemsProduct");

const getDetails = async () => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const products = response.data;
        console.log(products);


        const x = `
    <div class="flex gap-15 max-xl:flex-wrap ">
        <div class="flex flex-col gap-7.5 max-w-20 max-h-20 bg-center bg-cover max-md:flex-row">
            ${products.images.map((image, index) => `
                <img src="${image}" data-image="${image}"  class="smallImages border rounded-lg hover:border-background transition-all cursor-pointer 
                ${index === 0 ? "border-background border-2" : "border-gray/20"}" >
            `).join("")}
        </div>

        <div class="border border-gray/20 rounded-xl max-w-150 shadow-xl">
            <img src="${products.images[0]}" alt="${products.title}" id="mainImage" >
        </div>

        <div class="flex flex-col gap-7.5">

            <div class="flex flex-col gap-2.5">
                <h3 class="font-bold text-4xl"> ${products.title} </h3>
                <p class="text-lg"> Rate : ${products.rating} </p>
                <p class="text-3xl font-bold text-red-500">$ ${products.price}</p>
                <p class="text-gray"> ${products.description} </p>
            </div>

            <div class="flex flex-col gap-2.5">
                <p class="font-bold text-xl"> Stock : <span class="ml-7.5 px-1 bg-green-100 border border-green-300 rounded-lg text-green-700">${products.stock} in Stock</span></p>
                <p class="font-bold text-xl"> Brand : <span class="ml-7.5">${products.brand} </span></p>
                <p class="font-bold text-xl"> Category : <span class="ml-7.5">${products.category} </span></p>
                <p class="font-bold text-xl"> Tags : <span class="ml-7.5">${products.tags.join(", ")} </span></p>
            </div>

            <div>
                <div class="flex flex-col">
                    <p class="font-bold text-xl"> Quantity </p>
                    <div class="flex items-center gap-5">
                    <button id="minusBtn" class="px-4 py-2 text-xl font-bold hover:bg-gray-100 transition-all cursor-pointer">-</button>
                    <span id="quantity" class="px-6 py-2 font-bold text-lg">1</span>
                    <button id="plusBtn" class="px-4 py-2 text-xl font-bold hover:bg-gray-100 transition-all cursor-pointer">+</button>
                </div>
                </div>
                     <div class="flex items-center rounded-lg overflow-hidden pt-2.5">
                    <div class="flex gap-7.5">
                        <button class="font-bold text-white bg-background px-10 py-2.5 border-background rounded-lg cursor-pointer hover:bg-background/80 transition-all">
                            Add to Cart
                        </button>
    
                        <button class="font-bold text-background border border-background rounded-lg px-10 py-2.5 cursor-pointer bg-white hover:bg-gray-200 transition-all">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <div class="flex flex-col mt-10 gap-5">
            <div class="font-bold text-lg">
                Reviews (<span>${products.reviews.length}</span>)
            </div>
            <div class="flex flex-wrap gap-2.5 border border-gray/70 rounded-xl p-5">
                ${products.reviews.map((review) =>
            `
                <div class="border border-gray/70 rounded-xl p-5 max-w-90 space-y-2">
                    <p class="font-bold text-lg">${review.reviewerName}</p>
                    <p class="font-bold"> Rate : ${review.rating}</p>
                    <p class="text-gray">${review.comment}</p>
                    <a href="#" class="text-background font-bold hover:underline">${review.reviewerEmail}</a>
                    <p class="text-gray">${review.date}</p>
                </div>
                `
        ).join("")
            }

            </div>

        </div>
    
    `;



        itemsProduct.innerHTML = x;

        const mainImage = document.getElementById("mainImage");
        const smallImages = document.querySelectorAll(".smallImages");

        smallImages.forEach((image) => {
            image.addEventListener("click", () => {
                mainImage.src = image.dataset.image;
                smallImages.forEach((img) => {
                    img.classList.remove("border-background", "border-2");
                    img.classList.add("border-gray/20");
                });
                image.classList.remove("border-gray/20");

                image.classList.add("border-background", "border-2");
            });

        });

        const minusBtn = document.getElementById("minusBtn");
        const plusBtn = document.getElementById("plusBtn");
        const quantity = document.getElementById("quantity");
        let count = 1;

        plusBtn.addEventListener("click", () => {
            count++;
            quantity.textContent = count;
        });

        minusBtn.addEventListener("click", () => {
            if (count > 1) {
                count--;
                quantity.textContent = count;
            }
        });
    } catch (error) {
        console.log(error);
    }
}
getDetails();
