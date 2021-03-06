<template>
    <form @submit.prevent="handleForm">
        <div class="form-control">
            <label for="email">
                {{ $t("auth.labels.email") }}
            </label>
            <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
            <label for="password">
                {{ $t("auth.labels.password") }}
            </label>
            <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="isError">
            {{ $t('auth.errors.validate_form') }}
        </p>
        <template v-if="action == 'login' ">
            <base-button>
                {{ $t("auth.buttons.login") }}
            </base-button>
            <base-button class="flat" @click.prevent="changeAction">
                {{ $t("auth.buttons.signup_instead") }}
            </base-button>
        </template>

        <template v-else>
            <base-button>
                {{ $t("auth.buttons.signup") }}
            </base-button>
            <base-button class="flat" @click.prevent="changeAction">
                {{ $t("auth.buttons.login_instead") }}
            </base-button>
        </template>
    </form>
    <teleport to="body">
        <base-back-drop v-if="backdrop"></base-back-drop>
        <transition name="fade">
            <base-dialog v-if="loading">
                <template v-slot:header>
                    <h2>{{ $t('auth.labels.title_loading') }}</h2>
                </template>
                <template v-slot:content>
                    <base-loading></base-loading>
                </template>
                <template v-slot:action>
                    <base-button @click="closeNotify">
                        {{ $t('auth.buttons.close')}}
                    </base-button>
                </template>
            </base-dialog>
        </transition>
        <transition name="fade">
            <base-dialog v-if="!login">
                <template v-slot:header>
                    <h2>{{ $t('auth.labels.title_error') }}</h2>
                </template>
                <template v-slot:content>
                    <p>
                        {{ $t('auth.errors.login_failed') }}
                    </p>
                </template>
                <template v-slot:action>
                    <base-button @click="closeNotify">
                        {{ $t('auth.buttons.close')}}
                    </base-button>
                </template>
            </base-dialog>
        </transition>
    </teleport>
</template>

<script>
import BaseButton from "../../commons/BaseButton"
import BaseBackDrop from "../../commons/BaseBackDrop"
import BaseDialog from "../../commons/BaseDialog"
import BaseLoading from "../../commons/BaseLoading"

import { mapState } from "vuex"
export default {
    data() {
        return {
            action: "login",
            email: "",
            password: "",
            isError: false
        }
    },
    components: {
        BaseButton,
        BaseBackDrop,
        BaseDialog,
        BaseLoading
    },
    computed: {
        ...mapState(["backdrop", "loading", "login"])
    },
    methods: {
        changeAction() {
            this.action = this.action == "login" ? "signup" : "login"
        },
        handleForm() {
            if (
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    this.email
                ) == false ||
                this.email.length < 6 ||
                this.password.length < 6
            )
                this.isError = true
            else {
                const formData = {
                    query: this.$route.query,
                    email: this.email,
                    password: this.password
                }
                if (this.action == "login") {
                    this.$store.dispatch("login", formData)
                } else {
                    this.$store.dispatch("signup", formData)
                }
            }
        },
        closeNotify() {
            this.$store.commit("SET_STATE_BACKDROP", false);
            this.$store.commit("SET_STATE_LOGIN", true);
        }
    }
}
</script>

<style lang="scss" scoped>
form {
    margin: 1rem;
    padding: 1rem;
    .form-control {
        margin: 0.5rem 0;
        label {
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: block;
        }
        input {
            display: block;
            width: 100%;
            font: inherit;
            border: 1px solid #ccc;
            padding: 0.15rem;
            &:focus {
                border-color: #3d008d;
                background-color: #faf6ff;
                outline: none;
            }
        }
    }
}

.fade-enter-from {
    transform: scale(0.7);
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: scale(1);
}

.fade-enter-active,
.fade-leave-active {
    transition: all ease 0.5s;
}

.fade-leave-to {
    opacity: 0;
    transform: scale(0.7);
}
</style>
