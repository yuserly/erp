<script src="./formulario.js"></script>

<template>
  <Layout>
    
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body row">
            <div class="col-10">
                <h6>Emisión de Documento: {{documentoName}}</h6>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <router-link to="../abastecimiento_emitir">
                <button type="button" class="btn btn-outline-secondary"><i class="uil uil-corner-down-left"></i> Volver</button>
                </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Información Empresa</h4> 
                    <form @submit.prevent="formSubmit">
                        <div class="row">
                            <div class="mb-3 col-2">
                                <label><small> N° Documento</small></label> 
                                <input type="text" class="form-control form-control-sm" v-model="form.n_documento">
                            </div> 
                            <div class="mb-3 col-6">
                                <label><small> Proveedor </small></label> 
                                <multiselect
                                @input="onChangeProveedor"
                                v-model="form.proveedor"
                                placeholder="Seleccionar"
                                :options="proveedores"
                                track-by="id_proveedor"
                                label="razon_social">
                                </multiselect>
                            </div> 
                            <div class="mb-3 col-2">
                                <label><small> Fecha documento</small></label> 
                                <input type="date" class="form-control form-control-sm" v-model="form.fechadoc">
                            </div> 
                            <div class="mb-3 col-2">
                                <label><small> Fecha vencimiento</small></label> 
                                <input type="date" class="form-control form-control-sm" v-model="form.fechaven" v-if="inputFechaVencimiento">
                                <input type="date" class="form-control form-control-sm" v-model="form.fechaven" v-else disabled>
                            </div> 
                            <div class="mb-3 col-5">
                                <label><small> Dirección</small></label> 
                                <input type="text" class="form-control form-control-sm" v-model="form.direccion" readonly>
                            </div> 
                            <div class="mb-3 col-4">
                                <label><small> Unidad de Negocio</small></label> 
                                <multiselect
                                v-model="form.unidad"
                                placeholder="Seleccionar"
                                :options="unidades"
                                track-by="id_unidadnegocio"
                                label="nombre">
                                </multiselect>
                            </div>
                            <div class="mb-3 col-12">
                                <label><small> Glosa</small></label> 
                                <input class="form-control form-control-sm" v-model="form.glosa" />
                            </div> 
                            <div class="mb-3 col-12 d-flex justify-content-end">
                                <button type="submit" class="btn btn-success btn-sm"><i class="uil uil-save"></i> Guardar</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
      </div>

    </div>

  </Layout>
</template>
