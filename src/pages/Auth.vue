<template>
  <div class="auth">
      <h3>Todo Login</h3>
      {{ errors }}
      <form method="POST" @submit.prevent="handleSubmit">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" v-model.trim="username">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password">
          <button>Login</button>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Auth",
    data(){
        return{
            username: '',
            password: ''
        }
    },
    computed:{
        ...mapState(['errors'])
    },
    methods:{
        handleSubmit(){
            if(this.username!== '' && this.password!== ''){
                this.$store.dispatch('loginToSystem', {username: this.username,password:this.password})
            }else{
                alert("Username and password is required!")
            }
        }
    }
}
</script>

<style scoped>
.auth{
    max-width: 400px;
    width: 100%;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    background: skyblue;
    font-family: 'PT Sans', sans-serif;
    display: flex;
    flex-direction: column;
}
form{margin-top: 50px;}
label{
    font-size: 18px;
    margin-top: 10px;
    display: block;
}
input{
    width: 100%;
    padding: 10px;
    border: none;
    background: #fff;
    border-radius: 30px;
    outline: none;
    margin-top: 5px;
}
button{
    padding: 10px 15px;
    border:none;
    margin-top: 20px;
    float: right;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
}
</style>