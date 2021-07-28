<template>
  <div class="home">
      <div class="todo">
          <div class="todo__list_today">
              <h3>Today's todo</h3>
              <div class="todo__list">
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
          <div class="todo__add_form">
              <AddTask />
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' 
import TodoItem from '../components/TodoItem.vue'
import AddTask from '../components/AddTask.vue'

export default {
    name: "Home",
    components:{
        TodoItem,
        AddTask
    },
    computed:{
        ...mapState(['todos','userProfile']),
    },
    mounted(){
        this.fetchDailyTodos()
    },
    methods:{
        fetchDailyTodos(){
            this.$store.dispatch('fetchDailyTodos',this.userProfile.id)
        },
        toggleTaskStatus(payload){
            let data = {
                id: payload.id,
                isDone: payload.status === 'Completed' ? true : false,
                isPending: payload.status === 'Pending' ? true : false,
            }
            this.$store.dispatch('updateTaskStatus', data)
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
.home{
    width: 100%;
    display: block;
}
.todo{
    max-width: 1100px;
    width: 100%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
}
.todo__list_today{
    height: 85vh;
    flex: .5;
    overflow: hidden;
    overflow-y: auto;
    padding: 10px;
}

.todo__list{
    margin-top: 30px;
}
.todos{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}
.todo__add_form{
    flex: .4;
}
</style>