<script src="./remuneraciones.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listado Remuneraciones</h4>

            <div class="row mt-5">
              <div class="col-12">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-end"
                  v-b-modal.remuneracion
                  @click="modalNuevo"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear Remuneración
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entradas
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end"
                >
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Buscar..."
                      class="form-control form-control-sm ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>

            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.remuneracion
                        data-toggle="modal"
                        data-target=".bs-example-remuneracion"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <!-- <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="eliminar(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-power font-size-18"></i>
                      </a>
                    </li> -->
                  </ul>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal -->

      <b-modal
        id="remuneracion"
        size="lg"
        :title="titlemodal"
        title-class="font-18"
        hide-footer
        v-if="modal"
      >
        <form class="needs-validation" @submit.prevent="formSubmit">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="trabajador">Trabajador</label>
                <multiselect
                  v-model="form.trabajador_id"
                  :options="options"
                  track-by="trabajador_id"
                  :custom-label="customLabel"
                  @input="infotrabajador()"
                ></multiselect>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="sueldo_base">Sueldo Base</label>
                <input
                  id="sueldo_base"
                  v-model="form.sueldo_base"
                  type="number"
                  disabled
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="dias_trabajados">Dias trabajados</label>
                <input
                  id="dias_trabajados"
                  v-model="form.dias_trabajados"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.dias_trabajados.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.dias_trabajados.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.dias_trabajados.required"
                    >Dias trabajados.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="monto">Monto</label>
                <input
                  id="monto"
                  v-model="form.monto"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.monto.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.monto.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.monto.required">Monto.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="afp">AFP Trabajador</label>
                <input
                  id="afp"
                  v-model="form.afp"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="afp_monto">Descuento AFP</label>
                <input
                  id="afp_monto"
                  v-model="form.afp_monto"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.afp_monto.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.afp_monto.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.afp_monto.required"
                    >Descuento AFP requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="salud">Salud Trabajador</label>
                <input
                  id="salud"
                  v-model="form.salud"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="salud_monto">Descuento Salud</label>
                <input
                  id="salud_monto"
                  v-model="form.salud_monto"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.salud_monto.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.salud_monto.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.salud_monto.required"
                    >Descuento Salu Requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="carga_familiar">Nro Carga Familiar</label>
                <input
                  id="carga_familiar"
                  v-model="form.carga_familiar"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="monto_carga_familiar"
                  >Monto por carga familiar</label
                >
                <input
                  id="monto_carga_familiar"
                  v-model="form.monto_carga_familiar"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.form.monto_carga_familiar.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.monto_carga_familiar.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.monto_carga_familiar.required"
                    >Monto por carga familiar requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="asignacion_familiar"
                  >Total Asignación Familiar</label
                >
                <input
                  id="asignacion_familiar"
                  v-model="form.asignacion_familiar"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.form.asignacion_familiar.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.asignacion_familiar.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.asignacion_familiar.required"
                    >Total asignación familiar requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="cantidad_horas_extras">Nro Horas Extras</label>
                <input
                  id="cantidad_horas_extras"
                  v-model="form.cantidad_horas_extras"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.form.cantidad_horas_extras.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.cantidad_horas_extras.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.cantidad_horas_extras.required"
                    >Nro horas extras requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="horas_extras_monto">Monto Horas Extras</label>
                <input
                  id="horas_extras_monto"
                  v-model="form.horas_extras_monto"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.form.horas_extras_monto.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.horas_extras_monto.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.horas_extras_monto.required"
                    >Monto horas extras requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="colacion">Colación</label>
                <input
                  id="colacion"
                  v-model="form.colacion"
                  type="number"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="movilidad">Movilidad</label>
                <input
                  id="movilidad"
                  v-model="form.movilidad"
                  type="number"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="sueldo_bruto">Sueldo Bruto</label>
                <input
                  id="sueldo_bruto"
                  v-model="form.sueldo_bruto"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.sueldo_bruto.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.sueldo_bruto.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.sueldo_bruto.required"
                    >Sueldo Bruto requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="sueldo_liquido">Sueldo Liquido</label>
                <input
                  id="sueldo_liquido"
                  v-model="form.sueldo_liquido"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.sueldo_liquido.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.form.sueldo_liquido.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.sueldo_liquido.required"
                    >Sueldo Liquido requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <button
            v-if="btnCreate === true"
            class="btn btn-primary float-end"
            type="submit"
          >
            <i class="far fa-save"></i> Crear
          </button>
          <button v-else class="btn btn-primary float-end" type="submit">
            <i class="fas fa-sync"></i> Actualizar
          </button>
        </form>
      </b-modal>
    </div>
  </Layout>
</template>
