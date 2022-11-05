import axiosClient from "./axiosClient";

const BrandApi = {
    async getAll() {
        return await axiosClient.get('brands/')
    },

}

export default BrandApi