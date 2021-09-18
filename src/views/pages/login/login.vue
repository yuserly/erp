<script>
import {
    required,
    email
  } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
 
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  data() {
    return {
       urlbackend: this.$urlBackend,
        form: {
          email: '',
          password:''
        },
        submitted: false,
    };
  },
  validations: {
      form: {
        email:{
          required,
          email
        },
        password:{
          required
        }
      },
      
    },

    methods:{
        formSubmit() {
            console.log(this.form)
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.axios
              .post(`${this.urlbackend}/auth/login`, this.form)
              .then((res) => {
                console.log(res)
                if (res.data.success) {
                 console.log("Logiiin")
                 const token = res.data.data.token;
                 const id_estudiante_docente = res.data.data.id_estudiante;
                 localStorage.setItem('token', token);
                 localStorage.setItem('rol', 'estudiante');
                 localStorage.setItem('id_estudiante_docente', id_estudiante_docente);
                 this.$router.push('/empresa')
                }else{

                    const title = "Login";
                    const message = "Revisa el usuario o contraseña ingresada";
                    const type = "error";
                    this.successmsg(title, message, type);

                }
              })
              .catch((error) => {
                console.log("error", error);
                const title = "Login";
                const message = "Revisa el usuario o contraseña ingresada";
                const type = "error";
                this.successmsg(title, message, type);
              });
            }
        },
        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },
    }
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="@/assets/images/logo-dark.png"
                  alt=""
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="@/assets/images/logo-light.png"
                  alt=""
                  height="22"
                  class="logo logo-light"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Bienvenido !</h5>
                  <p class="text-muted">Sign in to continue to Minible.</p>
                </div>
                <div class="p-2 mt-4">
                  <form class="needs-validation" @submit.prevent="formSubmit">
                    <div class="mb-3">
                      <label for="username">Correo</label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="user@mail.com"
                        v-model="form.email"
                        :class="{
                        'is-invalid': submitted && $v.form.email.$error,
                        }"
                      />
                      <div
                            v-if="submitted && $v.form.email.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.email.required">Email requerido.</span>
                            <span v-if="!$v.form.email.email"
                            >Ingrese un email valido.</span
                            >
                        
                    </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/auth/recoverpwd" class="text-muted">
                          Olvidó su contraseña</router-link
                        >
                      </div>
                      <label for="userpassword">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="userpassword"
                        v-model="form.password"
                        placeholder="Ingresa contraseña"
                        :class="{
                        'is-invalid': submitted && $v.form.password.$error,
                        }"
                      />
                      <div
                            v-if="submitted && $v.form.password.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.password.required"
                            >Contraseña requerida.</span
                            >
                        </div>
                    </div>

                    <div class="mt-3 text-end">
                      <button
                        class="btn btn-primary w-sm waves-effect waves-light"
                        type="submit"
                      >
                        Iniciar
                      </button>
                    </div>

                   
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              <p>
                © {{ new Date().getFullYear() }} Minible. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Themesbrand
              </p>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
  </div>
</template>
