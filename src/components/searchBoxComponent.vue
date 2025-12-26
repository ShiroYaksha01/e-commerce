<script setup lang="ts">
</script>

<template>

  <div class ="searchbox-container">
    <select name="categoryChoose" id="categoryChoose" class ="option-category">
      <option value="all-category">All Categories</option>
      <option value="cake-milk">Cake & Milk</option>
      <option value="peach">Peach</option>
      <option value="kiwi">Organic Kiwi</option>
      <option value="red-apple">Red Apple</option>
      <option value="snack">Snack</option>
      <option value="black-plum">Black Plum</option>
      <option value="vegetables">Vegetables</option>
      <option value="headphone">Headphone</option>
      <option value="orange">Orange</option>
    </select>

    <div class="vline"></div>

    <input
      type="text"
      class="searchbox-input"
      placeholder="Search for items"
    />
    <button class="searchbox-button" type="button">
      <img
        src="/img/searchIcon.png"
        alt="Search Icon"
        class="searchbox-icon"
      />
    </button>

  </div>

  <button class="outside-button" type="button">
    <img
      src="/img/profile.png"
      alt="account icon"
      class="outside-icon"
    />Account
  </button>
  <button class="outside-button" type="button">
    <img
      src="/img/compare.png"
      alt="account icon"
      class="outside-icon"
    />Compare
  </button>
  <button class="outside-button" type="button">
    <img
      src="/img/wishlist.png"
      alt="account icon"
      class="outside-icon"
    />Wishlist
  </button>
  <button class="outside-button" type="button">
    <img
      src="/img/cart.png"
      alt=""
      class="outside-icon"
    />Cart
  </button>


</template>

<style scoped>

.searchbox-container {

  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  width: 900px;
  margin-left: 200px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid #16ba16;
  margin-right: 70px;
}

.searchbox-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px;
}

.searchbox-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.searchbox-icon{
  width: 15px;
  height: 15px;

}

.vline{
  border-left: 2px solid #e0e0e0;
  height: 20px;
  margin-left: 10px;
  color: #8c8c8c;
}

.option-category{
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px;
  background-color: transparent;
  color: #424242;
}

.outside-icon {
  width: 20px;
  margin-right: 10px;
}

.outside-button {
  cursor: pointer;
  justify-content: center;
  align-content: center;
  margin-right: 10px;
  background: none;
  border: none;
  border-radius: 5px;
}

.outside-button:hover {
  background-color: #f0f0f0;
}

</style>