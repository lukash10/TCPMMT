<template>
    <b-button style="background: #b53e3e;border: currentColor;" @click="logout">Logout</b-button>    
</template>
  
  <script>
    export default {
        methods: {
            logout() {
                this.deleteUsuario();
                this.$router.push('/');
            }
        }
    }
  </script>