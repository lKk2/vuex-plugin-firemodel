"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
/**
 * The **mutations** associated to the Firebase Auth API.
 */
exports.authMutations = () => ({
    signInWithEmailAndPassword(state, userCredential) {
        if (userCredential.user) {
            vue_1.default.set(state, "currentUser", {
                email: userCredential.user.email,
                emailVerified: userCredential.user.emailVerified,
                uid: userCredential.user.uid,
                isAnonymous: userCredential.user.isAnonymous,
                fullProfile: userCredential.user
            });
            state.authenticated = "logged-in";
        }
    },
    createUserWithEmailAndPassword(state, userCredential) {
        // no need to change state tree as the observer on onAuthChanged will address this
    },
    sendPasswordResetEmail(state) {
        // nothing to do
    },
    confirmPasswordReset(state) {
        // nothing to do
    },
    verifyPasswordResetCode(state, email) {
        // on success it returns the email of the user who entered the reset code
    },
    updateEmail(state, email) {
        vue_1.default.set(state, "currentUser", Object.assign(Object.assign({}, state.currentUser), { email }));
    },
    updatePassword() {
        // nothing to do
    },
    signOut(state) {
        // no need to change state tree as the observer on onAuthChanged will address this
    }
});
//# sourceMappingURL=auth.js.map