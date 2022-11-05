import axiosClient from "./axiosClient";

const productApi = {
    async getAll() {
        return await axiosClient.get('products/')
    },

    async getProductByCategory(id) {
        const url = `/products/category/${id}/`;
        return await axiosClient.get(url);
    },
    
    async getProductByBrand(id) {
        const url = `/products/brand/${id}/`;
        return await axiosClient.get(url);
    },

    add(data) {
        const url = `/products/`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/products/${data.id}/`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/products/${id}/`;
        return axiosClient.delete(url);
    },

}

export default productApi