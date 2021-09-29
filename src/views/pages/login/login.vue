<script>
import Vue from 'vue'
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  methods: {
    formSubmit() {
      console.log(this.form);
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.axios
          .post(`${this.urlbackend}/auth/login`, this.form)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              console.log("Logiiin");
              const token = res.data.data.token;
              const id_estudiante_docente = res.data.data.id_estudiante;
              localStorage.setItem("token", token);
              localStorage.setItem("rol", "estudiante");
              localStorage.setItem(
                "id_estudiante_docente",
                id_estudiante_docente
              );
              let arrayrol = [];
              arrayrol.push({
                Docente: [
                  "Crear Docente",
                  "Editar Docente",
                  "Listar Docente",
                  "Eliminar Docente",
                  "Activar Docente",
                  "Solicitud Empresa",
                  "Solicitud Inicio Actividad",
                ],
              });

              localStorage.setItem('roles', JSON.stringify(arrayrol));

              arrayrol[0].Docente.map((p) => {
                console.log(p);

                if(p == 'Crear Docente'){
                  console.log(p);
                  Vue.prototype.$CrearDocente = true;
                }else if (p == 'Editar Docente'){
                  Vue.prototype.$EditarDocente = false;
                }else if (p == 'Listar Docente'){
                  Vue.prototype.$ListarDocente = true;
                }else if (p == 'Eliminar Docente'){
                  Vue.prototype.$EliminarDocente = true;
                }else if (p == 'Activar Docente'){
                  Vue.prototype.$ActivarDocente = true;
                }else if (p == 'Solicitud Empresa'){
                  Vue.prototype.$SolicitudEmpresa = true;
                }else if (p == 'Solicitud Inicio Actividad'){
                  Vue.prototype.$SolicitudInicioActividad = true;
                }
                return p;
              });

              this.$router.push("/empresa");
            } else {
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
  },
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/login" class="mb-5 d-block auth-logo">
                <img
                  src="@/assets/images/logo.png"
                  alt=""
                  height="150"
                  class="logo logo-dark"
                />
                <img
                  src="@/assets/images/logo.png"
                  alt=""
                  height="100"
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
                  <p class="text-muted">ERP Contabilidad y Administración.</p>
                </div>
                <div class="p-2 mt-4">
                  <form class="needs-validation" @submit.prevent="formSubmit">
                    <div class="mb-3">
                      <label for="username">Correo</label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="usuario@correo.com"
                        v-model="form.email"
                        :class="{
                          'is-invalid': submitted && $v.form.email.$error,
                        }"
                      />
                      <div
                        v-if="submitted && $v.form.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.form.email.required"
                          >Email requerido.</span
                        >
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
                      <label for="userpassword">Contraseña</label>
                      <input
                        type="password"
                        class="form-control"
                        id="userpassword"
                        v-model="form.password"
                        placeholder="**********"
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
                        <i class="mdi mdi-login-variant"></i>
                        Ingresar
                      </button>
                    </div>
                    <hr />
                    <p>
                      © {{ new Date().getFullYear() }} Desarrollado por
                      <i
                        class="mdi mdi-checkbox-marked-circle-outline text-primary"
                      ></i>
                      CENTO - Servicios Informaticos.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
