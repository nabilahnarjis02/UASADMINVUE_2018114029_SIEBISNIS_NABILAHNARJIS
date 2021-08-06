<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Edit histori pendidikan</h5>
      <form class="row g-3" @submit.prevent="update">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Kode Admin</label>
          <input
            type="string"
            class="form-control"
            id="inputEmail4"
            v-model="hp.kode_admin"
          />
          {{ validation.kode_admin[0] }}
          value="{{
            old("kode_admin") ? old("kode_admin") : $hp["kode_admin"]
          }}"> @error('kode_admin')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Nama</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hp.nama"
          />{{ validation.nama[0] }} value="{{
            old("nama") ? old("nama") : $hp["nama"]
          }}"> @error('nama')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">SMA</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hp.SMA"
          />
          {{ validation.SMA[0] }} value="{{
            old("SMA") ? old("SMA") : $hp["SMA"]
          }}"> @error('SMA')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Strata 1</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hp.S1"
          />
          {{ validation.S1[0] }} value="{{
            old("S1") ? old("S1") : $hp["S1"]
          }}"> @error('S1')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Strata 2</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hp.S2"
          />{{ validation.S2[0] }} value="{{
            old("S2") ? old("S2") : $hp["S2"]
          }}"> @error('S2')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Strata 3</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="hp.S3"
          />{{ validation.S3[0] }} value="{{
            old("S3") ? old("S3") : $hp["S3"]
          }}"> @error('S3')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  setup() {
    const hps = reactive({
      kode_admin: "",
      nama: "",
      SMA: "",
      S1: "",
      S2: "",
      S3: "",
    });
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();
    console.log("ini id", route.params.id);
    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/hps-only/${route.params.id}`)
        .then((response) => {
          console.log("aishaisiaos", response.data.data);
          hps.kode_admin = response.data.data[0].kode_admin;
          hps.nama = response.data.data[0].nama;
          hps.SMA = response.data.data[0].SMA;
          hps.S1 = response.data.data[0].S1;
          hps.S2 = response.data.data[0].S2;
          hps.S3 = response.data.data[0].S3;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function update() {
      let kode_admin = hps.kode_admin;
      let nama = hps.nama;
      let SMA = hps.SMA;
      let S1 = hps.S1;
      let S2 = hps.S2;
      let S3 = hps.S3;
      axios
        .put(`http://127.0.0.1:8000/api/hps/update/${kode_admin}`, {
          kode_admin: kode_admin,
          nama: nama,
          SMA: SMA,
          S1: S1,
          S2: S2,
          S3: S3,
        })
        .then(() => {
          // console.log("asasasssasa");
          router.push({
            name: "Hp",
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
      update,
      route,
    };
  },
};
</script>

