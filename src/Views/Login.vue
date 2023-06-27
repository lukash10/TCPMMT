<template>        
    <body id="main-login">
        <div class="login-base"> 
               <div class="card-body">
                <b-alert :show="error" variant="danger">Erro ao efetuar login.</b-alert>
                    <b-form @submit.prevent="onSubmit">
                        <h2 class="login-tittle mb-4">Bem vindo (a)</h2>

                        <div style="display: flex;justify-content: center;">
                            <img src="../../public/static/logo-pmmt.png" class="image-logo">
                        </div>


                        <div class="form-floating mb-3">
                            <input v-model="form.login" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                            <label for="floatingInput">Email address</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="form.senha" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                        </div>

                        <button class="w-100 btn btn-lg button-color" style="background-color:black;border:none !important;color:white" type="submit">Entrar</button>
                        

                    </b-form>

                    <p class="mt-5 text-muted text-center" style="color:black !important;font-weight: bold;">Omega Software ©</p>
                </div>
        </div>  
    </body>
</template>

<script>
    
    import axios from "axios";

    export default {
        data() {
            return {
                form: {
                    login: '',
                    senha: ''
                },
                error: false
            }
        },
        async mounted() {
            this.error = false;
            console.log(await this.isLoggedIn());
            
            if (await this.isLoggedIn()) {
                this.$router.push('/home');
            }
        },
        methods: {
            async onSubmit() {
                
                await this.deleteUsuario();
               
                const response = await axios.post('/api/login', this.form);
             
                if (!response.data.success) {
                    this.error = true;
                } else {

                    await this.addUsuario(response.data.usuario);
                    
                    if(response.data.usuario.rrole == "ADMIN"){
                        this.$router.push('/dashboard');
                    }else{
                        console.log("USER:POLICIAL");
                        this.$router.push('/home');
                    }
                    
                }
            },
            async onSubmitNoApi() {
                
                await this.deleteUsuario();

                await this.addUsuario({ nome:"Lukash" });
                this.$router.push('/home');
            }
        }
    }
</script>

<style>

#main-login{
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-logo{
    width: 100px !important;
    height: 100px !important;
}


.login-base{
    margin-top: 50px;
    width: 390px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding:30px;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
    -moz-box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
    -webkit-box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
}

.login-tittle{
    display: block;
    font-size: 30px;
    color: #333;
    line-height: 1.2;
    text-align: center;
}


.form-group{
    width: 100%;
    position: relative;
    border-bottom: 2px solid #adadad;
    margin-bottom: 37px;
}

.input100{
    font-size: 15px;
    color: #555;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 45px;
    background: 0 0;
    padding: 0 5px;
    border: none;
}

    
label{
    font-weight: 600;
}

</style>