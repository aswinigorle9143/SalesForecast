import { useState, useEffect } from "react";
import { saveRole, getAllRoles, getRoleById, updateRole, deleteRoleById} from "../services/roleService";

function Role() {

    // Form State
    const [role, setRole] = useState({
        roleCode: "",
        roleName: "",
        description: ""
    });
    const [roles, setRoles] = useState([]);

    const [editingId, setEditingId] = useState(null);

    // Generic Change Handler
    const handleChange = (e) => {

        const { name, value } = e.target;

        setRole({
            ...role,
            [name]: value
        });

    };

    // Save Button
   const save = async () => {

    try {

        const response = await saveRole(role);

        console.log(response.data.data);
        console.log(response.data.message);
        
        alert(response.data.message);

        setRole({

            roleCode: "",

            roleName: "",

            description: ""

        });
         await loadRoles();

    } catch (error) {

         if(error.response){

        alert(error.response.data.message);

    }

    }

}

const loadRoles = async () => {

    try{

        const response = await getAllRoles();

        console.log(response.data.data);

        setRoles(response.data.data);

    }

    catch(error){

        console.log(error);

    }

}
const editRole = async (id) => {

    try{

        const response = await getRoleById(id);

        setRole(response.data.data);

        setEditingId(id);

    }

    catch(error){

        console.log(error);

    }

}
const update = async () => {

    try {

        const response = await updateRole(editingId, role);

        alert(response.data.message);

        setEditingId(null);

        setRole({

            roleCode: "",

            roleName: "",

            description: ""

        });

        await loadRoles();

    }

    catch (error) {

        console.log(error);

    }

}

const deleteRole = async (id) => {

    const confirmed = window.confirm("Are you sure you want to delete this role?");

    if (!confirmed) {
        return;
    }
    try{

        const response = await deleteRoleById(id);

        alert(response.data.message);

        await loadRoles();

    }

    catch(error){

        console.log(error);

    }

}
useEffect(()=>{

    loadRoles();

},[]);

    return (

        <div style={{ width: "450px", margin: "50px auto" }}>

            <h2>Role Management</h2>

            <div>

                <label>Role Code</label>

                <br />

                <input
                    type="text"
                    name="roleCode"
                    value={role.roleCode}
                    onChange={handleChange}
                    placeholder="Enter Role Code"
                    style={{ width: "100%", padding: "8px" }}
                />

            </div>

            <br />

            <div>

                <label>Role Name</label>

                <br />

                <input
                    type="text"
                    name="roleName"
                    value={role.roleName}
                    onChange={handleChange}
                    placeholder="Enter Role Name"
                    style={{ width: "100%", padding: "8px" }}
                />

            </div>

            <br />

            <div>

                <label>Description</label>

                <br />

                <textarea
                    rows="4"
                    name="description"
                    value={role.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    style={{ width: "100%", padding: "8px" }}
                />

            </div>

            <br />

            <button
                 onClick={editingId ? update : save}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer"
                }}
            >
               {editingId ? "Update" : "Save"}
            </button>

<hr/>

<h2>Roles</h2>

<table border="1" cellPadding="10">

<thead>
<tr>
    <th>ID</th>
    <th>Role Code</th>
    <th>Role Name</th>
    <th>Description</th>
    <th>Action</th>
</tr>
</thead>

<tbody>

{
roles.map((item)=>(

<tr key={item.id}>

<td>{item.id}</td>
<td>{item.roleCode}</td>
<td>{item.roleName}</td>
<td>{item.description}</td>

<td>

<button onClick={() => editRole(item.id)}>
    Edit
</button>

<button onClick={() => deleteRole(item.id)}>
    Delete
</button>

</td>

</tr>

))
}

</tbody>

</table>
        </div>

    );

}

export default Role;