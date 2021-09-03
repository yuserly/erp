<script src="./js"></script>


<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Crear Alumno</h4>
            
            <form class="needs-validation" @submit.prevent="formSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="validationCustom01">First name</label>
                    <input
                      id="validationCustom01"
                      v-model="form.fname"
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      value="Mark"
                      :class="{
                        'is-invalid': submitted && $v.form.fname.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.fname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.fname.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="validationCustom02">Last name</label>
                    <input
                      id="validationCustom02"
                      v-model="form.lname"
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      value="Otto"
                      :class="{
                        'is-invalid': submitted && $v.form.lname.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.lname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.lname.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="validationCustom03">City</label>
                    <input
                      id="validationCustom03"
                      v-model="form.city"
                      type="text"
                      class="form-control"
                      placeholder="City"
                      :class="{
                        'is-invalid': submitted && $v.form.city.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.city.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.city.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="validationCustom04">State</label>
                    <input
                      id="validationCustom04"
                      v-model="form.state"
                      type="text"
                      class="form-control"
                      placeholder="State"
                      :class="{
                        'is-invalid': submitted && $v.form.state.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.state.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.state.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="validationCustom05">Zip</label>
                    <input
                      id="validationCustom05"
                      v-model="form.zipcode"
                      type="text"
                      class="form-control"
                      placeholder="Zip"
                      :class="{
                        'is-invalid': submitted && $v.form.zipcode.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.zipcode.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.zipcode.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="invalidCheck"
                        required=""
                      />
                      <label class="form-check-label" for="invalidCheck"
                        >Agree to terms and conditions</label
                      >
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Submit form</button>
            </form>
          </div>
        </div>
        <!-- end card -->
      </div>
      
    </div>
    <!-- end row -->
  </Layout>
</template>
