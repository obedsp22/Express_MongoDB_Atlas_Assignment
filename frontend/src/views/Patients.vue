<template>
    <Navigation></Navigation>

    <div class="container">
        <div class="row mt-5">
            <p class="text-center text-white fs-5">Patients Information</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input v-model="form.firstName" type="text" class="w-100" placeholder="Enter first name..." required>
                    <input v-model="form.lastName" type="text" class="w-100 mt-4" placeholder="Enter last name..." required>
                    <select v-model="form.gender" class="w-100 mt-4" required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input v-model="form.address" type="text" class="w-100 mt-4" placeholder="Enter address..." required>
                    <input v-model="form.zip" type="tel" class="w-100 mt-4" placeholder="Enter zip code(ex- 12345)..." pattern="[0-9]{5}" required>
                    <input v-model="form.dob" type="date" class="w-100 mt-4" required>
                </div>
                <div class="text-end mt-4">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addPatient">Add Patient</button>
                    <button class="btn btn-primary" v-else @click.prevent="updatePatient">Update Patient</button>
                </div>
            </form>

            <table class="table table-striped table-light my-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Zip</th>
                        <th>DOB</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in patients">
                        <td>{{ p.firstName }} {{ p.lastName }}</td>
                        <td>{{ p.gender }}</td>
                        <td>{{ p.address }}</td>
                        <td>{{ p.zip }}</td>
                        <td>{{ p.dob }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editPatient(p)"><i
                                class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger ms-3"><i
                                class="bi bi-trash3-fill" @click="deletePatient(p._id)"></i></button>
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
    methods: {
        getPatients() {
            let $this = this;
            axios.get(`${this.baseURL}/patients/`)
            .then(function (response) {
                for(let i in response.data) {
                    response.data[i].dob = response.data[i].dob.split('T')[0];
                }
                $this.patients = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addPatient() {
            let $this = this;
            let patientsForm = document.querySelector('form');
            if (!patientsForm.checkValidity()) {
                patientsForm.reportValidity();
                patientsForm.classList.add("was-validated");
                return;
            }
            axios.post(`${this.baseURL}/patients/`, this.form)
            .then(response => {
                for(let i in $this.form) {
                    $this.form[i] = '';                    
                }
                $this.getPatients();
                patientsForm.classList.remove("was-validated");
            }).catch(error => {
                console.log(error);
            });
        },
        editPatient(patient) {
            this.isEdit = true;
            this.updateId = patient._id;
            this.form.firstName = patient.firstName;
            this.form.lastName = patient.lastName;
            this.form.gender = patient.gender;
            this.form.address = patient.address;  
            this.form.zip = patient.zip;
            this.form.phoneNumber = patient.phoneNumber;
            this.form.dob = patient.dob;
        },
        updatePatient() {
            let $this = this;
            let patientsForm = document.querySelector('form');
            if (!patientsForm.checkValidity()) {
                patientsForm.reportValidity();
                patientsForm.classList.add("was-validated");
                return;
            }
            axios.put(`${this.baseURL}/patients/${this.updateId}`, this.form)
            .then(response => {
                for(let i in $this.form) {
                    $this.form[i] = '';                    
                }
                $this.getPatients();
                patientsForm.classList.remove("was-validated");
                $this.isEdit = false;
            }).catch(error => {
                console.log(error);
            });
        },
        deletePatient(id) {
            let $this = this;
            if(!confirm('Are you sure you want to delete this patient?')) {
                return;
            }
            axios.delete(`${this.baseURL}/patients/${id}`)
            .then(response => {
                $this.getPatients();
            }).catch(error => {
                console.log(error);
            });
        }
    },
    mounted() {
        this.getPatients();
    }
}
</script>