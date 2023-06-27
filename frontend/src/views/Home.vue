<template>
    <div id="main" class="container">
        <div class="row">
            <h1 id="h1" class="text-white">Login to Clinic</h1>
            <form id="form" class="col-sm-5">
                <input v-model="form.username" type="text" class="w-100" placeholder="Enter Username" required>
                <input v-model="form.password" type="password" class="w-100 mt-4" placeholder="Enter Password" required>
                <div class="text-end mt-4">
                    <button class="ms-3 btn btn-primary" @click.prevent="login">Log In</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseURL: 'http://localhost:3000',
            users: [],
            form: {
                username: '',
                password: ''
            },
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
        login() {
            let $this = this;
            let loginForm = document.querySelector('form');
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                loginForm.classList.add('was-validated');
                return;
            }

            let validUser = $this.users.find(user => user.user == $this.form.username && user.password == $this.form.password);
            if (!validUser) {
                alert('Invalid Username or Password!');
                return;
            }

            let currentUser = {
                user: $this.form.username,
                type: validUser.type
            }

            alert('Login Successfull! Redirecting to Dashboard.');
            localStorage.setItem('logged_in', true);
            if (this.form.username == validUser.user && this.form.password == validUser.password && validUser.type == 'admin') {
                location.href = '/administration';
                localStorage.setItem('admin', true);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            else {
                location.href = '/staff';
                localStorage.setItem('admin', false);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            for (let i in $this.loginForm) {
                $this.loginForm[i] = '';
            }
            loginForm.classList.remove('was-validated');
        }
    },
    mounted() {
        this.getUsers();
    },
}
</script>

<style>
body,
html {
    height: 100%;
    margin: 0;
}

main {
    background: url('/images/login.jpg') no-repeat center center fixed;
    height: 970px;
    background-size: cover;
}

#main {
    padding-top: 100px;
    padding-bottom: 100px;
}

#form {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

#h1 {
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}
</style>