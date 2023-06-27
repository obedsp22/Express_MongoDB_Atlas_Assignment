import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Administration from '../views/AdminDash.vue'
import Users from '../views/Users.vue'
import Doctor from '../views/Doctors.vue'
import Patients from '../views/Patients.vue'
import Staff from '../views/StaffDash.vue'
import Appointments from '../views/Appointments.vue'
import ChangePassword from '../views/EditPassword.vue'

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
    },
    {
        path: '/staff',
        name: 'Staff',
        component: Staff
    },
    {
        path: '/appointments',
        name: 'Appointments',
        component: Appointments
    },
    {
        path: '/changepassword',
        name: 'ChangePassword',
        component: ChangePassword
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router