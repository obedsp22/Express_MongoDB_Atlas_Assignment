<template>
    <Navigation></Navigation>

    <div class="container">
        <div class="row mt-5">
            <p class="text-center text-white fs-5">Patients Information</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input type="text" class="w-100" placeholder="Enter first name..." required>
                    <input type="text" class="w-100 mt-4" placeholder="Enter first name..." required>
                    <input type="text" class="w-100 mt-4" placeholder="Enter first name..." required>
                    <input type="text" class="w-100 mt-4" placeholder="Enter first name..." required>
                    <input type="tel" class="w-100 mt-4" placeholder="Enter first name..." required>
                    <input type="date" class="w-100 mt-4" placeholder="Enter first name..." required>
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
            form: {
                firstName: '',
                lastName: '',
                gender: '',
                address: '',
                zip: '',
                phoneNumber: '',
                dob: '',
            },
            isEdit: false,
        }
    },

}
</script>