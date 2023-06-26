<template>
    <Navigation></Navigation>

    <div class="container">
        <div class="mt-5 row">
            <p class="text-center fs-5">User Information</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input v-model="form.user" type="text" class="w-100" placeholder="Enter username here..." required>
                    <input v-model="form.password" :type="password" class="w-100 mt-4" placeholder="Enter password here..."
                        required>
                    <select class="w-100 mt-4" v-model="form.type" required>
                        <option value="">Choose a user type</option>
                        <option value="admin">Administration</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <div class="text-end mt-4">
                    <label class="text-white me-1">Show Password</label>
                    <input type="checkbox" class="me-5" v-model="showPassword" @click="togglePassword">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addUser">Add User</button>
                    <button class="btn btn-primary" v-else @click.prevent="updateUser">Update User</button>
                </div>
            </form>
        </div>

        <table class="table table-striped table-light my-4">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Password</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, i) in users">
                    <td>{{ user.user }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.type }}</td>
                    <td>
                        <button class="btn btn-warning" @click="editUser(user)"><i
                                class="bi bi-person-fill-gear"></i></button>
                        <button class="btn btn-danger ms-3" @click="deleteUser(user._id)"><i
                                class="bi bi-person-fill-dash"></i></button>
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
            users: [],
            form: {
                user: '',
                password: '',
                type: ''
            },
            password: 'password',
            showPassword: false,
            isEdit: false,
        }
    },
    methods: {
        getUsers() {
            let $this = this;
            axios.get(`${this.baseURL}/`)
                .then(response => {
                    $this.users = response.data;
                }).catch(err => {
                    console.log(err);
                });
        },
        addUser() {
            let $this = this;
            let userForm = document.querySelector('form');
            if (!userForm.checkValidity()) {
                userForm.reportValidity();
                userForm.classList.add('was-validated');
                return;
            }
            axios.post(`${this.baseURL}/users/`, this.form)
                .then(response => {
                    for (let i in $this.form) {
                        $this.form[i] = '';
                    }
                    $this.getUsers();
                    userForm.classList.remove('was-validated');
                }).catch(err => {
                    console.log(err);
                });
        },
        editUser(user) {
            this.isEdit = true;
            this.updateId = user._id;
            this.form.user = user.user;
            this.form.password = user.password;
            this.form.type = user.type;
        },
        updateUser() {
            let $this = this;
            let userForm = document.querySelector('form');
            if (!userForm.checkValidity()) {
                userForm.reportValidity();
                userForm.classList.add('was-validated');
                return;
            }
            axios.put(`${this.baseURL}/users/${this.updateId}`, this.form)
                .then(response => {
                    for (let i in $this.form) {
                        $this.form[i] = '';
                    }
                    $this.getUsers();
                    userForm.classList.remove('was-validated');
                    $this.isEdit = false;
                }).catch(err => {
                    console.log(err);
                });
        },
        deleteUser(id) {
            let $this = this;
            if (!confirm('Are you sure you want to delete user?')) return;
            axios.delete(`${this.baseURL}/users/${id}`)
                .then(response => {
                    $this.getUsers();
                }).catch(err => {
                    console.log(err);
                });
        },
        togglePassword() {
            if (!this.showPassword) {
                this.password = 'text';
            } else {
                this.password = 'password';
            }
        }
    },
    mounted() {
        this.getUsers();
    },
}
</script>