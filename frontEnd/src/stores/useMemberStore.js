import { ref } from "vue";
import { defineStore } from "pinia";
import { EncryptStorage } from 'encrypt-storage';

const LOGIN_KEY = 'IS_LOGIN'
const encryptStorage = new EncryptStorage(
    "gdagsdafsdafsadfdsate",
    { prefix: "dabom" }
);

const useMemberStore = defineStore('member',
    () => {
        const isLogin = ref(false);

        const checkLogin = () => {

            return encryptStorage.getItem(LOGIN_KEY);
        }

        const setWithEncrypt = () => {
            encryptStorage.setItem(LOGIN_KEY, true)
        }

        return { isLogin, checkLogin, setWithEncrypt }
    }
)

export default useMemberStore;