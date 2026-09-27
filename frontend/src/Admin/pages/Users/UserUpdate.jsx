import { useState } from "react";
import api from "../../../services/auth";

function UserUpdate({setUpdateUsersToggle,updateUsersToggle,setupMessage}) {

    //update user states
    const [messages,setMessages] = useState({})
    const [updateData,setUpdateData] = useState({role: "user"})
    const [loading,setLoading] = useState(false)

    //update users
    const updateUsers = async(user)=>{
        setLoading(true)
        try{
            await api.patch(`/users/${user}`, updateData)
            setupMessage("success","User Updated!")

            setTimeout(()=>{
                setUpdateUsersToggle(false)
            }, 1000)
        }
        catch(err){
            console.log(err.response)
            setMessages({status: 'error', msg: err.response.data.message})

            setTimeout(()=>{
                setMessages({})
            }, 1500)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className="update-user-box">
                <div className="box">
                    <div className="box-header">
                        <h1>Update User</h1>
                    </div>
                    <div className="box-form">
                        <div className="name row">
                            <label>User Name</label>
                            <input type="text" placeholder="Enter Update Name" onChange={(e) => setUpdateData({...updateData, name: e.target.value})}/>
                        </div>
                        <div className="category row">
                            <label>Select Role</label>
                            <select defaultValue={"user"} onChange={(e) => setUpdateData({...updateData, role: e.target.value})}>
                                <option value="admin">Admin</option>
                                <option value="user" defaultValue={true}>User</option>
                            </select>
                        </div>
                        {
                            messages.msg &&
                            <div className={`alert ${messages.status === 'error' ? 'err' : 'succ'}`}>
                                <p className={messages.status}>{messages.msg}</p>
                            </div>
                        }
                        <div className="buttons row">
                            {
                                loading ?
                                    <input type="submit" value="Updating..."/>
                                    :
                                    <input type="submit" value="Update users" onClick={() => updateUsers(updateUsersToggle.userId)}/>
                            }
                            <button className="close" onClick={() => setUpdateUsersToggle(prev => !prev)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserUpdate;