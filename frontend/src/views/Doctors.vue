<template>
    <Navigation></Navigation>
    <div class="container">
        <div class="mt-5 row">
            <p class="text-center text-white fs-5">Doctor Information</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input v-model="form.firstName" type="text" class="w-100" placeholder="Enter first name..." required>
                    <input v-model="form.lastName" type="text" class="w-100 mt-4" placeholder="Enter last name..." required>
                    <input v-model="form.phoneNumber" type="text" class="w-100 mt-4"
                        placeholder="Enter phone number (Ex: 123-456-7890)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
                    <select v-model="form.specialty" class="w-100 mt-4" required>
                        <option value="">Choose Doctor Specialty</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="General surgery">General surgery</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Neurosurgery">Neurosurgery</option>
                        <option value="Radiology">Radiology</option>
                    </select>
                </div>
                <div class="text-end mt-4">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addDoctor">Add Doctor</button>
                    <button class="btn btn-primary" v-else @click.prevent="updateDoctor">Update Doctor</button>
                </div>
            </form>

            <table class="table table-striped table-light my-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Specialty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doc in doctors">
                        <td>{{ doc.firstName }} {{ doc.lastName }}</td>
                        <td>{{ doc.phoneNumber }}</td>
                        <td>{{ doc.specialty }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editDoctor(doc)"><i
                                    class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3" @click="deleteDoctor(doc._id)"><i
                                    class="bi bi-trash3-fill"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            doctors: [],
            form: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                specialty: ''
            },
            isEdit: false,
        }
    },
    methods: {
        getDoctors() {
            let $this = this;
            axios.get(`${this.baseURL}/doctors`)
                .then(function (response) {
                    $this.doctors = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addDoctor() {
            let $this = this;
            let doctorForm = document.querySelector('form');
            if (!doctorForm.checkValidity()) {
                doctorForm.reportValidity();
                doctorForm.classList.add('was-validated');
                return;
            }
            axios.post(`${this.baseURL}/doctors/`, this.form)
                .then(response => {
                    for (let i in $this.form) {
                        $this.form[i] = '';
                    }
                    $this.getDoctors();
                    doctorForm.classList.remove('was-validated');
                }).catch(error => {
                    console.log(error);
                });
        },
        editDoctor(doctor) {
            this.isEdit = true;
            this.updateId = doctor._id;
            this.form.firstName = doctor.firstName;
            this.form.lastName = doctor.lastName;
            this.form.phoneNumber = doctor.phoneNumber;
            this.form.specialty = doctor.specialty;
        },
        updateDoctor() {
            let $this = this;
            let doctorForm = document.querySelector('form');
            if (!doctorForm.checkValidity()) {
                doctorForm.reportValidity();
                doctorForm.classList.add('was-validated');
                return;
            }
            axios.put(`${this.baseURL}/doctors/${this.updateId}`, this.form)
                .then(response => {
                    for (let i in $this.form) {
                        $this.form[i] = '';
                    }
                    $this.getDoctors();
                    $this.isEdit = false;
                    doctorForm.classList.remove('was-validated');
                }).catch(error => {
                    console.log(error);
                });
        },
        deleteDoctor(id) {
            let $this = this;
            if (!confirm('Are you sure you want to delete doctor?')) return;
            axios.delete(`${this.baseURL}/doctors/${id}`)
                .then(response => {
                    $this.getDoctors();
                }).catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getDoctors();
    }
}
</script>