
const filter = document.getElementById("filter");
let skip = 0;
let limit = 15;
let currentCategory = "all";

const getCateg = async () => {
    let response;
    try {
        const response = await axios.get('https://dummyjson.com/products/category-list');

        const categories = response.data.map((category) =>
            `
                <div class="flex gap-4">
                    <input type="radio" id="${category}" name="categoryes" class="check">
                    <label for="${category}">${category}</label>
                </div>
      `
        );

        filter.innerHTML += categories.join('');

        const radios = document.querySelectorAll(".check");

        radios.forEach((radio) => {

            radio.addEventListener("change", () => {

                skip = 0;
                currentCategory = radio.id;

                products.innerHTML = "";

                displayProducts(currentCategory);

            });

        });

    } catch (error) {
        console.error(error);
    }
};
getCateg();


const products = document.getElementById("products");



const getProducts = async (category) => {
    try {
        let response;

        if (!category || category === "all") {
            response = await axios.get(
                `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            );

        } else {

            response = await axios.get(
                `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
            );

        }

        const data = response.data;
        localStorage.setItem("categories",JSON.stringify(data));
        return data;

    }
    catch (error) {
        console.error(error);
    }
}
const displayProducts = async (id = "all") => {
    const data = await getProducts(id);
    if (data.products.length === 0) {
        alert("No more products");
        return;
    }


    const prod = data.products.map((product) =>

        `
                <div class="flex flex-col gap-4 cursor-pointer items-center justify-center bg-[#F6F6F6] border border-gray-300 rounded-2xl p-5 shadow-lg h-fit hover:border-background hover:shadow-md hover:-translate-y-0.5 transition card" data-id="${product.id}">
                    <div class=" flex items-center justify-center"><img src="${product.thumbnail}"></div>
                    <h3 class="text-sm text-center leading-6 min-h-10">${product.title}</h3>
                    <p class="text-xl font-bold text-center">${product.price}</p>
                    <p>rate: ${product.rating}</p>
                    <button class="text-white bg-background py-2 rounded-lg w-full hover:bg-background/90 transition cursor-pointer">
                        View Details
                    </button>
                </div>
      `
    );
    products.innerHTML += prod.join('');
    skip += limit;

    const buttons = document.querySelectorAll(".card");
    buttons.forEach((button) => {

        button.addEventListener("click", function () {
            location.href = `./details.html?id=${event.currentTarget.dataset.id}`;
        })
    })


}
displayProducts();


const loadMore = () => {
    displayProducts(currentCategory);
};


const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    event.stopPropagation();
    sidebar.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {

    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)
    ) {
        sidebar.classList.add("hidden");
    }

});