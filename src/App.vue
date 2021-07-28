<template>
  <Header />
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {
    Header: require("./components/Header.vue").default
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&family=Qahiri&display=swap');
/* font-family: 'PT Sans', sans-serif;
font-family: 'Qahiri', sans-serif; */

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h3{
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 30px;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
