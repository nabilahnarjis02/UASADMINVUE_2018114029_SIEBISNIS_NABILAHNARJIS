<template>
  <div class="home">
    <!-- <Slider /> -->
    <hr class="my-3" />
    <router-link class="btn btn-primary" to="/createhps"
      >Add histori pendidikan</router-link
    >
    <table class="table tble-striped">
      <thead>
        <tr>
          <th scope="col">Kode Admin</th>
          <th scope="col">Nama</th>
          <th scope="col">SMA</th>
          <th scope="col">Strata 1</th>
          <th scope="col">Strata 2</th>
          <th scope="col">Strata 3</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hps, index) in hps" :key="index">
          <td>{{ hps.kode_admin}}</td>
          <td>{{ hps.nama }}</td>
          <td>{{ hps.SMA}}</td>
          <td>{{ hps.S1}}</td>
          <td>{{ hps.S2}}</td>
          <td>{{ hps.S3}}</td>

          <td>
            <router-link
              class="btn btn-success"
              :to="{ name: 'Edithps', params: { id: hps.id } }"
              >Edit</router-link
            >
            <button
              @click.prevent="hpssDelete(hps.id)"
              class="btn btn-danger"
            >
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import { onMounted, ref } from "vue";
export default {
  setup() {
    let hps = ref([]);
    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/hps")
        .then((response) => {
          console.log(response.data.data);
          hps.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    function hpsDelete(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/hps/delete/${id}`)
        .then(() => {
          let z = this.hps
            .map((hps) => hps.id)
            .indexOf(id);
          this.hps.splice(z, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      hps,
      hpsDelete,
    };
  },
};
</script>