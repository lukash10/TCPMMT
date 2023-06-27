<template>

    
    <nav id="mobile" style="background: #212121;">
            <ul class="mb-3 d-flex" style="align-items: center;justify-content: normal;">
                    <li class="mt-2 mb-2">
                        <a class="d-flex" href="/home">
                            <i class="fa fa-home fa-2x"></i>
                            <span class="nav-text">
                            Home
                            </span>
                        </a>
                    
                    </li>
                    <li class="has-subnav mt-2 mb-2">
                        <a class="d-flex" href="#">
                            <i class="fa fa-users"></i>
                            <span class="nav-text">
                                Usuários
                            </span>
                        </a>
                    </li>
                    
                    <li>
                        <a class="d-flex" href="#">
                        <i class="fa fa-info fa-2x"></i>
                            <span class="nav-text">
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
    </nav>
    

</template>

<style scoped>

li{
    list-style: none;
}

a{
    margin-top: 10px;
    color: white;
    text-decoration: none;
}

.fa-2x {
    font-size: 2em;
}
.fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size:20px;
}

</style>
