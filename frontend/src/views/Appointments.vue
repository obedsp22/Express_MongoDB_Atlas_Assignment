<template>
    <Navigation></Navigation>

    <div class="container">
        <div class="row mt-5">
            <p class="text-center text-white fs-5">Appointments</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input v-model="form.date" type="date" class="w-100" required>
                    <input v-model="form.time" type="time" class="w-100 mt-4" required>
                    <select v-model="form.patient" class="w-100 mt-4" required>
                        <option value="">Select Patient</option>
                        <option v-for="p in patients" :value="p">{{ p.firstName }} {{ p.lastName }}</option>
                    </select>
                    <select v-model="form.doctor" class="w-100 mt-4" required>
                        <option value="">Select Doctor</option>
                        <option v-for="d in doctors" :value="d">{{ d.firstName }} {{ d.lastName }}</option>
                    </select>
                    <select v-model="form.location" class="w-100 mt-4" required>
                        <option value="">Select Location</option>
                        <option value="Surgery Room">Surgery Department</option>
                        <option value="X-ray Room">X-ray Department</option>
                        <option value="Emergency Room">Emergency Room</option>
                        <option value="Therapy Room">Therapy Room</option>
                    </select>
                    <select v-model="form.status" class="w-100 mt-4" required>
                        <option value="">Select Status</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Missed">Missed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div class="text-end mt-4">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="setAppointment">Make Appointment</button>
                    <button class="btn btn-primary" v-else @click.prevent="updateAppointment">Update Appointment</button>
                </div>
            </form>
        </div>
        <table class="table table-striped table-light my-4">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appoints in appointments">
                    <td>{{ appoints.date }}</td>
                    <td>{{ appoints.time }}</td>
                    <td>{{ appoints.patient.firstName }} {{ appoints.patient.lastName }}</td>
                    <td>{{ appoints.doctor.firstName }} {{ appoints.doctor.lastName }}</td>
                    <td>{{ appoints.location }}</td>
                    <td>{{ appoints.status }}</td>
                    <td>
                        <button class="btn btn-warning" @click="editAppointment(appoints)"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger ms-3" @click="deleteAppointment(appoints._id)"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
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
                time: '',
                patient: '',
                doctor: '',
                location: '',
                status: '',
            },
            isEdit: false,
        }
    },
    methods: {
        getPatients() {
            axios.get(`${this.baseURL}/patients/`)
                .then((response) => {
                    this.patients = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDoctors() {
            axios.get(`${this.baseURL}/doctors/`)
                .then((response) => {
                    this.doctors = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getAppointments() {
            axios.get(`${this.baseURL}/appointments/`)
                .then((response) => {
                    for(let i in response.data) {
                        response.data[i].date = response.data[i].date.split('T')[0];
                    }
                    this.appointments = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setAppointment() {
            let $this = this;
            let appointmentForm = document.querySelector('form');
            if(!appointmentForm.checkValidity()) {
                appointmentForm.reportValidity();
                appointmentForm.classList.add('was-validated');
                return;
            }
            let findDate_Time = this.appointments.find(appoint => appoint.date === this.form.date && appoint.time === this.form.time);

            if(findDate_Time) {
                alert('Appointment already exists. Please select another date and time.');
                return;
            }
            axios.post(`${this.baseURL}/appointments/`, this.form)
            .then(response => {

            }).catch(err => {
                console.log(err);
            }).finally(() => {
                $this.getAppointments();
                $this.form = {
                    date: '',
                    time: '',
                    patient: '',
                    doctor: '',
                    location: '',
                    status: '',
                };
                appointmentForm.classList.remove('was-validated');
            });
        },  
        editAppointment(appoint) {
            this.isEdit = true;
            this.updateId = appoint._id;
            this.form = {
                date: appoint.date,
                time: appoint.time,
                patient: appoint.patient,
                doctor: appoint.doctor,
                location: appoint.location,
                status: appoint.status,
            };
        },
        updateAppointment() {
            let $this = this;
            let appointmentForm = document.querySelector('form');
            if(!appointmentForm.checkValidity()) {
                appointmentForm.reportValidity();
                appointmentForm.classList.add('was-validated');
                return;
            }
            let findDate_Time = this.appointments.find(appoint => appoint.date === this.form.date && appoint.time === this.form.time);
            if(findDate_Time) {
                if(findDate_Time.doctor._id !== this.form.doctor._id) {
                    alert('Appointment already exists. Please select another date and time.');
                    return;
                }
            }
            axios.put(`${this.baseURL}/appointments/${this.updateId}`, this.form)
            .then(response => {

            }).catch(err => {
                console.log(err);
            }).finally(() => {
                $this.getAppointments();
                $this.form = {
                    date: '',
                    time: '',
                    patient: '',
                    doctor: '',
                    location: '',
                    status: '',
                };
                $this.isEdit = false;
                appointmentForm.classList.remove('was-validated');
            });
        },
        deleteAppointment(id) {
            let $this = this;
            if(!confirm('Are you sure you want to delete this appointment?')) {
                return;
            }
            axios.delete(`${this.baseURL}/appointments/${id}`)
            .then(response => {

            }).catch(err => {
                console.log(err);
            }).finally(() => {
                $this.getAppointments();
            });
        }
    },
    mounted() {
        this.getPatients();
        this.getDoctors();
        this.getAppointments();
    }
}
</script>