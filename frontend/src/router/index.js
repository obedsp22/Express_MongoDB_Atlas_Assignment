import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Administration from '../views/AdminDash.vue'
import Users from '../views/Users.vue'
import Doctor from '../views/Doctors.vue'
import Patients from '../views/Patients.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/administration',
        name: 'Administration',
        component: Administration
    },
    {
        path: '/users',
        name: 'Users',
        component: Users
    },
    {
        path: '/doctors',
        name: 'Doctor',
        component: Doctor
    },
    {
        path: '/patients',
        name: 'Patients',
        component: Patients
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router