var app = new Vue({
  el: "#app",
  data: {
    gender: "",
    quantity: undefined,
    users: JSON.parse(localStorage.getItem("users")),
    user: JSON.parse(localStorage.getItem("usuario")),
  },

  methods: {
    logout() {
      this.username = "";
      this.password = "";
      setTimeout(() => {
        location.href = "index.html";
      }, 100);
    },

    getUsers() {
      this.users = JSON.parse(localStorage.getItem("users"));
      if (this.gender !== "") {
        this.users = this.users.filter((user) => user.gender === this.gender);
      }
      if (this.quantity > 0) {
        this.users.splice(this.user, 1);
        this.users.splice(this.quantity, this.users.length - this.quantity);
      }
      this.users.splice(this.user, 1);
    },

    getFlagUrl(countryCode) {
      const response = `https://countryflagsapi.com/png/${countryCode}`;
      return response;
    },
    removeUser(user) {
      Swal.fire({
        title: "¿Seguro que quieres eliminar?",
        text: "Eliminarás a este usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          let copy = [];
          this.users = JSON.parse(localStorage.getItem("users"));
          this.users.map((item) => {
            if (item.login.username !== user.login.username) {
              copy.push(item);
            }
          });
          localStorage.setItem("users", JSON.stringify(copy));

          Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");

          this.getUsers();
        }
      });
    },
  },

  created() {
    this.getUsers();
  },
});
