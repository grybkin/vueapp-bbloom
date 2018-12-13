<template>

        <div id="container" class="container">
      
            <div class="row">
            
                <div class="col-sm-8 offset-sm-2">
                <div class="alert alert-warning" v-show="showCreateMessage"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Lead successfully created!</strong>
                </div>
                <div class="alert alert-warning" v-show="showUpdateMessage"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Lead successfully updated!</strong>
                </div>
                
                <div class="alert alert-warning" v-show="showError"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Error!</strong>
                </div>                
                    <h1>Create a Lead</h1>
                    <div class="info-form">
                      <form>
                        <div class="form-group">
                          <label for="name">Lead Name</label>
                          <input v-model="lead.name" type="text" class="form-control" id="name" aria-describedby="leadHelp" placeholder="Enter name">
                          <small id="leadHelp" class="form-text text-muted">Enter your lead's name</small>

                          <label for="email">Lead Email</label>
                          <input v-model="lead.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                          <small id="emailHelp" class="form-text text-muted">Enter your lead's email</small>

                          <label for="status">Status</label>
                          <input v-model="lead.status" class="form-control" id="status" aria-describedby="statusHelp" placeholder="Enter status">
                          <small id="statusHelp" class="form-text text-muted">Enter your lead's status</small>


                        </div>
                      </form>
                       <button class="btn btn-primary" v-if="!this.lead.pk" @click="createLead()" ><span v-if="!creating">Create</span><span v-if="creating">Creating... Please wait </span></button>
                       <button class="btn btn-primary" v-if="this.lead.pk" @click="updateLead()" ><span v-if="!updating">Update</span><span v-if="updating">Updating... Please wait </span></button>
                       <button class="btn btn-primary"  @click="newLead()" >New..</button>

                    </div>
                </div>
            </div>
        </div>

</template>

</template>

<script>
/* eslint-disable */
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



import {APIService} from '../http/APIService';


const apiService = new APIService();

export default {
  name: 'LeadCreate',
  components: {
  },
  data() {
    return {
      showCreateMessage: false,
      showUpdateMessage: false,
      showError: false,
      lead: {},
      leads: '',
      creating: false,
      updating: false
    };
  }, 
  methods: {
    hideMessage(){
      this.showCreateMessage = false;
      this.showUpdateMessage = false;
      this.showError = false;
    },
    createLead(){
      console.log('create lead' + JSON.stringify(this.lead));
      this.creating = true;
      apiService.createLead(this.lead).then((result)=>{
          console.log(result);
          // success 
          if(result.status === 201){
            this.lead = result.data;
            this.showCreateMessage = true;
            
            
          }
            sleep(1000).then(() => {
               this.creating = false;
            })          
      },(error)=>{
        this.showError = true;
            sleep(1000).then(() => {
               this.creating = false;
            })
      });
    },
    updateLead(){
      this.updating = true;
      console.log('update lead' + JSON.stringify(this.lead));
      apiService.updateLead(this.lead).then((result)=>{
          console.log(result);
          // success 
          if(result.status === 200){
            //this.lead = {};
            this.showUpdateMessage = true;
            sleep(1000).then(() => {
               this.updating = false;
            })
            
          }
          
      },(error)=>{
        this.showError = true;
        sleep(1000).then(() => {
               this.updating = false;
        })        
      });
    },
    newLead(){
      this.lead = {};
    }
    
  },
  mounted() {
    
    if(this.$route.params.pk){
      console.log(this.$route.params.pk)
      apiService.getLead(this.$route.params.pk).then((lead)=>{
        this.lead = lead;
      })
    }
  },
}
</script>
<style scoped>
.aform{
  margin-left:  auto;
  width: 60%;
}
</style>
