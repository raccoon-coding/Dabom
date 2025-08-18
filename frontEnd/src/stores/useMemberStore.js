import { ref } from "vue";
import { defineStore } from "pinia";
import { EncryptStorage } from 'encrypt-storage';

const LOGIN_KEY = 'IS_LOGIN'
const EXPIRE_MS = 60 * 60 * 1000 // 한시간
// const EXPIRE_MS = 1000 // 1초
const encryptStorage = new EncryptStorage(
    "gdagsdafsdafsadfdsate",
    { prefix: "dabom" }
);

const useMemberStore = defineStore('member',
    () => {
        const isLogin = ref(false);

        const checkLogin = () => {
            const data = encryptStorage.getItem(LOGIN_KEY);
            if(!data) {
                return false;
            }
            if(Date.now() > data.expireAt) {
                encryptStorage.removeItem(LOGIN_KEY)
                return false;
            }
            return data.loggedIn
        }

        const setWithEncrypt = () => {
            const expireAt = Date.now() + EXPIRE_MS;
            encryptStorage.setItem(LOGIN_KEY, {loggedIn : true, expireAt})
        }

        const removeWithEncrypt = () => {
          encryptStorage.removeItem(LOGIN_KEY)
        }

        return { isLogin, checkLogin, setWithEncrypt, removeWithEncrypt }
    }
)

export default useMemberStore;