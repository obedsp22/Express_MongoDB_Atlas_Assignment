<template>
    <Navigation></Navigation>

    <div class="container">
        <div class="row mt-5">
            <p class="text-center text-white fs-5">Appointments</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input v-model="form.date" type="date" class="w-100" required>
                    <select v-model="form.patient" class="w-100 mt-4" required>
                        <option value="">Choose Patient</option>
                    </select>
                    <select v-model="form.doctor" class="w-100 mt-4" required>
                        <option value="">Choose Doctor</option>
                    </select>
                </div>
                <div class="text-end mt-4">
                    <button class="btn btn-primary" v-if="!isEdit">Make Appointment</button>
                    <button class="btn btn-primary" v-else>Update Appointment</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';

export default {
    components: {
        Navigation
    },
    data() {
        return {
            baseURL: 'http://localhost:3000',
            updateId: 0,
            patients: [],
            doctors: [],
            appointments: [],
            form: {
                date: '',
                patient: '',
                doctor: '',
            },
            isEdit: false,
        }
    }
}
</script>