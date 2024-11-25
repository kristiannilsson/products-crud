### 1

Checkout the exercise in which you created a backend for handling users. This was exercise #4 in the express repository.

Our task now is to design a frontend for it.

Here is some starter code for the .html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Users CRUD App</title>
     <script src="app.js" defer></script>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f4f4f4;
      }
      button {
        margin: 0 4px;
      }
    </style>
  </head>
  <body>
    <h1>Users Management</h1>

    <!-- Table for displaying users -->
    <h2>All Users</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Favorite Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="user-table-body"></tbody>
    </table>

    <!-- Form for adding or updating a user -->
    <h2>Add / Update User</h2>
    <form id="user-form">
      <input type="hidden" id="user-id" />
      <input type="text" id="user-name" placeholder="Name" required />
      <input
        type="text"
        id="user-favorite-color"
        placeholder="Favorite Color"
        required
      />
      <button type="submit">Save User</button>
    </form>
  </body>
</html>
```


```javascript
// Fetch and display all users
async function fetchUsers() {
  // TODO: Implement fetching users and populating the table
}

// Handle form submission for adding/updating users
async function handleFormSubmit(event) {
  event.preventDefault();
  // TODO: Implement logic for adding or updating users
}

// Delete a user
async function deleteUser(userId) {
  // TODO: Implement deleting a user and refreshing the table
}

// Add event listener to the form
document
  .getElementById("user-form")
  .addEventListener("submit", handleFormSubmit);

// Initial fetch of users
fetchUsers();
```

---

### **Instructions:**

#### **Part 1: Display Users in a Table**

1. Implement the `fetchUsers` function:
   - Fetch all users from `GET /users`.
   - Populate the `<tbody>` element (`#user-table-body`) with rows.
   - Each row should include:
     - The user's `id`, `name`, and `favorite_color`.
     - Two buttons in the "Actions" column:
       - **Edit**: To edit user’s details.
       - **Delete**: To remove the user from the list.

**Example Row**

```html
<tr>
  <td>1</td>
  <td>Alice</td>
  <td>Blue</td>
  <td>
    <button>Edit</button>
    <!-- Dont forget to add event listeners to the button -->
  </td>
</tr>
```

#### **Part 2: Add or Update Users**

1. Implement the `handleFormSubmit` function:
   - If the `user-id` field is empty:
     - Perform a `POST /users` request to add a new user.
   - Refresh the table after the operation.
   - Clear the form inputs.
2. Make sure that the user is updated if the id already exists.

- If the `user-id` field has a value:
  - Perform a `PUT /users/:id` request to update the user.

#### **Part 3: Delete a User**

1. Implement the `deleteUser` function:
   - Send a `DELETE /users/:id` request for the selected user.
   - Refresh the table after successfully deleting the user.


---

### **Extension Ideas (Advanced)**

1. **Validation:**

   - Ensure the form is not submitted if required fields are empty.
   - Provide feedback if the backend returns an error.

2. **UI Improvements:**

   - Highlight the row being edited.
   - Add a confirmation dialog before deleting a user.

3. **Sorting and Filtering:**
   - Allow sorting the table by ID, name, or favorite color.
   - Add a search input to filter users by name or favorite color.

---
