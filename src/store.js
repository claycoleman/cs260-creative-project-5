import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    patients: [],
    currentPatient: null,
    currentHealthNotes: [],
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
    setCurrentHealthNotes(state, currentHealthNotes) {
      state.currentHealthNotes = currentHealthNotes;
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
    async updatePatient(context, { formData, patientId }) {
      try {
        await axios.put(`/api/patients/${patientId}`, formData);
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
    async deletePatient(context, patientId) {
      try {
        await axios.delete(`/api/patients/${patientId}`);
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
    async getHealthNotes(context, patientId) {
      try {
        let response = await axios.get(`/api/healthnotes/${patientId}`);
        context.commit('setCurrentHealthNotes', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async createHealthNote(context, dispatchObject) {
      const { formData, patientId } = dispatchObject;

      try {
        await axios.post(`/api/healthnotes/${patientId}`, formData);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
  },
});
