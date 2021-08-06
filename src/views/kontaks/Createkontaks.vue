<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Add kontak</h5>
      <form class="row g-3" @submit.prevent="store">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Kode Admin</label>
          <input
            type="string"
            class="form-control"
            id="inputEmail4"
            v-model="pengalamans.kode_admin"
          />
          <div class="alert alert-danger" v-if="validation.kode_admin">
            {{ validation.kode_admin[0] }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">No Hp</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="pengalamans.no_hp"
          />
          <div class="alert alert-danger" v-if="validation.no_hp">
            {{ validation.no_hp[0] }}
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
    const pengalamans = reactive({
      kode_admin: "",
      no_hp: "",
      });
    const validation = ref([]);
    const router = useRouter();
    function store() {
      let kode_admin = pengalamans.kode_admin;
      let no_hp = pengalamans.no_hp;
      axios
        .post("http://127.0.0.1:8000/api/pengalamans/create", {
          kode_admin: kode_admin,
          no_hp: no_hp,
        })
        .then(() => {
          console.log("succes nambah pengalaman");
          router.push({
            name: "Kontak",
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
      store,
    };
  },
};
</script>