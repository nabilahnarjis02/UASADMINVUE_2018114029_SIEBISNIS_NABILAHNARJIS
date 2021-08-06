<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Edit kontak</h5>
      <form class="row g-3" @submit.prevent="update">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Kode Admin</label>
          <input
            type="string"
            class="form-control"
            id="inputEmail4"
            v-model="kontak.kode_admin"
          />
          {{ validation.kode_admin[0] }}
          value="{{
            old("kode_admin") ? old("kode_admin") : $kontak["kode_admin"]
          }}"> @error('kode_admin')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">No Hp</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="kontak.no_hp"
          />{{ validation.no_hp[0] }} value="{{
            old("no_hp") ? old("no_hp") : $kontak["no_hp"]
          }}"> @error('no_hp')
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
    const kontaks = reactive({
      kode_admin: "",
      no_hp: "",
    });
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();
    console.log("ini id", route.params.id);
    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/kontaks-only/${route.params.id}`)
        .then((response) => {
          console.log("aishaisiaos", response.data.data);
          kontaks.kode_admin = response.data.data[0].kode_admin;
          kontaks.no_hp = response.data.data[0].no_hp;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function update() {
      let kode_admin = kontaks.kode_admin;
      let no_hp = kontaks.no_hp;
      axios
        .put(`http://127.0.0.1:8000/api/kontaks/update/${kode_admin}`, {
          kode_admin: kode_admin,
          no_hp: no_hp,
        })
        .then(() => {
          // console.log("asasasssasa");
          router.push({
            name: "kontak",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      kontaks,
      validation,
      router,
      update,
      route,
    };
  },
};
</script>

