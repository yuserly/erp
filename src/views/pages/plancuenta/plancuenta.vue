<script src="./plancuenta.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body row">
            <div class="col-6">
                <h4 class="card-title">Plan de Cuenta</h4>
            </div>
            <div class="col-6">
                <label for="">Seleccione empresa</label>
                <multiselect
                  v-model="plancuentaSelect"
                  placeholder="Seleccionar"
                  track-by="id_empresa"
                  label="razon_social"
                  :options="options"
                  @input="traerbusqueda()"
                ></multiselect>
              </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card ">
          <div class="card-header ">
            Plan de Cuenta
          </div>
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
                      v-model="filterN"
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
                :items="plancuentaData"
                :fields="fieldsN"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPageN"
                :sort-by.sync="sortByN"
                :sort-desc.sync="sortDescN"
                :filter="filterN"
                :filter-included-fields="filterOnN"
                @filtered="onFiltered"
              >
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="verInformacion(data.item)"
                        class="px-2 text-info"
                        v-b-modal.informacionManual
                        data-toggle="modal"
                        data-target=".bs-example-informacionManual"
                        v-b-tooltip.hover
                        title="Ver"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="deleteCuenta(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-minus-circle font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card ">
          <div class="card-header">
            Manual de Cuenta
          </div>
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
                        v-on:click="verInformacion(data.item)"
                        class="px-2 text-info"
                        v-b-modal.informacionManual
                        data-toggle="modal"
                        data-target=".bs-example-informacionManual"
                        v-b-tooltip.hover
                        title="Ver"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="addPlanCuenta(data.item)"
                        class="px-2 text-success"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-plus-circle font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
        </div>

        <b-modal
            id="informacionManual"
            centered
            size="lg"
            :title="titlemodal"
            title-class="font-15"
            hide-footer
            v-if="modalInfo"
        >    
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo">CÓDIGO</label>
                        <p><i>{{info.codigo}}</i></p>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="nombre">NOMBRE</label>
                        <p><i>{{info.nombre}}</i></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="codigo">DESCRIPCIÓN</label>
                        <p><i>{{info.descripcion}}</i></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label>CLASIFICACIÓN</label>
                        <p><i>{{info.clasificacion}}</i></p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label>SUBCLASIFICACIÓN</label>
                        <p><i>{{info.subclasificacion}}</i></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="codigo">CARGOS</label>
                        <p><i>{{info.cargos}}</i></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="codigo">ABONOS</label>
                        <p><i>{{info.abonos}}</i></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="codigo">SALDO DEUDOR</label>
                        <p><i>{{info.saldoDeudor}}</i></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="codigo">SALDO ACREEDOR</label>
                        <p><i>{{info.saldoAcreedor}}</i></p>
                    </div>
                </div>
            </div>
        </b-modal>
      </div>
    </div>
  </Layout>
</template>
