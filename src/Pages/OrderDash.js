import React,{useState,useEffect} from 'react';
import VendorHeader from './VendorHeader';
import '../css/OrderDash.css';
import emailjs from 'emailjs-com';
import Axios from 'axios';

function OrderDash(props){
    var fullName=props.location.state.fullname;
    console.log(fullName);
    var date=new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    
    const [time,setTime]=useState([]);
    const [status,setValue]=useState('');

    const [menuList,setMenuList]=useState([]);
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/fetch').then((response)=>{
            setMenuList(response.data)
        });
    },[]);
    
    const templateParams={
        to_name:'Manassa',
        from_name:'Manassa',
        message:'Order has been completed.Please pick your order',
        reply_to:'manassavs2000@gmail.com'
    };
   
    function handleChange(e,i,a){
        
        console.log(e);
        console.log(i);
        console.log(a);
        setValue(e.target.value);
        if(e.target.value==='Completed'){
            
            console.log('order is completed');
            emailjs.send('service_qgxyvxo','template_2vnnhq9',templateParams,'user_8QAcPQtwse7Ey4pbYTAZP');
        
            var timeL=[...time];
            
            timeL[i-1]=date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
            console.log(timeL);
            setTime(timeL);
            Axios.post('http://localhost:3001/orderstatus',{
               Ostatus:e.target.value,
               Oid:i,
                oNo:a,
            }).then((response)=>{
            console.log(response);
            });
        }
    }
    console.log(time);
    
    
    
    return(
        <div>
            <VendorHeader name={fullName}/>
            <div className="heading">Orders Dashboard</div>
            <div className="row1">
                <div className="dropdown">
                    <select name="date" id="date">
                        <option value="date">{day}-{month}-{year}</option>
                    </select>
                </div>
                <div>
                    <button className="menu">Go to Update Menu</button>
                </div>
            </div>
            <div>
                <table className="table__1">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Order No.</td>
                            <td>Food Item</td>
                            <td>Quantity</td>
                            <td>Ordered By</td>
                            <td>Time</td>
                            <td>Order Status</td>
                            <td>Order Completed at</td>
                        </tr>
                    </thead>
                    <tbody>
                    {menuList.map((val,i) =>{
                        if (val.orderStatus === "In Progress") {
                        return(
                            <tr>
                                <td>{val.id}</td>
                                <td>{val.orderNo}</td>
                                <td>{val.itemName}</td>
                                <td>{val.itemQty}</td>
                                <td>{val.username}</td>
                                <td>{val.timetest}</td>
                                <td>
                                    <select name="status" id="status" onKeyPress={(event)=>handleChange(event, val.id,val.orderNo)}>   
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>                              
                                    </select>  
                                </td>
                                
                                <td>{time[i]}</td>
                            </tr>       
                        )}
                    })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default OrderDash