<template>
<div>
<h4>Number of leads found: {{numberOfLeads}}</h4>
<Loading :loading="loading"></Loading>
<table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr   v-for="lead in leads" @click="selectLead(lead)">
      <td>{{lead.pk}}</td>
      <td>{{lead.name}}</td>
      <td>{{lead.email}}</td>
      <td>{{lead.status}}</td>
      <td>
        <button class="btn btn-danger" @click="deleteLead(lead)"> X</button>
        <a class="btn btn-primary" v-bind:href="'/lead-update/' + lead.pk"> &#9998; </a>
      
      </td>
    </tr>
  </tbody>
</table>
<div>
<ul class="list-horizontal">
  <li><button class="btn btn-primary" @click="getPreviousPage()">Previous</button></li>
  <li v-for="page in pages">
    <a class="btn btn-primary" @click="getPage(page.link)">{{ page.pageNumber }}</a>
  </li>
  <li><button class="btn btn-primary" @click="getNextPage()">Next</button></li>
</ul>


</div>

<div class="card text-center" v-if="selectedLead">
  <div class="card-header">
    #{{selectedLead.pk}} -- {{selectedLead.name}}
  </div>
  <div class="card-block">
    <h4 class="card-title">{{selectedLead.email}}</h4>
    <p class="card-text">
    {{selectedLead.status}}
    </p>
    <a class="btn btn-primary" v-bind:href="'/lead-update/' + selectedLead.pk"> &#9998; </a>
    <button class="btn btn-danger" @click="deleteLead(selectedLead)"> X</button>

  </div>

</div>
</div>
</template>

<script>
/* eslint-disable */
import {APIService} from '../http/APIService';
import Loading from './Loading';
const API_URL = 'https://my.bbloom.io/api/v1';
const apiService = new APIService();

export default {
  name: 'LeadList',
  components: {
    Loading
  },
  data() {
    return {
      selectedLead:null,
      leads: [],
      numberOfPages:0,
      pages : [],
      numberOfLeads:0,
      loading: false,
      nextPageURL:'',
      previousPageURL:''
    };
  }, 
  methods: {
    getLeads(){

      this.loading = true;    
      apiService.getLeads().then((page) => {
        this.leads = page.data;
        console.log(page);
        console.log(page.nextlink);
        this.numberOfLeads = page.count;
        this.numberOfPages = page.numpages;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        if(this.numberOfPages)
        {
          for(var i = 1 ; i <= this.numberOfPages ; i++)
          {
            const link = `/Leads/?page=${i}`;
            this.pages.push({pageNumber: i , link: link})
          }
        }
        this.loading = false;
      });
    },
    getPage(link){
      this.loading = true;  
      apiService.getLeadsByURL(link).then((page) => {
        this.Leads = page.data;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        this.loading = false;
      });     
    },
    getNextPage(){
      console.log('next' + this.nextPageURL);
      this.loading = true;  
      apiService.getLeadsByURL(this.nextPageURL).then((page) => {
        this.leads = page.data;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        this.loading = false;
      });      
      
    },
    getPreviousPage(){
      this.loading = true;  
      apiService.getLeadsByURL(this.previousPageURL).then((page) => {
        this.Leads = page.data;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        this.loading = false;
      });      
            
    },
    deleteLead(lead){
      console.log("deleting lead: " + JSON.stringify(lead))
      apiService.deleteLead(lead).then((r)=>{
        console.log(r);
        if(r.status === 204)
        {
          /*for(var i = this.leads.length-1; i--;){
            console.log(this.leads[i].pk);
            if (this.leads[i].pk === lead.pk) 
            {
              console.log("deleting lead " + this.leads[i].pk)
              this.leads.splice(i, 1);
            }
          }*/
          alert("lead deleted");
          this.$router.go()
          
        }
      })
    },
    selectLead(lead){
      this.selectedLead = lead;
    }
  },
  mounted() {
   
    this.getLeads();

  },
}
</script>
<style scoped>
.list-horizontal li {
	display:inline-block;
}
.list-horizontal li:before {
	content: '\00a0\2022\00a0\00a0';
	color:#999;
	color:rgba(0,0,0,0.5);
	font-size:11px;
}
.list-horizontal li:first-child:before {
	content: '';
}
</style>
