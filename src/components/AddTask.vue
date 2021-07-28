<template>
  <div class="add_task">
      <h3>Add new task</h3>
      <form method="POST" @submit.prevent="handleSubmit">
          <label for="title">Task name</label>
          <input type="text" v-model.trim="title">
          <p class="error">{{ errMsg }}</p>
          <button>Add</button>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "AddTask",
    data(){
        return{
            title: '',
            errMsg: ''
        }
    },
    computed:{
        ...mapState(['userProfile'])
    },
    methods:{
        handleSubmit(){
            if(this.title !== '' && this.title !== null){
                let newtask = {
                    id: Math.random().toString(36).slice(2),
                    title: this.title,
                    userId: this.userProfile.id,
                    isDone: false,
                    isPending: true,
                    createdAt: new Date().toDateString()
                }
                this.$store.dispatch('addNewTask', newtask)
                this.title = '';
                this.errMsg = '';
            }else{
                this.errMsg = 'Please enter correct task name!'
            }
        }
    }
}
</script>

<style scoped>
.add_task{
    width: 100%;
    display: block;
}
.add_task form{
    margin-top: 30px;
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
label{
    font-size: 20px;
    font-family: 'PT Sans', sans-serif;
}
button{
    float: right;
    margin-top: 10px;
    border: none;
    padding: 10px 15px;
    border-radius: 30px;
    background: dodgerblue;
    color: #fff;
    cursor: pointer;
}
.error{
    color: red;
    font-family: 'PT Sans', sans-serif;
    margin-top: 2px;
}
</style>