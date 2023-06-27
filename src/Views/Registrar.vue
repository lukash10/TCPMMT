<template>

    <main class="form-signin">

        <div class="login-base">
               <div class="card-body">
                    <form>
                        <h2 class="h3 mb-3 fw-normal text-center">Bem vindo (a)</h2>

                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" class="form-control form-control-lg" placeholder="First name"/>
                        </div>

                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" class="form-control form-control-lg" placeholder="Last name"/>
                        </div>

                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control form-control-lg" placeholder="Email address" />
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control form-control-lg" placeholder="Password"/>
                        </div>                        

                        <router-link class="w-100 btn btn-lg btn-primary" type="submit" to="/signin">Sign up</router-link>
                    </form>
                </div>
        </div>  
        <p class="mt-3 mb-3 text-muted text-center">© 2020–2025</p>
    
    </main>

</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            
        }
    }
</script>

<style lang="css" scoped>

body {
    display: flex;
    padding-top: 60px;
    padding-bottom: 60px;        
    align-items: center;
    background-color: #f6f6f6;
}

.login-base{
    width: 390px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 77px 55px 33px;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
    -moz-box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
    -webkit-box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
}

.form-signin {
    width: 100%;
    max-width: 450px;
    margin: auto;
}
    
label {
    font-weight: 600;
}

</style>