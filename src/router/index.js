
/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import LeadList from '@/components/LeadList'
import LeadCreate from '@/components/LeadCreate'
import Callback from '@/components/Callback'
import Home from '@/components/Home'
import AuthService from '../auth/AuthService'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lead-list',
    name: 'LeadList',
    component: LeadList,
    meta: { requiresAuth : true }
  },
  {
    path: '/lead-create',
    name: 'LeadCreate',
    component: LeadCreate,
    meta: { requiresAuth : true }    
  },
  {
    path: '/lead-update/:pk',
    name: 'LeadUpdate',
    component: LeadCreate
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  }]

const router = new Router({
  mode: 'history',
  routes
})

//const auth = new AuthService()

router.beforeEach((to, from, next) => {
  console.log('routing ', from, AuthService.authenticated())
  if(to.meta.requiresAuth)
  {
    if(!AuthService.authenticated())
    {
      next('/');
    }
  }
  next()
})

export function authGuard(to, from, next) {

  if(!AuthService.authenticated()){
    next('/');
  }
  next()

}

export default router
