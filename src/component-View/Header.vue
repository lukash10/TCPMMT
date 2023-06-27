<template>

    <div class="header">
        <div class="container-fluid menu">

            <div class="col-12 d-flex" style="justify-content: space-between;align-items: center;">
                    
                    <div class="col d-flex" style="justify-content: start;align-items: center;">

                        <div class="" style="justify-content: center;">
                            <span> <img src="../../public/static/logo-pmmt.png" width="50px" height="">  </span>
                        </div>

                        <div class="">
                            <a class="px-1" style="color: white;text-decoration: none;">Sistema de Gestão - Proteção à Mulher</a>
                        </div>
                    </div>

                    <div class="col-2 d-flex" style="justify-content: flex-end;">
                        <b-button style="background-color: #06569b;outline: none;border: none;"  size="lg" class="mb-2" v-b-modal.modal-1>
                            <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
                        </b-button>

                        <b-modal id="modal-1" title="Preferências" hide-footer>
                            <p class="my-4">Área do Usuário</p>
                            <div class="d-flex mt-2" style="justify-content:end">
                                <LoggoutButton />
                            </div>
                        </b-modal>

                    </div>

            </div>
                   
            <div>

                <div class="col-12 mt-3 d-flex" style="justify-content:center">
                    <router-link to="/home" class="link_pages"><b-icon style="color:white" class="mx-1" icon="house-door-fill"></b-icon>Página Inicial</router-link>
                </div>

            </div>

        </div>



    </div>

</template>

<script>
    import LoggoutButton from '../components/LogoutButton.vue';
  
    export default {
        data() {
            return {
                online: true,
                mostrarData: '',
                mostrarHora: '',
            }
        },
       components:{
         LoggoutButton,    
       },
       created() {
            window.addEventListener('online', this.handleOnline);
            window.addEventListener('offline', this.handleOffline);
        },
        destroyed() {
            window.removeEventListener('online', this.handleOnline);
            window.removeEventListener('offline', this.handleOffline);
        },
        methods:{
            handleOnline() {
                this.online = true;
            },
            handleOffline() {
                this.online = false;
            },
            getData(){
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return day + "/" + month + "/" + year;
           },
           getHour(){
                var hour = new Date().getHours();
                var minute = new Date().getMinutes();
                return hour + ":" + minute + "h";
           }
        },
        mounted(){ 
            this.mostrarData = this.getData();
            this.mostrarHora = this.getHour();
        }
    }
</script>

<style scoped>

.menu{
    background-color: rgb(6, 86, 155);;
    padding: 10px;
}

.menu2{
    background-color: rgb(4 57 102);;
    padding: 5px;
}

.link_pages{
    text-decoration: underline;
    border: 1px solid #06569b;
    color: white;
    padding: 3px;
    margin: 5px;
    border-radius: 10px;
}

</style>
  
  
 
  