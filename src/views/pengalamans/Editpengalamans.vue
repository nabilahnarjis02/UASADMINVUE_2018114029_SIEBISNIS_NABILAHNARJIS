<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Edit pengalaman bekerja/usaha</h5>
      <form class="row g-3" @submit.prevent="update">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Kode Admin</label>
          <input
            type="string"
            class="form-control"
            id="inputEmail4"
            v-model="pengalaman.kode_admin"
          />
          {{ validation.kode_admin[0] }}
          value="{{
            old("kode_admin") ? old("kode_admin") : $pengalaman["kode_admin"]
          }}"> @error('kode_admin')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Nama Perusahaan</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="pengalaman.nama_perusahaan"
          />{{ validation.nama_perusahaan[0] }} value="{{
            old("nama_perusahaan") ? old("nama_perusahaan") : $pengalaman["nama_perusahaan"]
          }}"> @error('nama_perusahaan')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Tahun Bekerja</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="pengalaman.tahun_bekerja"
          />
          {{ validation.tahun_bekerja[0] }} value="{{
            old("tahun_bekerja") ? old("tahun_bekerja") : $pengalaman["tahun_bekerja"]
          }}"> @error('tahun_bekerja')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Posisi</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="pengalaman.posisi"
          />
          {{ validation.posisi[0] }} value="{{
            old("posisi") ? old("posisi") : $pengalaman["posisi"]
          }}"> @error('posisi')
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
    const pengalamans = reactive({
      kode_admin: "",
      nama_perusahaan: "",
      tahun_bekerja: "",
      posisi: "",
    });
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();
    console.log("ini id", route.params.id);
    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/pengalamans-only/${route.params.id}`)
        .then((response) => {
          console.log("aishaisiaos", response.data.data);
          pengalamans.kode_admin = response.data.data[0].kode_admin;
          pengalamans.nama_perusahaan = response.data.data[0].nama_perusahaan;
          pengalamans.tahun_bekerja = response.data.data[0].tahun_bekerja;
          pengalamans.posisi = response.data.data[0].posisi;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function update() {
      let kode_admin = pengalamans.kode_admin;
      let nama_perusahaan = pengalamans.nama_perusahaan;
      let tahun_bekerja = pengalamans.tahun_bekerja;
      let posisi = pengalamans.posisi;
      axios
        .put(`http://127.0.0.1:8000/api/pengalamans/update/${kode_admin}`, {
          kode_admin: kode_admin,
          nama_perusahaan: nama_perusahaan,
          tahun_bekerja: tahun_bekerja,
          posisi:posisi,
        })
        .then(() => {
          // console.log("asasasssasa");
          router.push({
            name: "pengalaman",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      pengalamans,
      validation,
      router,
      update,
      route,
    };
  },
};
</script>

