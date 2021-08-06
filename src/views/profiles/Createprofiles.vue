<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Add Profile</h5>
      <form class="row g-3" @submit.prevent="store">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Nama</label>
          <input
            type="string"
            class="form-control"
            id="inputEmail4"
            v-model="profiles.nama"
          />
          <div class="alert alert-danger" v-if="validation.nama">
            {{ validation.nama[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Tanggal Lahir</label>
          <input
            type="date"
            class="form-control"
            id="inputPassword4"
            v-model="profiles.tgl_lahir"
          />
          <div class="alert alert-danger" v-if="validation.tgl_lahir">
            {{ validation.tgl_lahir[0] }}
          </div>
        </div>
        <div class="col-6">
          <label for="inputAddress" class="form-label">Jenis Kelamin</label>
          <input
            type="radio"
            name="jenis_kelamin"
            value="laki-laki"
          />Laki-laki<input
            type="radio"
            name="jenis_kelamin"
            value="perempuan"
          />Perempuan
          <div class="alert alert-danger" v-if="validation.jenis_kelamin">
            {{ validation.jenis_kelamin[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Email</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="profiles.email"
          />
          <div class="alert alert-danger" v-if="validation.email">
            {{ validation.email[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Alamat</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="profiles.alamat"
          />
          <div class="alert alert-danger" v-if="validation.alamat">
            {{ validation.alamat[0] }}
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
    const profiles = reactive({
      nama: "",
      tgl_lahir: "",
      jenis_kelamin: "",
      email: "",
      alamat: "",
    });
    const validation = ref([]);
    const router = useRouter();
    function store() {
      let nama = profiles.nama;
      let tgl_lahir = profiles.tgl_lahir;
      let jenis_kelamin = profiles.jenis_kelamin;
      let email = profiles.email;
      let alamat = profiles.alamat;
      axios
        .post("http://127.0.0.1:8000/api/profiles/create", {
          nama: nama,
          tgl_lahir: tgl_lahir,
          jenis_kelamin: jenis_kelamin,
          email: email,
          alamat: alamat,
        })
        .then(() => {
          console.log("succes nambah profile");
          router.push({
            name: "Home",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      profiles,
      validation,
      router,
      store,
    };
  },
};
</script>