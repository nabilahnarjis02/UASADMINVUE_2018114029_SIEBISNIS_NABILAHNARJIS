<template>
  <div class="card shadow mt-3">
    <div class="card-body">
      <h5 class="card-title" style="color: blue">Edit profile</h5>
      <form class="row g-3" @submit.prevent="update">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail4"
            v-model="profile.nama"
          />
          {{ validation.nama[0] }}
          value="{{ old("nama") ? old("nama") : $profile["nama"] }}">
          @error('nama')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Tanggal Lahir</label>
          <input
            type="date"
            class="form-control"
            id="inputPassword4"
            v-model="profile.tgl_lahir"
          />{{ validation.tgl_lahir[0] }} value="{{
            old("tgl_lahir") ? old("tgl_lahir") : $profile["tgl_lahir"]
          }}"> @error('tgl_lahir')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
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
          />Perempuan v-model="profile.jenis_kelamin" />{{
            validation.jenis_kelamin[0]
          }}
          value="{{
            old("jenis_kelamin")
              ? old("jenis_kelamin")
              : $profile["jenis_kelamin"]
          }}"> @error('jenis_kelamin')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Email</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="profile.email"
          />
          {{ validation.email[0] }} value="{{
            old("email") ? old("email") : $profile["email"]
          }}"> @error('email')
          <div class="alert alert-danger">{{ $message }}</div>
          @enderror
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Alamat</label>
          <input
            type="string"
            class="form-control"
            id="inputPassword4"
            v-model="profile.alamat"
          />{{ validation.alamat[0] }} value="{{
            old("alamat") ? old("alamat") : $profile["alamat"]
          }}"> @error('alamat')
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
    const profiles = reactive({
      id: "",
      nama_profile: "",
      alamat: "",
      no_tlp: "",
      email: "",
    });
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();
    console.log("ini id", route.params.id);
    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/profile-only/${route.params.id}`)
        .then((response) => {
          console.log("aishaisiaos", response.data.data);
          profiles.id = response.data.data[0].id;
          profiles.nama_profile = response.data.data[0].nama_profile;
          profiles.alamat = response.data.data[0].alamat;
          profiles.no_tlp = response.data.data[0].no_tlp;
          profiles.email = response.data.data[0].email;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function update() {
      let id = profiles.id;
      let nama_profile = profiles.nama_profile;
      let alamat = profiles.alamat;
      let no_tlp = profiles.no_tlp;
      let email = profiles.email;
      axios
        .put(`http://127.0.0.1:8000/api/profiles/update/${id}`, {
          id: id,
          nama_profile: nama_profile,
          alamat: alamat,
          no_tlp: no_tlp,
          email: email,
        })
        .then(() => {
          // console.log("asasasssasa");
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
      update,
      route,
    };
  },
};
</script>

