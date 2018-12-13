<template>
    <main role="main">
        <div v-if="authenticated" class="card col-sm-10 offset-sm-4" style="width: 20rem;"> 
    <img class="card-img-top" v-bind:src="profile.picture" alt="profile image">
    <div class="card-block">
      <h4 class="card-title">{{profile.nickname}}</h4>
        Welcome! You are signed in with: {{profile.name}}
    </div>
    </div>
      <div v-if="!authenticated" class="jumbotron">
        <h1>Demo</h1>
        <button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="auth.login()">
              Log In
          </button>
      </div>

    <h4 v-if="!authenticated">
      You are not logged in! Please log in to continue.
    </h4>
    <h4 >

    </h4>


    </main>

</template>

<script>
/* eslint-disable */
  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    data(){

        return {
          access_token: localStorage.getItem('access_token'),
          id_token: localStorage.getItem('id_token'),
          profile: {}
        }
    },
    methods:{
      getUserProfile(){
        this.auth.getUserProfile((err, profile)=> {
          if(err) return null;
          console.log(profile);
          this.profile = profile;
        });
      }
    },

  mounted(){
    this.getUserProfile();
  }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>