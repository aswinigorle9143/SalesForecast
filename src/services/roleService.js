import api from "../api/api";

export const saveRole = (role) => {

    return api.post("/roles", role);

}
export const getAllRoles = () => {

    return api.get("/roles");

}
export const getRoleById = (id) => {

    return api.get("/roles/" + id);

}
export const updateRole = (id, role) => {

    return api.put("/roles/" + id, role);

}
export const deleteRoleById = (id) => {

    return api.delete("/roles/" + id);

}