<template>

  <router-view> </router-view>

</template>


<script>
import update from './mixins/update';

export default {
  name: 'App',
  data: () =>({
    //
  }),
  // mixins: [update],
  // methods: {
  //   updateAvailable (event) {
  //     this.registration = event.detail;
  //     this.updateExists = true;
  //   }
  // }
}
</script>

<style>

* { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
    min-height: 100vh;
}

main{
  height: 100vh;
  margin-bottom: 300px;
}

#cards{  
  padding-top: 20px;
  padding-bottom: 70px;
  padding-left: 20px;
  padding-right: 20px;
}

.footer{
  background-color: #06569b;
  padding: 0px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

button.close{
    background-color: #06569b !important;
    border-radius: 3px;
    border: none !important;
    color:white;
    width: 25px;
}

@media (min-height: 1100px){
  
  .footer{
    height: 50px;
    padding: 10px;
  }

  #cards{
    padding-bottom: 280px !important;
  }

}

</style>


