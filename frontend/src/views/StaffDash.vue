<template>
    <Navigation></Navigation>

    <div class="constainer">
        <h1 class="m-4 text-white">Staff Dashboard</h1>
        <div class="m-5 text-white">
            <p>Welcome to the staff dashboard. Below are all the tools you need to manage Appointments.</p>
            <p>Actions</p>
            <ul>
                <li><router-link class="links" to="/patients">Manage Patients</router-link></li>
                <li><router-link class="links" to="/appointments">Manage Appointments</router-link></li>
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