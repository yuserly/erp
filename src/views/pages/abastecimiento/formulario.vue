<script src="./formulario.js"></script>

<template>
  <Layout>
    
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body row">
            <div class="col-10">
                <h6>Emisión de Documento</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Información Empresa</h4> 
                    <div class="row">
                        <div class="mb-3 col-2">
                            <label><small> N° Documento</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.rut">
                        </div> 
                        <div class="mb-3 col-6">
                            <label><small> Proveedor </small></label> 
                            <multiselect
                            v-model="form.proveedor"
                            placeholder="Seleccionar"
                            :options="proveedores"
                            track-by="id_proveedor"
                            label="razon_social">
                            </multiselect>
                        </div> 
                        <div class="mb-3 col-2">
                            <label><small> Fecha documento</small></label> 
                            <input type="date" class="form-control form-control-sm" v-model="info.fechaDoc">
                        </div> 
                        <div class="mb-3 col-2">
                            <label><small> Fecha vencimiento</small></label> 
                            <input type="date" class="form-control form-control-sm" v-model="info.fechaVen">
                        </div> 
                        <div class="mb-3 col-3">
                            <label><small> Celular</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.celular" readonly>
                        </div> 
                        <div class="mb-3 col-5">
                            <label><small> Dirección</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.direccion" readonly>
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
                    </div> 
                </div>
            </div>
      </div>

      <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Información Empresa</h4> 
                    <div class="row">
                        <div class="mb-3 col-4">
                            <label><small> RUT</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.rut" readonly>
                        </div> 
                        <div class="mb-3 col-8">
                            <label><small> Razón Social </small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.razon_social" readonly>
                        </div> 
                        <div class="mb-3 col-3">
                            <label><small> Celular</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.celular" readonly>
                        </div> 
                        <div class="mb-3 col-6">
                            <label><small> Dirección</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.direccion" readonly>
                        </div> 
                        <div class="mb-3 col-3">
                            <label><small> Correo electronico</small></label> 
                            <input type="text" class="form-control form-control-sm" v-model="info.correo" readonly>
                        </div> 
                    </div> 
                </div>
            </div>
      </div>

    </div>

  </Layout>
</template>
