<template>
  <div class="tasks">
      <h3>{{ type.charAt(0).toUpperCase() + type.slice(1) }} Tasks</h3>
      
      <div class="tasks_list">
          <div class="todos" v-if="todos.length">
            <TodoItem v-for="todo in todos" 
            :key="todo.id"
            :id="todo.id" 
            :title="todo.title"
            :status="todo.isDone ? 'Completed' : (todo.isPending ? 'Pending' : '')"
            @toggle="toggleTaskStatus"
            @delete="deleteTodo"
            />
        </div>
        <div class="notodos" v-else>
            Empty!
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' 
import TodoItem from '../components/TodoItem.vue'

export default {
    name: "Tasks",
    props: ['type'],
    computed:{
        ...mapState(['todos','userProfile']),
    },
    components: {
        TodoItem
    },
    mounted(){
        this.fetchAllTodos()
    },
    watch:{
        type(){
            this.fetchAllTodos()
        }
    },
    methods: {
        fetchAllTodos(){
            if(this.type === 'completed'){
                this.$store.dispatch('fetchDoneTodos', this.userProfile.id)
            }
            if(this.type === 'pending'){
                this.$store.dispatch('fetchPendingTodos', this.userProfile.id)
            }
            if(this.type === 'all'){
                this.$store.dispatch('fetchAllTodos', this.userProfile.id)
            }
        },
        toggleTaskStatus(payload){
            let data = {
                id: payload.id,
                isDone: payload.status === 'Completed' ? true : false,
                isPending: payload.status === 'Pending' ? true : false,
            }
            this.$store.dispatch('updateTaskStatus', data)
            this.fetchAllTodos()
        },
        deleteTodo({id}){
            if(id !== ''){
                this.$store.dispatch('deleteTodo', id);
            }
        }
    }
}
</script>

<style scoped>
.tasks{
    max-width: 500px;
    width: 100%;
    margin: 30px auto;
}
.todos{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}
.tasks_list{
    margin-top: 20px;
}
</style>