let products =
JSON.parse(localStorage.getItem("products")) || [];

displayProducts();

function saveToLocalStorage(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

function addProduct(){

    let name =
    document.getElementById("name").value;

    let category =
    document.getElementById("category").value;

    let price =
    document.getElementById("price").value;

    let qty =
    document.getElementById("qty").value;

    if(
        name === "" ||
        category === "" ||
        price === "" ||
        qty === ""
    ){
        alert("Please fill in all fields!");
        return;
    }

    let total = price * qty;

    products.push({
        name,
        category,
        price,
        qty,
        total
    });

    saveToLocalStorage();

    displayProducts();

    clearInputs();
}

function displayProducts(filteredProducts = products){

    let table =
    document.getElementById("productList");

    table.innerHTML = "";

    let inventoryTotal = 0;

    filteredProducts.forEach((product,index)=>{

        inventoryTotal += Number(product.total);

        table.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>₱${product.price}</td>

            <td>${product.qty}</td>

            <td>₱${product.total}</td>

            <td>

                <div class="action-buttons">

                    <button class="edit-btn"
                    onclick="editProduct(${index})">
                    Edit
                    </button>

                    <button class="delete-btn"
                    onclick="deleteProduct(${index})">
                    Delete
                    </button>

                </div>

            </td>

        </tr>

        `;
    });

    document.getElementById("totalProducts").innerHTML =
    filteredProducts.length;

    document.getElementById("inventoryValue").innerHTML =
    "₱" + inventoryTotal;
}

function deleteProduct(index){

    let confirmDelete =
    confirm("Delete this product?");

    if(confirmDelete){

        products.splice(index,1);

        saveToLocalStorage();

        displayProducts();
    }
}

function editProduct(index){

    let product = products[index];

    let newName =
    prompt("Edit Product Name",product.name);

    let newCategory =
    prompt("Edit Category",product.category);

    let newPrice =
    prompt("Edit Price",product.price);

    let newQty =
    prompt("Edit Quantity",product.qty);

    if(
        newName !== null &&
        newCategory !== null &&
        newPrice !== null &&
        newQty !== null
    ){

        product.name = newName;
        product.category = newCategory;
        product.price = newPrice;
        product.qty = newQty;
        product.total = newPrice * newQty;

        saveToLocalStorage();

        displayProducts();
    }
}

function clearInputs(){

    document.getElementById("name").value = "";

    document.getElementById("category").value = "";

    document.getElementById("price").value = "";

    document.getElementById("qty").value = "";
}

function clearAllProducts(){

    let confirmClear =
    confirm("Delete all products?");

    if(confirmClear){

        products = [];

        saveToLocalStorage();

        displayProducts();
    }
}

function searchProduct(){

    let search =
    document.getElementById("search")
    .value.toLowerCase();

    let filteredProducts =
    products.filter(product =>

        product.name
        .toLowerCase()
        .includes(search)

        ||

        product.category
        .toLowerCase()
        .includes(search)

    );

    displayProducts(filteredProducts);
}