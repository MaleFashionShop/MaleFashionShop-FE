import axiosClient from "./axiosClient";

const CategoryApi = {
    async getAll() {
        return await axiosClient.get('categories/')
    }

}

export default CategoryApi