import {
    required,
    email,
    minLength,
    sameAs,
    maxLength,
    minValue,
    maxValue,
    numeric,
    url,
    alphaNum,
  } from "vuelidate/lib/validators";
  
import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
    },
    data() {
      return {
        title: "Form Validation",
        items: [
          {
            text: "Forms",
            href: "/",
          },
          {
            text: "Validation",
            active: true,
          },
        ],
        form: {
          fname: "",
          lname: "",
          city: "",
          state: "",
          zipcode: "",
        },
        tooltipform: {
          fname: "",
          lname: "",
          username: "",
          city: "",
          state: "",
        },
        range: {
          minlen: "",
          maxlength: "",
          between: "",
          minval: "",
          maxval: "",
          rangeval: "",
          expr: "",
        },
        typeform: {
          name: "",
          password: "",
          confirmPassword: "",
          email: "",
          url: "",
          digit: "",
          number: "",
          alphanum: "",
          textarea: "",
        },
        submitted: false,
        submitform: false,
        submit: false,
        typesubmit: false,
      };
    },
    validations: {
      form: {
        fname: {
          required,
        },
        lname: {
          required,
        },
        city: {
          required,
        },
        state: {
          required,
        },
        zipcode: {
          required,
        },
      },
      tooltipform: {
        fname: {
          required,
        },
        lname: {
          required,
        },
        username: {
          required,
        },
        city: {
          required,
        },
        state: {
          required,
        },
      },
      range: {
        minlen: {
          required,
          minLength: minLength(6),
        },
        maxlength: {
          required,
          maxLength: maxLength(6),
        },
        between: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(10),
        },
        minval: {
          required,
          minValue: minValue(6),
        },
        maxval: {
          required,
          maxValue: maxValue(6),
        },
        rangeval: {
          required,
          minValue: minValue(6),
          maxValue: maxValue(100),
        },
        expr: {
          required,
        },
      },
      typeform: {
        name: {
          required,
        },
        password: {
          required,
          minLength: minLength(6),
        },
        confirmPassword: {
          required,
          sameAsPassword: sameAs("password"),
        },
        email: {
          required,
          email,
        },
        url: {
          required,
          url,
        },
        digit: {
          required,
          numeric,
        },
        number: {
          required,
          numeric,
        },
        alphanum: {
          required,
          alphaNum,
        },
        textarea: {
          required,
        },
      },
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      formSubmit(e) {
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
      },
  
      tooltipForm() {
        this.submitform = true;
        this.$v.$touch();
      },
  
      /**
       * Range validation form submit
       */
      // eslint-disable-next-line no-unused-vars
      rangeform(e) {
        this.submit = true;
        // stop here if form is invalid
        this.$v.$touch();
      },
      /**
       * Validation type submit
       */
      // eslint-disable-next-line no-unused-vars
      typeForm(e) {
        this.typesubmit = true;
        // stop here if form is invalid
        this.$v.$touch();
      },
    },
  };