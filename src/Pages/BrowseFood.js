import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../css/BrowseFood.css';
import StarRatings from 'react-star-ratings';
import Card from './Card';
import Axios from 'axios';
import { Link } from 'react-router-dom';




function BrowseFood(props){
        console.log(props.location.state);
        console.log(props.location.state.fullName);
        var data=props.location.state;
        
        var fullName=props.location.state.fullName;
        var email=props.location.state.email;
        const[selectList,setSelectList]=useState([]);
        
        var grandTotal=0;
        var Totalcount = 0;
        const [orderNo,setOrderNo]=useState(0);
        useEffect(()=>{
            Axios.get('http://localhost:3001/count').then((response)=>{
                setOrderNo(response.data)
            });
        },[]);
        
        const [ord,setOrd]=useState(0);
        
        const set =()=>{
            setOrd(orderNo[0].orderNo);

        }
        const [number, setNumber] = useState(0);
        const handleQuery=(id,names,quantity,total,price,np)=>{
            const newList=[...selectList];
            newList[id] = [id,names,quantity,total,price,np];

            setSelectList(newList);

            set();
        }
        selectList.forEach(element => {
            if(element===undefined){
                console.log("nothing");
            }
            else{
                console.log(element);
                if(element[5]==='p'){
                    grandTotal=grandTotal+element[3];
                   
                }
               else if(element[5]==='n'){
                   console.log("before decrement of grandtotal"+grandTotal);
                   grandTotal=grandTotal-element[3];
                   
               }
            
            }
        });
        selectList.forEach(element => {
            if(element===undefined){
                console.log("nothing");
            }
            else{
                if(element[5]==='p'){
                    
                    Totalcount++;
                    
                }
               else if(element[5]==='n' && element[2]===1){
                   
                   console.log("element[5] is"+element[5]+" element[2] is "+element[2]);
                   console.log(Totalcount+"before decrement")
                   Totalcount=Totalcount+1;
                   //Totalcount--;
                   console.log(Totalcount+"after decrement")
                   
               }
               
            }
        });
        const onNumberChange = () => {
            setNumber(number);
        }
        console.log(selectList);
        console.log("Grand Total is"+grandTotal);
        console.log("TOtalcount is "+Totalcount);
        

        const [menuList,setMenuList]=useState([])
        const [lunchList,setLunchList]=useState([])
        const [snackList,setSnackList]=useState([])

        useEffect(()=>{
            Axios.get('http://localhost:3001/api/get').then((response)=>{
                setMenuList(response.data)

            });
        },[]);
        useEffect(()=>{
        
            
            Axios.get('http://localhost:3001/api/get/lunch').then((response)=>{
                setLunchList(response.data)

         });
        },[]);
        useEffect(()=>{
        

            Axios.get('http://localhost:3001/api/get/snacks').then((response)=>{
                setSnackList(response.data)

        });
        },[]);
        const [users,setUsers]=useState([]);
        useEffect(()=>{
            Axios.get('http://localhost:3001/id').then((response)=>{
                setUsers(response.data)
            });
        },[]);

        
        
        var num=0;
        var userId;
        users.forEach(element => {
           if(element.fullname===fullName){
               userId=element.id;
               num=1;
            }
        });
        const [id,setId]=useState(0);
        
        let dineOption = '';
        const d = new Date();

        var h = d.getHours();
        var m = d.getMinutes();
        
        var bstart = 9
        var bEndHr = 11;
        var bEndMin = 30;
        var lunchStart = 12;
        var lunchEnd = 13;
        const setDineOption = () => {
            
            if(h>=bstart  && h<bEndHr) {
                dineOption = 'breakfast';
                
            }else if(h==bEndHr) {
                if(m>bEndMin) {
                    dineOption='snacks';
                }else
                dineOption = 'lunch';
            }else if(h>=lunchStart && h<lunchEnd) {
                dineOption = 'lunch';
            }else {
                dineOption = 'snacks';
            }
            
        }

        setDineOption();
        const[foodstate, setFoodState]= useState("breakfast")
        
        return(
            <div>
                <Header loginDetails={fullName} loginEmail={email} number={Totalcount} onNumberChange={onNumberChange}/>
                
                <div className="dropdown">
                    <div className="dropdown__1">
                        
                       
                        <select name="timings" id="timings" onChange={(e) => {
                            
                            setFoodState(e.target.value);
                            }}>
                            {dineOption=foodstate}
                            <option value="breakfast" selected={dineOption === 'breakfast' ? 'selected': ''}>Breakfast (8am-11:30am)</option>
                            <option value="lunch" selected={dineOption === 'lunch' ? 'selected': ''}>Lunch (12pm-3pm)</option>
                            <option value="snacks" selected={dineOption === 'snacks' ? 'selected': ''}>Snacks - All day</option>
                            
                        </select>
                    </div>
                    <div className="dropdown__2">
                        <select name="store" id="store">
                            <option value="shanti_sagar">Shanti Sagar</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="v1"></div>
                    <div className="column2">
                        <div style={{display:'flex',flexWrap:'wrap',alignItems:'baseline'}}>
                            <h1 style={{paddingRight:'20px'}} className="shantiHeader">Shanti Sagar</h1>
                            <StarRatings
                                rating={3}
                                starDimension="20px"
                                starSpacing="2px"
                                starRatedColor="#183454"
                            />
                        </div>
                        <div>
                            
                            <div>
                            {
                            menuList.map((val) => {


                                const d = new Date();

                                var h = d.getHours();
                                var m = d.getMinutes();

                                var bstart = 8;
                                var bEndHr = 11;
                                var bEndMin = 30;
                                var lunchStart = 12;
                                var lunchEnd = 15;
                                if ((h >= bstart && h < bEndHr) || ((h==bEndHr) && (m<bEndMin))) {
                                    if (foodstate === "breakfast") {
                                        return (

                                            <div style={{ display: 'flex', flexWrap: "wrap" }}>
                                                <Card id={val.id}image={val.image.data} price={val.Cost} names={val.Name} rating={val.Rating} votes={val.Votes} handleQuery={handleQuery}/>
                                            </div>
                                        )
                                    }
                                }
                            }
                            )}

                        {lunchList.map((val) => {
                            const d = new Date();

                            var h = d.getHours();
                            var m = d.getMinutes();

                            var bstart = 21
                            var bEndHr = 11;
                            var bEndMin = 30;
                            var lunchStart = 12;
                            var lunchEnd = 15;
                            if (h >= lunchStart && h < lunchEnd) {
                                if (foodstate === "lunch") {
                                    return (

                                        <div style={{ display: 'flex', flexWrap: "wrap" }}>
                                            <Card id={val.id}image={val.image.data} price={val.Cost} names={val.Name} rating={val.Rating} votes={val.Votes} handleQuery={handleQuery}/>
                                        </div>
                                    )
                                }
                            }
                        })}
                        {snackList.map((val) => {
                            if (foodstate === "snacks") {
                                return (

                                    <div style={{ display: 'flex', flexWrap: "wrap" }}>
                                        <Card id={val.id}image={val.image.data} price={val.Cost} names={val.Name} rating={val.Rating} votes={val.Votes} handleQuery={handleQuery}/>
                                    </div>
                                )
                            }
                        })}
                            
                            </div>
                        </div>
                        
                        {(()=>{
                            if(selectList.length>=1 && grandTotal!=0){
                                return(
                                    <div className="footer" style={{display:'flex', justifyContent:"end"}}>
                                        <p id="total">SubTotal: Rs.{Math.abs(grandTotal)}</p>
                                    <Link to={{
                                        pathname:"/Payment",
                                        state:{...selectList,data,ord,userId,foodstate}
                                    }}>
                                    <button id="cont">Continue</button>
                                </Link>
                                </div>
                                )
                            }
                        })()}
                        
                   
                    </div>
                </div>
                
            </div>
        )
    
}
export default BrowseFood