<template>
  <div class="home">
    <div class="container">
      <Slider />
      <hr class="my-3" />
      <router-link class="btn btn-primary" to="/createprofiles"
        >Add profile</router-link
      >
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Tanggal Lahir</th>
            <th scope="col">Jenis Kelamin</th>
            <th scope="col">Email</th>
            <th scope="col">Alamat</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(profiles, index) in profiles" :key="index">
            <td>{{ profiles.nama }}</td>
            <td>{{ profiles.tgl_lahir }}</td>
            <td>{{ profiles.jenis_kelamin }}</td>
            <td>{{ profiles.email }}</td>
            <td>{{ profiles.alamat }}</td>
            <td>
              <router-link
                class="btn btn-success"
                :to="{ name: 'Editprofile', params: { id: profiles.id } }"
                >Edit</router-link
              >
              <button
                @click.prevent="profilesDelete(profiles.id)"
                class="btn btn-danger"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Slider from "../../components/Slider.vue";
import { onMounted, ref } from "vue";
export default {
  name: "Home",
  components: {
    Slider,
  },
  setup() {
    let profiles = ref([]);
    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/profiles")
        .then((response) => {
          console.log(response.data.data);
          profiles.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    function profilesDelete(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/profiles/delete/${id}`)
        .then(() => {
          let z = this.profiles.map((profiles) => profiles.id).indexOf(id);
          this.profiles.splice(z, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      profiles,
      profilesDelete,
    };
  },
};
</script>