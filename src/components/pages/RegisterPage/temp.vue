<template>
    <div>
        <h2>Register as a coach now!</h2>
        <form @submit.prevent="registerAsCoach">
            <div :class="['form-control', { invalid: coach.firstName.error}]">
                <label for="firstname">Firstname</label>
                <input
                    v-model="coach.firstName.value"
                    type="text"
                    id="firstname"
                    @blur="validateFirstName"
                    @input="validateFirstName"
                />
                <p v-if="coach.firstName.error">{{ coach.firstName.error }}</p>
            </div>
            <div :class="['form-control', { invalid: coach.lastName.error}]">
                <label for="lastname">Lastname</label>
                <input
                    v-model="coach.lastName.value"
                    type="text"
                    id="lastname"
                    @input="validateLastName"
                    @blur="validateLastName"
                />
                <p v-if="coach.lastName.error">{{ coach.lastName.error }}</p>
            </div>
            <div :class="['form-control', { invalid: coach.description.error}]">
                <label for="description">Description</label>
                <textarea
                    v-model="coach.description.value"
                    id="description"
                    rows="5"
                    @input="validateDescription"
                    @blur="validateDescription"
                >
                </textarea>
                <p v-if="coach.description.error">
                    {{ coach.description.error }}
                </p>
            </div>
            <div :class="['form-control', { invalid: coach.hourlyRate.error}]">
                <label for="rate">Hourly Rate</label>
                <input
                    v-model="coach.hourlyRate.value"
                    type="number"
                    id="rate"
                    @blur="validateHourlyRate"
                    @input="validateHourlyRate"
                />
                 <p v-if="coach.hourlyRate.error">{{ coach.hourlyRate.error }}</p>
            </div>

           
        <div :class="['form-control', { invalid: coach.areas.error}]">
            <h3>Areas of Expertise</h3>
            <div>
                <input
                    v-model="coach.areas.value"
                    type="checkbox"
                    id="frontend"
                    value="frontend"
                    @change="validateAreas"
                />
                <label for="frontend">
                    Frontend Development
                </label>
            </div>
            <div>
                <input
                    v-model="coach.areas.value"
                    type="checkbox"
                    id="backend"
                    value="backend"
                    @change="validateAreas"
                />
                <label for="backend">
                    Backend Development
                </label>
            </div>
            <div>
                <input
                    v-model="coach.areas.value"
                    type="checkbox"
                    id="career"
                    value="career"
                    @change="validateAreas"
                />
                <label for="career">
                    Career Advisory
                </label>
            </div>
            <p v-if="coach.areas.error">{{ coach.areas.error }}</p>
        </div> 
            <base-button class="">
                Register
            </base-button>
        </form>
    </div>
</template>

<script>
import BaseButton from "../../commons/BaseButton"
export default {
    data() {
        return {
            coach: {
                firstName: {
                    value: "",
                    error: ""
                },
                lastName: {
                    value: "",
                    error: ""
                },
                hourlyRate: {
                    value: "",
                    error: ""
                },
                description: {
                    value: "",
                    error: ""
                },
                areas: {
                    value: [],
                    error: "",
                }
            }
        }
    },
    components: {
        BaseButton
    },
    methods: {
        validateFirstName() {
            this.validate("firstName", "Firstname must not be empty.", "isRequired")
            this.validate("firstName", "firstName phải viết hoa chữ caí đầu", "capitalize")
            this.validate("firstName", "firstName must than 3.", "minLength", 3)
        },
        validateLastName() {
            this.validate("lastName", "lastName must not be empty.", "isRequired")
            this.validate("lastName", "Lirstname must than 3.", "minLength", 3)
        },
        validateHourlyRate() {
            this.validate("hourlyRate", "Hourly Rate phải là số lớn hơn 0.", "isNumber")
        },
        validateDescription() {
            this.validate('description', 'description must not be empty.', 'isRequired'), 
            this.validate('description', 'description phải dưới 100 kí tự.', 'maxLength', 100)
        },
        validateAreas() {
            this.validate("areas", "Firstname must not be empty.", "isRequired")
        },
        validate(nameInput, message, rule, valueRule = "") {
            var valueInput = this.coach[nameInput].value
            var errorInput = this.coach[nameInput].error
            switch (rule) {
                case "isRequired":
                    {
                        if (valueInput.length == 0)
                            this.coach[nameInput].error = message
                        else this.coach[nameInput].error = ""
                    }
                    break
                case "minLength":
                    {
                        if (errorInput != message && errorInput != "") break
                        if (valueInput.length < valueRule)
                            this.coach[nameInput].error = message
                        else this.coach[nameInput].error = ""
                    }
                    break
                case "maxLength":
                    {
                        if (errorInput != message && errorInput != "") break
                        if (valueInput.length > valueRule)
                            this.coach[nameInput].error = message
                        else this.coach[nameInput].error = ""
                    }
                    break
                case "capitalize":
                    {
                        if (errorInput != message && errorInput != "") break
                        if (
                            valueInput.substr(0, 1) !=
                            valueInput.substr(0, 1).toUpperCase()
                        )
                            this.coach[nameInput].error = message
                        else this.coach[nameInput].error = ""
                    }
                    break
                case "isNumber":
                    {
                        if (errorInput != message && errorInput != "") break
                        if (
                            valueInput <= 0
                        )
                            this.coach[nameInput].error = message
                        else this.coach[nameInput].error = ""
                    }
                    break
            }
        }
    },
}
</script>

<style scoped lang="scss">
form {
    padding: 30px;
}
.form-control {
    &.invalid {
        label {
            color: red;
        }
        input,
        textarea {
            border: 1px solid red;
        }
    }
    margin: 0.5rem 0;
    label {
        font-weight: 700;
        display: block;
        margin-bottom: 0.5rem;
    }
    input,
    textarea {
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        font: inherit;
        &:focus {
            background-color: #f0e6fd;
            outline: none;
            border-color: #3d008d;
        }
        &:active {
            outline: none;
        }
    }
    h3 {
        margin: 0.5rem 0;
        font-size: 1rem;
    }
    input[type="checkbox"] {
        display: inline;
        width: auto;
        border: none;
    }
    input[type="checkbox"] + label {
        font-weight: 400;
        display: inline;
        margin: 0 0 0 0.5rem;
    }
}
</style>
