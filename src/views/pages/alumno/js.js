import {
    required,
    email,
    minLength
  } from "vuelidate/lib/validators";
  
import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
    },
    data() {
      return {
        form: {
          nombres: '',
          apellidos: '',
          email: '',
          niveles: '',
          password: '',

        },
        submitted: false,
      };
    },
    validations: {
      form: {
        nombres: {
          required,
        },
        apellidos: {
          required,
        },
        email: {
          required,
          email
        },
        niveles: {
          required,
        },
        password: {
          required,
          minLength: minLength(4)
        },
      },
      
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      formSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
      },
  
    },
  };