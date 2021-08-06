<template>
  <div class="home">
    <!-- <Slider /> -->
    <hr class="my-3" />
    <router-link class="btn btn-primary" to="/createkontaks"
      >Add kontak</router-link
    >
    <table class="table tble-striped">
      <thead>
        <tr>
          <th scope="col">Kode Admin</th>
          <th scope="col">No Hp</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(kontaks, index) in kontaks" :key="index">
          <td>{{ kontaks.kode_admin}}</td>
          <td>{{ kontaks.no_hp }}</td>

          <td>
            <router-link
              class="btn btn-success"
              :to="{ name: 'Editkontaks', params: { id: kontaks.id } }"
              >Edit</router-link
            >
            <button
              @click.prevent="kontakssDelete(kontaks.id)"
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
    let kontaks = ref([]);
    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/kontaks")
        .then((response) => {
          console.log(response.data.data);
          kontaks.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    function kontaksDelete(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/kontaks/delete/${id}`)
        .then(() => {
          let z = this.kontaks
            .map((kontaks) => kontaks.id)
            .indexOf(id);
          this.kontaks.splice(z, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      kontaks,
      kontaksDelete,
    };
  },
};
</script>