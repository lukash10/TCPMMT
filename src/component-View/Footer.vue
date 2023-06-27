<template>
    
    <div class="footer">
        
        <div class="col text-center" style="color:white">
            <span>Desenvolvido por Omega Software </span> |  <span v-if="isOnline" style="color:limegreen">Status: Online</span> <span style="color:red" v-else>Status: Offline</span>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                //
            }
        },

        methods: {
           
        }
    }
</script>


<style>




</style>