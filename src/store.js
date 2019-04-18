import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    patients: [],
    currentPatient: null,
    currentComments: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPatients(state, patients) {
      state.patients = patients;
    },
    setCurrentPatient(state, currentPatient) {
      state.currentPatient = currentPatient;
    },
    setCurrentComments(state, currentComments) {
      state.currentComments = currentComments;
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post('/api/users', data);
        context.commit('setUser', response.data);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post('/api/users/login', data);
        context.commit('setUser', response.data);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete('/api/users');
        context.commit('setUser', null);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get('/api/users');
        context.commit('setUser', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async uploadPatient(context, data) {
      try {
        await axios.post('/api/patients', data);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getPatient(context, patientId) {
      try {
        let response = await axios.get(`/api/patients/${patientId}`);
        context.commit('setCurrentPatient', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async getMyPatients(context) {
      try {
        let response = await axios.get('/api/patients');
        context.commit('setPatients', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async getAllPatients(context) {
      try {
        let response = await axios.get('/api/patients/all');
        context.commit('setPatients', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async getComments(context, patientId) {
      try {
        let response = await axios.get(`/api/comments/${patientId}`);
        context.commit('setCurrentComments', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async createComment(context, dispatchObject) {
      const { formData, patientId } = dispatchObject;

      try {
        await axios.post(`/api/comments/${patientId}`, formData);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
  },
});
