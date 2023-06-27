<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">Clinic System</a>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="link">Home</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Menu
                            </a>
                            <ul class="dropdown-menu bg-light">
                                <li><router-link class="dropdown-item" to="/users" v-if="isAdmin">Users</router-link></li>
                                <li><router-link class="dropdown-item" to="/doctors" v-if="isAdmin">Doctors</router-link></li>
                                <li><router-link class="dropdown-item" to="/patients">Patients</router-link></li>
                                <li><router-link class="dropdown-item" to="/appointments">Appointments</router-link></li>
                                <li><router-link class="dropdown-item" to="/changepassword">Change Password</router-link></li>
                            </ul>
                        </li>
                        <li>
                            <router-link class="nav-link" to="/" @click="logout">Logout</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return { 
            isAdmin: false,
            link: '',
        }
    },
    methods: {
        logout() {
            let logged_in = localStorage.getItem('logged_in');
            localStorage.removeItem('logged_in');
            let currentUser = localStorage.getItem('currentUser');
            localStorage.removeItem('currentUser');
        },
        checkUser() {
            let admin = localStorage.getItem('admin');
            if (admin == 'true') {
                this.isAdmin = true;
                this.link = '/administration';
            }
            else {
                this.isAdmin = false;
                this.link = '/staff';
            }
        }
    },
    mounted() {
        this.checkUser();
    }
}
</script>

<style>
    .dropdown-item:hover {
        color: white;
        background-color: black;
    }
</style>