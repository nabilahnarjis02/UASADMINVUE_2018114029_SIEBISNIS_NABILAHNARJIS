<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Add Histori Pendidikan</h5>
      <form class="row g-3" @submit.prevent="store">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Kode Admin</label>
          <input
            type="string"
            class="form-control"
            id="inputEmail4"
            v-model="hps.kode_admin"
          />
          <div class="alert alert-danger" v-if="validation.kode_admin">
            {{ validation.kode_admin[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Nama</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hps.nama"
          />
          <div class="alert alert-danger" v-if="validation.nama">
            {{ validation.nama[0] }}
          </div>
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Email</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hps.SMA"
          />
          <div class="alert alert-danger" v-if="validation.SMA">
            {{ validation.SMA[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Strata 1</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hps.S1"
          />
          <div class="alert alert-danger" v-if="validation.S1">
            {{ validation.S1[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Strata 2</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hps.S2"
          />
          <div class="alert alert-danger" v-if="validation.S2">
            {{ validation.S2[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Strata 3</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hps.S3"
          />
          <div class="alert alert-danger" v-if="validation.S3">
            {{ validation.S3[0] }}
          </div>
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const hps = reactive({
      kode_admin: "",
      nama: "",
      jenis_kelamin: "",
      email: "",
      alamat: "",
    });
    const validation = ref([]);
    const router = useRouter();
    function store() {
      let kode_admin = hps.kode_admin;
      let nama = hps.nama;
      let jenis_kelamin = hps.jenis_kelamin;
      let email = hps.email;
      let alamat = hps.alamat;
      axios
        .post("http://127.0.0.1:8000/api/hps/create", {
          kode_admin: kode_admin,
          nama: nama,
          jenis_kelamin: jenis_kelamin,
          email: email,
          alamat: alamat,
        })
        .then(() => {
          console.log("succes nambah hp");
          router.push({
            name: "Hps",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      hps,
      validation,
      router,
      store,
    };
  },
};
</script>