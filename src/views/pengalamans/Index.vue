<template>
  <div class="home">
    <!-- <Slider /> -->
    <hr class="my-3" />
    <router-link class="btn btn-primary" to="/createpengalamans"
      >Add pengalaman bekerja/usaha</router-link
    >
    <table class="table tble-striped">
      <thead>
        <tr>
          <th scope="col">Kode Admin</th>
          <th scope="col">Nama Perusahaan</th>
          <th scope="col">Tahun Bekerja</th>
          <th scope="col">Posisi</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pengalamans, index) in pengalamans" :key="index">
          <td>{{ pengalamans.kode_admin}}</td>
          <td>{{ pengalamans.nama_perusahaan }}</td>
          <td>{{ pengalamans.tahun_bekerja}}</td>
          <td>{{ pengalamans.posisi}}</td>

          <td>
            <router-link
              class="btn btn-success"
              :to="{ name: 'Editpengalamans', params: { id: pengalamans.id } }"
              >Edit</router-link
            >
            <button
              @click.prevent="pengalamanssDelete(pengalamans.id)"
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
    let pengalamans = ref([]);
    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/pengalamans")
        .then((response) => {
          console.log(response.data.data);
          pengalamans.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    function pengalamansDelete(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/pengalamans/delete/${id}`)
        .then(() => {
          let z = this.pengalamans
            .map((pengalamans) => pengalamans.id)
            .indexOf(id);
          this.pengalamans.splice(z, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      pengalamans,
      pengalamansDelete,
    };
  },
};
</script>