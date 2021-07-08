<template>
  <!-- <hello-world /> -->
  <div>
    <!-- template categories -->
    <v-container class="ma-0 pa-0" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/categories" class="blue--text">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="(category, index) in categories" :key="`category-
        `+category.id" xs6>
          <v-card :to="'/category/'+ category.slug">
            <v-img
              :src="getImage('/categories/'+category.image)"
              class="white--text">

              {{ index+1 }}
              <v-card-title
              class="fill-height align-end"
              v-text="category.name">
              </v-card-title>
              

            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
            <div class="text-right">
              <v-btn small text to="/books" class="blue--text">
                All Books <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <v-layout wrap>
              <v-flex v-for="(book) in books" :key="`book-`+book.id" xs6>

                <!-- <v-card :to="'/book/'+ book.slug">
                  <v-img
                    :src="getImage('/books/'+book.cover)"
                    class="white--text">
                    <v-card-title
                      class="fill-height align-end"
                      v-text="book.title">
                    </v-card-title>
                  </v-img>
                </v-card> -->
                <book-item :book="book" />
              </v-flex>
            </v-layout>
          </v-container>

    <!-- template books -->

  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    // name: 'Home',

    // components: {
    //   HelloWorld,
    // },
    components: {
      BookItem: () => import(/* webpackChunkName: "book-item" */'@/components/BookItem.vue')
    },
    data: () => ({
      categories: [],

      books: [
        
      ]
    }),

created() {
  console.log('get data categories')
  // this.axios.get('http://localhost/larashop-api/public/api/v1/categories/random/2')
  this.axios.get('/categories/random/2')
    // this.axios.get('/')
    .then((response) => {
      let {data} = response.data
      // console.log(data)
      this.categories = data
    })
    .catch((error) => {
      let {response} = error
      console.log(response)
    })

    this.axios.get('/books/top/4')
      .then((response) => {
        let {data} = response.data
        this.books = data
      })
      .catch((error) => {
        let { response } = error
        console.log(response)
      })
},

// tidak perlu karena sudah ada method global di helper
// methods: {
//   getImage(image) {
//     if (image!=null && image.length>0) {
//       // return "http://localhost/larashop-api/public/images"+ image
//       return process.env.VUE_APP_BACKEND_URL +"/images"+ image
//     }
//     // default image jika tidak ditemukan,
//     // letakkan image ini pada folder /public/img di project vue
//     return "unavalilable.png"
//   },
// }, 

mounted() {
  console.log(process.env)
}
  };
</script>

