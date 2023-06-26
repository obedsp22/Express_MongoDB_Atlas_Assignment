<template>
    <Navigation></Navigation>

    <div class="container">
        <h1 class="m-4 text-white">Admin Dashboard</h1>
        <div class=" m-5 text-white">
            <p class="fs-5">Welcome to the administration dashboard. Below are all the tools you need to manage this app.
            </p>
            <p>Actions:</p>
            <ul>
                <li><router-link class="links" to="/users">Manage Users</router-link></li>
                <li><router-link class="links" to="/client">Manage Doctors</router-link></li>
                <li><router-link class="links" to="/instructor">Manage Patients</router-link></li>
                <li><router-link class="links" to="/group">Manage Appointments</router-link></li>
                <li><router-link class="links" to="/changepassword">Change Password</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';

export default {
    components: {
        Navigation
    },
}
</script>

<style>
.links {
    font-weight: bold;
    color: white;
    text-decoration: none;
}
</style>