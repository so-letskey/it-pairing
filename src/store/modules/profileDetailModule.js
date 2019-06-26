// This module concerns the userDetail database entry, and viewing and modification of different user profiles,
// It is split from the userDataModule for clarity purposes

// This module uses the async/await functionality both for training, and optimalization purposes

import * as firebase from "firebase";

const state = {
  viewedProfile: null
};

const mutations = {
  setViewedProfile: (state, userData) => {
    state.viewedProfile = userData;
  },
  resetViewedProfile: state => {
    state.viewedProfile = null;
  }
};

const actions = {
  createUserDetailEntry(context, newUserId) {
    let newUserDetail = {
      id: newUserId,
      language: "undefined_language",
      // localisation: "undefined_localisation",
      technologies: [],
      username: "undefined_username",
      description: "undefined_description"
    };
    firebase
      .database()
      .ref("userDetails")
      .child(newUserId)
      .set(newUserDetail)
      .catch(err => alert(err));
  },
  async setViewedProfile({ commit }, userId) {
    // The registeredAdverts entry is stored in a different entry than detailed information, (users/userDetails)
    // hence they both have to be combined in the next operation, so that viewedProfile object
    // will contain all necessary data to be shown in the ProfileDetails.vue component.
    try {
      let [userBasic, userDetails] = await Promise.all([
        firebase
          .database()
          .ref("/users/" + userId)
          .once("value"),
        firebase
          .database()
          .ref("/userDetails/" + userId)
          .once("value")
      ]);
      let userData = { ...userBasic.val(), ...userDetails.val() };
      commit("setViewedProfile", userData);
    } catch (err) {
      alert(err);
    }
  },
  resetViewedProfile({ commit }) {
    commit("resetViewedProfile");
  },
  async editProfile(context, profileDetails) {
    try {
      await firebase
        .database()
        .ref("/userDetails/" + profileDetails.id)
        .set(profileDetails);
    } catch (err) {
      alert(err);
    }
  }
};

const getters = {
  viewedProfile: state => {
    if (state.viewedProfile !== null) {
      return state.viewedProfile;
    } else return {};
  }
};

export default { state, actions, mutations, getters };
