var app = new Vue({
  el: "#app",
  data: {
    quantity: 10,
    gender: "",
    users: [],
    username: "",
    user:undefined,
    password: "",
  },
  methods: {
    async login() {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        const users = data.results;
  
        const user = this.users.filter(user => user.login.username === this.username && user.login.password === this.password);
        localStorage.setItem('usuario', JSON.stringify(user))
        if (!user.length) {
        swal("Error", "Usuario o contraseña incorrectas", "error");
          return;
        }
        Swal.fire({
          icon: 'success',
          title: 'Entrando',
          showConfirmButton: false,
        });

        setTimeout(()=> {
          if(this.login){
            location.href="user.html";
          }
        },1600);

    },



    async getUsers() {
      const response = await fetch(
        `https://randomuser.me/api/?results=${this.quantity}`
      );
      const data = await response.json();
      let usuarios = data.results;
      console.log(usuarios)
      if (this.gender) {
        this.users = usuarios.filter((user) => user.gender === this.gender);
      }
      this.users = usuarios;
      localStorage.setItem('users', JSON.stringify(this.users));
    },
  },

  created() {
      this.getUsers();

  },
  

});
