<template>
  <nav class="navbar">
    <div class="navbar-top">
        <div class="navbar-left">
            <div class="logo">
            <img src="" alt="Melon" />
        </div>
        <SearchBoxComponent class="searchbox" />
      </div>

      <div class="navbar-icons">
        <div class="icon-item">
          <i class="fa-solid fa-user"></i>
          <span>Account</span>
        </div>
        <div class="icon-item">
          <!-- Compare SVG -->
          <span class="icon-svg" style="display:flex;align-items:center;">
            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.298 7.45671L21.7149 6.63019C18.6493 1.36376 12.0415 -0.648131 6.56113 2.01629V0H4.9212V4.91979H9.84099V3.27986H7.74598C12.3848 1.3121 17.7631 3.10183 20.298 7.45671Z" fill="#253D4E"/>
              <path d="M5.33116 20.2333C1.52924 17.1456 0.528575 11.7558 2.96884 7.50917L1.54702 6.68921C-1.2363 11.536 -0.183154 17.6767 4.05611 21.319H2.0513V22.9589H6.97109V18.0392H5.33116V20.2333Z" fill="#253D4E"/>
              <path d="M22.5208 10.3053L19.0425 13.7844L20.202 14.9438L21.5959 13.5499C21.0492 18.6301 16.7683 22.4857 11.6588 22.4998V24.1397C17.7465 24.1237 22.7966 19.4255 23.2514 13.3547L24.8405 14.9438L25.9999 13.7844L22.5208 10.3053Z" fill="#253D4E"/>
            </svg>
          </span>
          <span>Compare</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-heart"></i>
          <span>Wishlist</span>
        </div>
        <div class="icon-item">
          <!-- Cart SVG -->
          <span class="icon-svg" style="display:flex;align-items:center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 3H4.242L4.2 2.649C4.11405 1.91942 3.76338 1.24673 3.21449 0.758478C2.6656 0.270223 1.95663 0.000341793 1.222 0L0 0V2H1.222C1.46693 2.00003 1.70334 2.08996 1.88637 2.25272C2.06941 2.41547 2.18634 2.63975 2.215 2.883L3.8 16.351C3.88595 17.0806 4.23662 17.7533 4.78551 18.2415C5.3344 18.7298 6.04337 18.9997 6.778 19H20V17H6.778C6.53291 16.9999 6.29638 16.9099 6.11333 16.7469C5.93027 16.5839 5.81343 16.3594 5.785 16.116L5.654 15H21.836L24 3ZM20.164 13H5.419L4.478 5H21.607L20.164 13Z" fill="#253D4E"/>
              <path d="M7 24C8.10457 24 9 23.1046 9 22C9 20.8954 8.10457 20 7 20C5.89543 20 5 20.8954 5 22C5 23.1046 5.89543 24 7 24Z" fill="#253D4E"/>
              <path d="M17 24C18.1046 24 19 23.1046 19 22C19 20.8954 18.1046 20 17 20C15.8954 20 15 20.8954 15 22C15 23.1046 15.8954 24 17 24Z" fill="#253D4E"/>
            </svg>
          </span>
          <span>Cart</span>
        </div>
      </div>
      
      </div>
    <div class="navbar-bottom">
      <button class="browse-btn">Browse All Categories</button>
      <MenuItemComponent label="Hot Deals" to="/hot-deals" />
      <MenuItemComponent label="Home" to="/" />
      <MenuItemComponent label="Food" hasDropdown>
        <router-link to="/categories/fruits">Fruits</router-link>
        <router-link to="/categories/vegetables">Vegetables</router-link>
        <router-link to="/categories/meat-seafood">Meat & Seafood</router-link>
      </MenuItemComponent>
      <MenuItemComponent label="Vegetables" hasDropdown>
        <router-link to="/categories/leafy">Leafy</router-link>
        <router-link to="/categories/root">Root</router-link>
      </MenuItemComponent>
      <MenuItemComponent label="Drink" to="/categories/drink" />
      <MenuItemComponent label="Cookies" to="/categories/cookies" />
      <MenuItemComponent label="Meat & Seafood" to="/categories/meat-seafood" />
      <MenuItemComponent label="Bakery" to="/categories/bakery" />
      <div class="support">
        <div style="display:flex;align-items:center;gap:10px;">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.5 18.636V16.5C31.5 12.9196 30.0777 9.4858 27.5459 6.95406C25.0142 4.42232 21.5804 3 18 3C14.4196 3 10.9858 4.42232 8.45404 6.95406C5.9223 9.4858 4.49999 12.9196 4.49999 16.5V18.636C2.92673 19.3287 1.63919 20.5409 0.852919 22.0696C0.0666509 23.5983 -0.170622 25.3506 0.180823 27.0334C0.532268 28.7161 1.4511 30.227 2.78349 31.3132C4.11589 32.3994 5.78097 32.9949 7.49999 33H10.5V18H7.49999V16.5C7.49999 13.7152 8.60623 11.0445 10.5754 9.07538C12.5445 7.10625 15.2152 6 18 6C20.7848 6 23.4555 7.10625 25.4246 9.07538C27.3937 11.0445 28.5 13.7152 28.5 16.5V18H25.5V30H19.5V33H28.5C30.219 32.9949 31.8841 32.3994 33.2165 31.3132C34.5489 30.227 35.4677 28.7161 35.8191 27.0334C36.1706 25.3506 35.9333 23.5983 35.1471 22.0696C34.3608 20.5409 33.0732 19.3287 31.5 18.636ZM7.49999 30C6.30651 30 5.16192 29.5259 4.31801 28.682C3.47409 27.8381 2.99999 26.6935 2.99999 25.5C2.99999 24.3065 3.47409 23.1619 4.31801 22.318C5.16192 21.4741 6.30651 21 7.49999 21V30ZM28.5 30V21C29.6935 21 30.8381 21.4741 31.682 22.318C32.5259 23.1619 33 24.3065 33 25.5C33 26.6935 32.5259 27.8381 31.682 28.682C30.8381 29.5259 29.6935 30 28.5 30Z" fill="#253D4E"/>
          </svg>
          <div>
            <div class="support-phone">099 777 888</div>
            <div class="support-desc">24/7 Support Center</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import SearchBoxComponent from './searchBoxComponent.vue';
import MenuItemComponent from './menuItemComponent.vue';

export default {
  name: "navBarComponent",
  components: {
    SearchBoxComponent,
    MenuItemComponent
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d4e9d7;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.navbar-top {
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
  gap: 32px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo img {
  width: auto;
  height: 48px;
}
.logo-text .brand {
  font-size: 22px;
  font-weight: bold;
  color: #3a4d39;
}
.logo-text .desc {
  font-size: 12px;
  color: #3a4d39;
}
.searchbox {
  flex: 1;
  margin: 0 32px;
}
.navbar-icons {
  display: flex;
  align-items: right;
  gap: 24px;
}
.icon-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: #3a4d39;
  cursor: pointer;
}
.navbar-bottom {
  display: flex;
  align-items: center;
  padding: 8px 32px;
  gap: 8px;
  border-top: 1px solid #d4e9d7;
}
.browse-btn {
  background: #3BB77E;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 8px;
}
.support {
  margin-left: auto;
  text-align: right;
  color: #3a4d39;
}
.support-phone {
  font-size: 18px;
  font-weight: bold;
  color: #1fa463;
}
.support-desc {
  font-size: 12px;
}
</style>
