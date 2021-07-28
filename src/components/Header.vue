<template>
  <div class="header">
      <!-- navigation part goes here  -->
      <div class="header__nav" v-if="userProfile.id">
          <div class="header__nav__toggler" @click="toggleNav">
              <i class="fas fa-bars"></i>
          </div>
          <transition name="bounce">
            <div class="header__nav__menu" v-if="showNav">
                <ul class="header__nav__menu__nav">
                    <li>
                        <router-link :to="{name: 'Home'}">Today's tasks</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'Tasks', params: {type: 'completed'}}">Completed tasks</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'Tasks', params: {type: 'pending'}}">Pending tasks</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'Tasks', params: {type: 'all'}}">All tasks</router-link>
                    </li>
                </ul>
                <p class="credit">&copy; {{ new Date().getFullYear() }} Copyright Vue todo</p>
                <div class="header__nav__menu__close" @click="toggleNav">
                    <i class="far fa-times-circle"></i>
                </div>
            </div>
          </transition>
      </div>
      <!-- brand logo goes here  -->
      <div class="header__logo">
          <router-link :to="{name: 'Home'}" class="header__logo__con">
            <img src="../assets/logo.svg" alt="logo" width="40">
            <h4>Vue todo</h4>
          </router-link>
      </div>
      <!-- important link goes here -->
      <div class="header__actions" v-if="userProfile.id">
          <router-link :to="{name: 'Profile'}"><i class="fas fa-user-circle"></i></router-link>
          <button @click="logout"><i class="fas fa-sign-out-alt"></i></button>
      </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mapState } from 'vuex'

export default {
    name: "Header",
    setup(){    
        const showNav = ref(false)
        const route = useRoute();

        function toggleNav(){
            showNav.value = !showNav.value;
        }
        watch(route, () => {
            showNav.value = false
        });
        
        return{
            showNav,
            toggleNav
        }
    },
    computed:{
        ...mapState(['userProfile'])
    },
    methods:{
        logout(){
            localStorage.removeItem("__token")
            this.$store.commit("SET_USER_PROFILE",{})
            location.reload()
        }
    }
}
</script>

<style scoped>
    .header{
        width: 100%;
        padding: 5px 50px;
        background: dodgerblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header__nav{
        display: inline-block;
    }
    .header__nav__toggler{
        padding: 10px 15px;
        background: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
    .header__nav__menu{
        position: fixed;
        top: 0;
        left: 0;
        padding: 10px 20px;
        height: 100vh;
        max-width: 300px;
        width: 100%;
        background: #fff;
        box-shadow: 1px -1px 4px -1px rgb(187, 219, 250);
        font-family: 'PT Sans', sans-serif;
    }
    .header__nav__menu__nav{
        margin-top: 50px;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        width: 100%;
    }
    .header__nav__menu__nav li{width: 100%;}
    .header__nav__menu__nav li a{
        text-decoration: none;
        padding: 10px 15px;
        background: dodgerblue;
        width: 100%;
        display: block;
        border-radius: 30px;
        color: #fff;
        font-weight: 600;
        margin: 5px 0px;
        outline: none;
    }
    .header__nav__menu__nav li a.router-link-active{
        background: deepskyblue;
    }
    .header__nav__menu__close{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 18px;
        color: firebrick;
        cursor: pointer;
    }
    .header__logo{
        max-width: 140px;
        width: 100%;
    }
    .header__logo__con{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        text-decoration: none;
        color: #fff;
        font-family: 'Qahiri', sans-serif;
        font-size: 35px;
    }
    .header__actions{
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 75px;
        width: 100%;
    }
    .header__actions a, button{
        height: 30px;
        width: 30px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #000;
        border-radius: 30px;
        margin: 0px 2px;
        border: none;
    }
    button:hover{
        background: firebrick;
        cursor: pointer;
    }
    .header__actions a:hover,.header__actions a.router-link-active{
        color: dodgerblue;
    }
    .credit{
        position: absolute;
        bottom: 5px;
        font-family: 'PT Sans', sans-serif;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        width: 80%;
    }
</style>