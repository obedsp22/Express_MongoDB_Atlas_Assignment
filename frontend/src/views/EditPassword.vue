<template>
    <Navigation></Navigation>

    <div class="container">
        <div class="row mt-5">
            <p class="text-white fs-5 mb-5">Hello {{ user }}, please enter all fields to change password.</p>
            <form class="offset-sm-3 col-md-6">
                <div>
                    <input v-model="oldPassword" :type="password1" class="w-75" placeholder="Enter old password" required> <input type="checkbox" v-model="showPassword" @click="toggle"> <label class="text-white">Show Password</label>
                    <input v-model="newPassword" :type="password2" class="w-75 mt-4" placeholder="Enter new password" required> <input type="checkbox" v-model="showPassword2" @click="toggle2"> <label class="text-white">Show Password</label>
                    <input v-model="confirmPassword" :type="password2" class="w-100 mt-4" placeholder="Confirm new password" required> 
                </div>
                <div class="text-end mt-4">
                    <button class="btn btn-primary mt-4" @click.prevent="changePassword">Change Password</button>
                </div>
            </form>
        </div>

        <div v-if="alert" :class="[ isSuccess ? 'alert alert-success' : 'alert alert-danger' ]" class="fs-5 p-3 mt-3">
            {{ error }}
            {{ success }}
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
            user: '',
            currentuser: [],
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: '',
            success: '',
            isSuccess: false,
            alert: false,
            password1: 'password',
            password2: 'password',
            showPassword: false,
            showPassword2: false
        }
    },
    methods: {
        changePassword() {
            this.alert = true;

            let $this = this;
            let form = document.querySelector('form');
            if (!form.checkValidity()) {
                this.error = 'Please fill out all fields';
                return;
            }

            let logged_user = JSON.parse(localStorage.getItem('currentUser'));
            let findUser = this.currentuser.find(user => user.user == logged_user.user && user.type == logged_user.type);

            if(this.oldPassword !== findUser.password) {
                this.error = 'Old password is incorrect';
                this.success = '';
                return;
            }

            if (this.newPassword === this.confirmPassword) {
                this.error = '';
                this.success = 'Password changed successfully';
                this.isSuccess = true;
            } else {
                this.error = 'Passwords do not match';
                this.success = '';
                return;
            }

            axios.put(`${this.baseURL}/newpassword/${findUser._id}`, {
                user: findUser.user,
                password: this.newPassword,
                type: findUser.type
            }).then(response => {
                if(findUser.type == 'admin') {
                    location.href = '/administration';
                } else {
                    location.href = '/staff';
                }
            }).catch(err => {
                console.log(err);
            });
        },
        getOldPassword() {
            let $this = this;
            axios.get(`${this.baseURL}/`)
                .then(response => {
                    $this.currentuser = response.data;
                }).catch(err => {
                    console.log(err);
                });
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.user = currentUser.user;
        },
        toggle() {
            if(!this.showPassword) {
                this.password1 = 'text';
            } else {
                this.password1 = 'password';
            }
        },
        toggle2() {
            if(!this.showPassword2) {
                this.password2 = 'text';
            } else {
                this.password2 = 'password';
            }
        }
    },
    mounted() {
        this.getOldPassword();
    }    
}
</script>