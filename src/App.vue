<template>
  <v-app>
    <alert />

    <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="scale-transition">
      <search @closed="closeDialog" />
    </v-dialog> -->
    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <component :is="currentComponent" @closed="setDialogStatus"></component>
      </v-dialog>
    </keep-alive>

    <v-app-bar
      app
      color="primary"
      dark
      v-if="isHome"
    >
    
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title to="/">{{ appName }}</v-toolbar-title>

      <!-- pemisah konten -->
      <v-spacer></v-spacer>

      <v-btn icon @click="setDialogComponent('cart')">
        <v-badge color="orange overlap">
          <template v-slot:badge v-if="countCart>0">
            <span>{{ countCart }}</span>
          </template>
        </v-badge>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-text-field 
      slot="extension"
      hide-details
      append-icon="mdi-microphone"
      solo-inverted flat
      label="Search"
      prepend-inner-icon="mdi-magnify"
      @click="setDialogComponent('search')">
      </v-text-field>
    
    </v-app-bar>

    <v-app-bar
      app
      color="primary"
      dark
      v-else
    >
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>

      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="setDialogComponent('cart')">
        <v-badge color="orange" overlap>
          <template v-slot:badge v-if="countCart>0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- <v-main>
      <router-view/>
    </v-main> -->
    <v-card>
      <v-navigation-drawer app v-model="drawer">
        <v-list>
          <v-list-item v-if="!guest">
            <v-list-item-avatar>
              <v-img src="getImage('/users/'+user.avatar)" />
            </v-list-item-avatar>
            
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

            <div class="pa-2" v-if="guest">
              <v-btn block color="primary" class="mb-1"
              @click="setDialogComponent('login')">
                <v-icon left>mdi-lock</v-icon>
                Login
              </v-btn>
              <v-btn block color="success" @click="setDialogComponent('register')">
                <v-icon left>mdi-account</v-icon>
                Register
              </v-btn>              
            </div>
          <v-divider></v-divider>

          <v-list-item
          v-for="(item, index) in menus"
          :key = "`menu-` +index"
          :to = "item.route">
            <v-list-item-icon>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <template v-slot:append v-if="!guest">
        <div class="pa-2">
            <v-btn block color="red" dark @click="logout">
              <v-icon left>mdi-lock</v-icon>
              Logout
            </v-btn>
          </div>  
        </template>

      </v-navigation-drawer>      
    </v-card>


    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <!-- jika menggunakan vue-router -->
          <router-view></router-view>
        </v-slide-y-transition>

      </v-container>
    </v-main>

          


    <!-- <v-footer app>
      FOOTER
    </v-footer> -->
    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} - <strong>Vueshop</strong>
        </v-card-text>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'App',
    components: {
      Alert: () => import( /* webpackChunkName: "alert" */
      '@/components/Alert.vue'),
      Search: () => import(/* webpackChunkName: "search" */
      '@/components/Search.vue'),
      Login: () => import( /* webpackChunkName: "login" */
      '@/components/Login.vue'),
      Register: () => import(/* webpackChunkName: "register" */
      '@/components/Register.vue')
    },  
    data: () => ({
      // dialog: false,
      drawer: false,
      menus: [
        { title: 'Home', icon: 'mdi-home', route: '/'},
        { title: 'About', icon: 'mdi-account', route: '/about'},
      ],
      // guest: false

  }),
  methods: {
    ...mapActions({
      setDialogStatus : 'dialog/setStatus',
      setDialogComponent : 'dialog/setComponent',
      setAuth : 'auth/set',
      setAlert : 'alert/set',
    }),
    logout() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.user.api_token,
        },
      }
      this.axios.post('/logout', {}, config)
        .then((response) => {
          this.setAuth({}) // kosongkan auth ketika logout
          this.setAlert({
            status : true,
            color : 'success',
            text : 'Logout successfully',
          })
        })
        .catch((error) => {
          let {data} = error.response
          this.setAlert({
            status : true,
            color : 'error',
            text : data.message,
          })
        })
    }
    // closeDialog (value) {
    //   this.dialog = value
    // }
  },
      computed: {
        isHome() {
          return (this.$route.path==='/')
        },
        ...mapGetters({
          countCart : 'cart/count',
          guest : 'auth/guest',
          user : 'auth/user',
          dialogStatus : 'dialog/status',
          currentComponent: 'dialog/component',
        }),
        dialog: {
          get () {
            return this.dialogStatus
          },
          set (value) {
            this.setDialogStatus(value)
          }
        }
      },
  };

</script>
