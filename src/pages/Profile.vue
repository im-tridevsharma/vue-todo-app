<template>
  <div id="profile">
    <h3>Profile</h3>
    <form method="POST" @submit.prevent="updateProfile">
      <div class="form-group">
        <label>Fullname</label>
        <input type="text" v-model.trim="userProfile.fullname">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" v-model.trim="userProfile.email">
      </div>
      <div class="form-group">
        <label>Username</label>
        <input type="text" v-model.trim="userProfile.username">
      </div>
      <div class="button">
        <button>Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Profile",
    computed:{
      ...mapState(['userProfile'])
    },
    methods:{
      updateProfile(){
        if(this.userProfile.fullname !== ''
        && this.userProfile.email !== ''
        && this.userProfile.username !== ''
        ){
          this.$store.dispatch('updateUserProfile', this.userProfile);
          alert("Profile updated successfully.");
        }else{
          alert("Please correct information to update.");
        }
      }
    }
}
</script>

<style scoped>
#profile{
  padding: 20px 50px;
}
form{
  margin-top: 50px;
}
.form-group{
  max-width: 250px;
  width: 100%;
  display: inline-block;
  margin: 0px 10px;
}
label{
  font-size: 20px;
  font-family: "PT Sans", sans-serif;
}
input{
  width: 100%;
  padding: 10px 15px;
  margin: 5px 0px;
  border: none;
  background: lightblue;
  border-radius: 30px;
  outline: none;
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
}
.button{
  max-width: 800px;
  width: 100%;
}
button{
  margin-top: 10px;
  border: none;
  padding: 10px 15px;
  border-radius: 30px;
  background: dodgerblue;
  color: #fff;
  cursor: pointer;
  display: block;
  float: right;
}
</style>