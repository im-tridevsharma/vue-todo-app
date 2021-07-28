<template>
  <div class="todo-item">
    <label :for="'todo' + id" class="item-label">
      <span class="item">
        <input type="checkbox" :id="'todo' + id" :checked="status === 'Completed'" @change="updateTaskStatus"/>
        <span v-if="status === 'Pending'">{{ title }}</span>
        <del v-if="status === 'Completed'">{{ title }}</del>
      </span>
      <span :class="status.toLowerCase()">{{ status }}</span>
    </label>
    <span class="del" @click="delTodo(id)"><i class="fas fa-trash"></i></span>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ['id', 'title', 'status'],
  methods:{
    updateTaskStatus(e){
      if(document.querySelector('#'+e.target.id).checked){
        this.$emit('toggle',{status: 'Completed', id:this.id})
      }else{
        this.$emit('toggle', {status: 'Pending', id:this.id})
      }
    },
    delTodo(id){
      this.$emit("delete", {id})
    }
  }
};
</script>

<style scoped>
.todo-item {
  padding: 10px;
  background: lightblue;
  width: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-family: "PT Sans", sans-serif;
  margin: 5px 0px;
}
.item-label{
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.item{
  display: flex;
  align-items: center;
}
.todo-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.pending,.completed{
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 10px;
}
.pending{
  background: chocolate;
}
.completed{
  background: seagreen;
}
.del{
  color: firebrick;
  cursor: pointer;
}
</style>
