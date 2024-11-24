// public/main.js
const productForm = document.getElementById("product-form");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productDescriptionInput = document.getElementById("product-description");
const productsTableBody = document.querySelector("#products-table tbody");

// Fetch and display products on page load
fetchProducts();

// Handle form submission to add a new product
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = productNameInput.value;
  const price = parseFloat(productPriceInput.value);
  const description = productDescriptionInput.value;

  if (name && !isNaN(price) && description) {
    await createProduct({ name, price, description });
    // Clears the input fields after submission.
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescriptionInput.value = "";
  }
});

// Fetch all products from the server
async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();
    // Clear the table
    productsTableBody.innerHTML = "";
    data.forEach((product) => addProductToDOM(product));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Add a new product to the server
async function createProduct(productData) {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const product = await response.json();
    addProductToDOM(product);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

// Delete a product from the server
async function deleteProduct(id, rowElement) {
  try {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      productsTableBody.removeChild(rowElement);
    } else {
      console.error("Error deleting product:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

// Add a product to the DOM
function addProductToDOM(product) {
  const tr = document.createElement("tr");

  const nameTd = document.createElement("td");
  nameTd.textContent = product.name;
  tr.appendChild(nameTd);

  const priceTd = document.createElement("td");
  priceTd.textContent = product.price;
  tr.appendChild(priceTd);

  const descriptionTd = document.createElement("td");
  descriptionTd.textContent = product.description;
  tr.appendChild(descriptionTd);

  const actionsTd = document.createElement("td");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  actionsTd.appendChild(deleteButton);

  tr.appendChild(actionsTd);

  // Handle delete product
  deleteButton.addEventListener("click", () => {
    deleteProduct(product.id, tr);
  });

  productsTableBody.appendChild(tr);
}
