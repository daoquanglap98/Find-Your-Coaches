<template>
    <div class="card">
        <header>
            <h2>Requests Received</h2>
        </header>
        <base-loading v-if="loading"></base-loading>
        <template v-else>
            <ul v-if="requests.length != 0">
                <request-item
                    v-for="(request, index) in requests"
                    :key="index"
                    :request="request"
                ></request-item>
            </ul>
            <h3 v-else>
                You haven't received any requests yet!
            </h3>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import RequestItem from "./RequestItem";
import BaseLoading from "../../commons/BaseLoading";

export default {
    data() {
        return {
            loading: true,
            requests: []
        };
    },
    components: {
        RequestItem,
        BaseLoading
    },
    created() {
        axios
            .get(
                "https://find-your-coach-d614f-default-rtdb.firebaseio.com/requests/" +
                    this.$store.state.userId +
                    ".json"
            )
            .then(response => {
                let allRequests = [];
                if (response.data) {
                    Object.keys(response.data).forEach(key => {
                        allRequests.push({ ...response.data[key] });
                    });
                }
                this.requests = allRequests;
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                setInterval(() => {
                    this.loading = false;
                }, 1000);
            });
    }
};
</script>

<style lang="scss" scoped>
.card {
    header {
        text-align: center;
    }
    ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
    }
    h3 {
        text-align: center;
    }
}
</style>
