<script>
import Vue from "vue";
import simplebar from "simplebar-vue";
import Multiselect from "vue-multiselect";

export default {
  components: { simplebar, Multiselect },

  data() {
    return {
      urlbackend: this.$urlBackend,
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("@/assets/images/flags/china.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
      options: [],
      empresaSelect: "",
      rolEs: "",
      empGlobMulti: false,
    };
  },
  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    this.rolEs = Vue.prototype.$rol;
    this.verificarEmpresasGlobal();
  },
  methods: {

    verificarEmpresasGlobal(){
       if(Vue.prototype.$rol == "Estudiante"){
         this.empresaSelect = JSON.parse(Vue.prototype.$globalEmpresasSelected);
         this.options = JSON.parse(Vue.prototype.$globalEmpresas);
         this.empGlobMulti = true;
       }else{
         this.empresaSelect = "";
         this.options = [];
         this.empGlobMulti = false;
       }
     },

     changeSelectEmpresa(){
        Vue.prototype.$globalEmpresasSelected = JSON.stringify(this.empresaSelect);
        localStorage.setItem("globalEmpresasSelected", JSON.stringify(this.empresaSelect));
        this.$router.push("/empresa");
     },

    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
    },
    logout() {

      this.axios
          .post(`${this.urlbackend}/auth/logout`, [])
          .then((res) => {
            console.log(res);
            if (res.data.success) {

              localStorage.clear();

              this.$router.push({
                path: "/login",
              });
              location.reload(1);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="" alt height="20" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="" alt height="20" />
            </span>
          </router-link>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input
              type="text"
              class="form-control"
              :placeholder="$t('navbar.search.text')"
            />
            <span class="uil-search"></span>
          </div>
        </form>
      </div>

      <div class="d-flex">
        <div class="d-flex flex-column pt-3 bd-highlight" v-if="empGlobMulti">
          <multiselect
            v-model="empresaSelect"
            placeholder="Seleccionar"
            track-by="id_empresa"
            label= "razon_social"
            :options="options"
            @input="changeSelectEmpresa()"
          ></multiselect>
        </div>
                
        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            data-toggle="fullscreen"
            @click="initFullScreen"
          >
            <i class="uil-minus-path"></i>
          </button>
        </div>
        <b-dropdown
          variant="white"
          class="dropdown d-inline-block"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-bell"></i>
            <span class="badge bg-danger rounded-pill">3</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h5 class="m-0 font-size-16">
                  {{ $t("navbar.dropdown.notification.text") }}
                </h5>
              </div>
              <div class="col-auto">
                <a href="#!" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px" data-simplebar>
            <a href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-primary rounded-circle font-size-16"
                  >
                    <i class="uil-shopping-basket"></i>
                  </span>       
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.order.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.order.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.order.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-3.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.james.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.james.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.james.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-success rounded-circle font-size-16"
                  >
                    <i class="uil-truck"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.item.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.item.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.item.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.salena.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.salena.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.salena.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div class="p-2 border-top">
            <a
              class="btn btn-sm btn-link font-size-14 btn-block text-center"
              href="javascript:void(0)"
            >
              <i class="uil-arrow-circle-right me-1"></i>
              {{ $t("navbar.dropdown.notification.button") }}
            </a>
          </div>
        </b-dropdown>

        <b-dropdown
          class="d-inline-block"
          toggle-class="header-item"
          right
          variant="white"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <span
              class="d-none d-xl-inline-block ms-1 fw-medium font-size-15"
              >{{ $t("navbar.dropdown.marcus.text") }}</span
            >
            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </template>

          <!-- item-->
          <a class="dropdown-item" href="#">
            <i
              class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.profile")
            }}</span>
          </a>
 
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            @click="logout()"
          >
            <i
              class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">Cerrar Sesión</span>
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>