<template>

    <nav id="vertical" class="main-menu">
                <ul class="mt-3">
                    <li class="mt-2 mb-2">
                        <a href="/home">
                            <i class="fa fa-home fa-2x"></i>
                            <span class="nav-text">
                            Página Inicial
                            </span>
                        </a>
                    
                    </li>
                    <li class="has-subnav mt-2 mb-2">
                        <a href="#">
                            <i class="fa fa-users"></i>
                            <span class="nav-text">
                                Usuários
                            </span>
                        </a>
                    </li>
                    
                  
                  
                    <li>
                        <a href="#">
                        <i class="fa fa-info fa-2x"></i>
                            <span class="nav-text">
                                Documentação
                            </span>
                        </a>
                    </li>
                </ul>

                <ul class="logout">
                    <li>
                        <a href="#">
                            <i class="fa fa-power-off fa-2x"></i>
                            <span class="nav-text">
                                Logout
                            </span>
                        </a>
                    </li>  
                </ul>
    </nav>

</template>

<style scoped>


.centered{
    display: flex;
    justify-content: center;
    align-items: center;
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
.main-menu:hover,nav.main-menu.expanded {
    width:200px;
    overflow:visible;
    height: 100%;
}

.main-menu {
    background:#212121;
    border-right:1px solid #e5e5e5;
    position:fixed;
    top:0;
    bottom:0;
    height:100vh;
    left:0;
    width:60px;
    overflow:hidden;
    -webkit-transition:width .05s linear;
    transition:width .05s linear;
    -webkit-transform:translateZ(0) scale(1,1);
    z-index:1000;
}

.main-menu>ul {
    margin:7px 0;
}

.main-menu li {
    position:relative;
    display:block;
    width:250px;
}

.main-menu li>a {
    position:relative;
    display:table;
    border-collapse:collapse;
    border-spacing:0;
    color:#999;
    font-family: arial;
    font-size: 14px;
    text-decoration:none;
    -webkit-transform:translateZ(0) scale(1,1);
    -webkit-transition:all .1s linear;
    transition:all .1s linear;
}

.main-menu .nav-icon {
    position:relative;
    display:table-cell;
    width:60px;
    height:36px;
    text-align:center;
    vertical-align:middle;
    font-size:18px;
}

.main-menu .nav-text {
    position:relative;
    display:table-cell;
    vertical-align:middle;
    width:138px;
}

.main-menu>ul.logout {
position:absolute;
left:0;
bottom:0;
}


a:hover,a:focus {
text-decoration:none;
}

nav {
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
-o-user-select:none;
user-select:none;
}

nav ul,nav li {
outline:0;
margin:0;
padding:0;
}
.main-menu li:hover>a,nav.main-menu li.active>a,.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus,.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,.dashboard-page nav.dashboard-menu ul li.active a {
color:#fff;
background-color:#000000;
}

</style>