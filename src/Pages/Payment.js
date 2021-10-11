import React,{useState,useEffect} from 'react';
import '../css/Payment.css';
import Header from './Header';
import Amazon from '../images/amazon_pay.png';
import PhonePe from '../images/PhonePe.png';
import Paytm from '../images/paytm.png';
import MobiKwik from '../images/mobikwik.png';
import {Sidebar} from './Sidebar';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { Link } from 'react-router-dom';
import Axios from 'axios';
var CryptoJS = require("crypto-js");

function Payment(props){
    
    
    console.log(props.location.state)
    const selectedList=props.location.state;
    console.log(selectedList);
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
            console.log(response.data);
     });
    },[]);
    useEffect(()=>{
    
        
        Axios.get('http://localhost:3001/api/get/snacks').then((response)=>{
            setSnackList(response.data)
            console.log(response.data);
    });
    },[]);
    const [accountList,setAccountList]=useState([]);
    useEffect(()=>{
        Axios.get('http://localhost:3001/accounts').then((response)=>{
            setAccountList(response.data)
        });
    },[]);
    
    var date=new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var oDate=day+"/"+month+"/"+year;
    var time=date.getHours()+":"+date.getMinutes();
    var tifOptions = [];
    var time2=new Date();
    var testTime=time2.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).substring(0,5);
    console.log(testTime);
    Object.keys(selectedList).forEach(function(key) {
    tifOptions.push(<option value={key}>{selectedList[key]}</option>);
    });
    console.log(tifOptions);
    console.log(tifOptions.length);
    console.log(tifOptions[0].props.children)
    const [itemList,setItemList]=useState(tifOptions);
    console.log(itemList);
    var grandTotal=0;
    console.log(tifOptions[tifOptions.length-4].props.children.fullName);
    console.log(typeof(tifOptions[tifOptions.length-4].props.children));
    var username=tifOptions[tifOptions.length-4].props.children.fullName;

    console.log(tifOptions[tifOptions.length-3].props.children);
    console.log(typeof(tifOptions[tifOptions.length-3].props.children));
    var orderno=tifOptions[tifOptions.length-3].props.children+1;

    console.log(tifOptions[tifOptions.length-2].props.children);
    var userID=tifOptions[tifOptions.length-2].props.children;
    console.log(userID);
    
    console.log(tifOptions[tifOptions.length-1].props.children);
    var dineOption=tifOptions[tifOptions.length-1].props.children;
    console.log(dineOption);

    var data=tifOptions[tifOptions.length-4].props.children;
    console.log(data);

    var email=tifOptions[tifOptions.length-4].props.children.email;

    tifOptions.forEach(element => {
       
        if(element.props.children===undefined || typeof(element.props.children)==="string" || typeof(element.props.children)==="number"){
            return null;
        }
        else if(element.props.children.email===data.email){
            return null;
            
        }
        else{
            console.log(element.props.children);
            console.log("From else "+element.props.children[3]+" hello  "+typeof(element.props.children[3]));
            grandTotal=grandTotal+element.props.children[3];
        }
    });
    var accountPresent=0;
    var cname;
    var cno;
    var expd;
    var cvcnum;
    accountList.forEach(element => {
        if(element.userId===userID){
            accountPresent=1;
            cname=element.name;
            cno=element.cardNumber;
            expd=element.expiry;
            cvcnum=element.cvc;
        }
    });
    var cnoDecrypt;
    var expdDecrypt;
    var cvcnumDecrypt;
    console.log("Is account present"+accountPresent);
    if(accountPresent===1){
        var bytes = CryptoJS.AES.decrypt(cno, 'my-secret-key@123');
        cnoDecrypt =bytes.toString(CryptoJS.enc.Utf8);
        

        var bytes1 = CryptoJS.AES.decrypt(expd, 'my-secret-key@123');
        expdDecrypt = bytes1.toString(CryptoJS.enc.Utf8);
        

        var bytes2 = CryptoJS.AES.decrypt(cvcnum, 'my-secret-key@123');
        cvcnumDecrypt = bytes2.toString(CryptoJS.enc.Utf8);
        

    }
    
    console.log(grandTotal);
    
    const [name, setName] = useState("");
    const [cardNo, setCardNo] = useState(0);
    const [edate, setEdate] = useState("");
    const [cvcNo, setCVC] = useState(0);
    const [presentstatus,setPresentStatus]=useState(true);
    
    const [cvcInput,setCVCInput]=useState(0);
    if(cardNo!=="" && edate!=="" && cvcNo!==""){
        var cardNoEncrypt = CryptoJS.AES.encrypt(cardNo, 'my-secret-key@123').toString();
        console.log('Encrypt Data -')
        console.log(cardNoEncrypt);
        var edateEncrypt = CryptoJS.AES.encrypt(edate, 'my-secret-key@123').toString();
        console.log('Encrypt Data edate-')
        console.log(edateEncrypt);
        var cvcNoEncrypt = CryptoJS.AES.encrypt(cvcNo, 'my-secret-key@123').toString();
        console.log('Encrypt Data cvc no-')
        console.log(cvcNoEncrypt);
    }
    
    

    const placeOrder = ()=>{
        tifOptions.map((food,i)=>{
            if(food.props.children===undefined){
                return null;
            }
            else if(food.props.children[2]>=1){
                Axios.post('http://localhost:3001/placeorder',{
                name:food.props.children[1],
                qty:food.props.children[2],
                Ordertime:time,
                OrderDate:oDate,
                uname:username,
                ordno:orderno,
                timet:testTime,
            }).then((response)=>{
            console.log(response);
            });
            }
        });
        
    };
    const cardDetails=()=>{
        Axios.post('http://localhost:3001/carddetails',{
                cname:name,
                cNo:cardNoEncrypt,
                expiry:edateEncrypt,
                Nocvc:cvcNoEncrypt,
                uid:userID,
            }).then((response)=>{
            console.log(response);
        });
    }
    const bothFunctions=()=>{
        placeOrder();
        cardDetails();
    }
    
    const [option,setOption]=useState("Credit/Debit Cards");
    
    return(
        <div>
            <Header loginDetails={username} loginEmail={email}/>
            <div className="Heading">CheckOut</div>
            <div className="main">
                <div className="part1">
                    <div className="subheading">Choose Payment Method</div>
                    <div className="sub-part1">
                        <div className="sub1-part1">
                            <div>
                                <ul className="SidebarList">
                                    
                                    {Sidebar.map((val,key)=>{
                                        return(
                                            <li key={key} className="row" 
                                            id={option==val.title ? "active" : ""}
                                            onClick={()=>{
                                                setOption(val.title);
                                                console.log(option);
                                            }}>
                                                <div id="icon">{val.icon}</div>
                                                <div id="title">{val.title}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div>
                            {(()=>{
                                if(option==="Credit/Debit Cards"){
                                    return(
                                        <div>
                                            {(()=>{
                                        if(accountPresent===0){
                                            if(presentstatus){
                                                console.log()
                                                return(
                                                    <div>
                                                    
                                                        <div className="heading1">Enter Card Details</div>
                                                    <div className="formContent" style={{width:"100%"}}>
                                                        <form>
                                                            <div className="formContent-name"><input type="text" placeholder="Name on Card" style={{width:"96%",height:"25px",margin:"3px"}} onChange={e => setName(e.target.value)} required/></div>
                                                            <div className="formContent-num"><input type="number" placeholder="Card Number" style={{width:"96%",height:"25px",margin:"3px"}} onChange={e => setCardNo(e.target.value)} required/></div>
                                                            <div className="formContent-date" style={{width:"100%"}}>
                                                                <div className="date-date"><input type="text" placeholder="MM/YYYY" style={{width:"98%",height:"25px",margin:"3px"}} onChange={e => setEdate(e.target.value)} required/></div>
                                                                <div className="date-cvc"><input type="password" placeholder="CVV" style={{width:"98%",height:"25px",margin:"3px"}} onChange={e => setCVC(e.target.value)} required/></div>
                                                            </div>
                                                            {(()=>{
                                                                
                                                                if(name==="" || cardNo==="" || edate==="" || cvcNo===""){
                                                                    return(
                                                                        <button className="button" onClick={(e)=>{
                                                                            alert("Fields cannot be empty");
                                                                            e.preventDefault();
                                                                        }}>Pay Rs.{grandTotal}</button>
                                                                    )
                                                                    
                                                                }
                                                                else if(cardNo.toString().length!==16){
                                                                    return(
                                                                        <button className="button" onClick={(e)=>{
                                                                            alert("Card Number is incorrect");
                                                                            e.preventDefault();
                                                                        }}>Pay Rs.{grandTotal}</button>
                                                                    )
                                                                    
                                                                }
                                                                else if(cvcNo.toString().length!==3){
                                                                    return(
                                                                        <button className="button" onClick={(e)=>{
                                                                            alert("CVV is incorrect");
                                                                            e.preventDefault();
                                                                        }}>Pay Rs.{grandTotal}</button>
                                                                    )
                                                                }
                                                                else{
                                                                    return(
                                                                        <Link to={{
                                                                            pathname:"/completePayment",
                                                                            state:{data}
                                                                        }}>
                                                                            <button type="submit"className="button" onClick={bothFunctions}>Pay Rs.{grandTotal}</button>
                                                                    </Link>
                                                                    )
                                                                }
                                                            })()}
                                                            
                                                        </form>
                                                    </div>
                                                    </div>
                                                )
                                            }
                                            
                                        }
                                        else{
                                            return(
                                                <div>
                                                <div className="heading1">Card Details</div>
                                                <div className="accountInfo">
                                                    
                                                    <div className="accountInfoSub">
                                                        <div className="accountInfoHeading">Name on Card: </div>
                                                        <div className="accountInfoBody">{cname}</div>
                                                    </div>
                                                    <div className="accountInfoSub">
                                                        <div className="accountInfoHeading">Card Number: </div>
                                                        
                                                        <div className="accountInfoBody">********{cnoDecrypt.substring(5)}</div>
                                                    </div>
                                                    <div className="accountInfoSub">
                                                        <div className="accountInfoHeading">Expiry Date(MM/YYYY): </div>
                                                        <div className="accountInfoBody">{expdDecrypt}</div>
                                                    </div>
                                                    <div className="accountInfoSub">
                                                        <div className="accountInfoHeading">CVV: </div>
                                                        
                                                        <div className="cvcInput"><input type="password" placeholder="CVV" style={{width:"98%",height:"25px",margin:"3px"}} onChange={e => setCVCInput(e.target.value)}/></div>
                                                    </div>                                                
                                                    
                                                    
                                                        {(()=>{
                                                            console.log(cvcnumDecrypt);
                                                            if(cvcInput===cvcnumDecrypt){
                                                                return(
                                                                <Link condition={cvcInput===cvcnumDecrypt} to={{
                                                                    pathname:"/completePayment",
                                                                    state:{data}
                                                            }}>
                                                                <button className="button" onClick={placeOrder}>Pay Rs.{grandTotal}</button>
                                                            </Link>
                                                                )
                                                            }
                                                            else{
                                                                
                                                                return(
                                                                    <button className="button" onClick={()=>{
                                                                        alert("CVV does not match!!!");
                                                                    }}>Pay Rs.{grandTotal}</button>
                                                                    
                                                                )
                                                                
                                                            }
                                                        })()}
                                                        {console.log(cvcnumDecrypt)}
                                                        {console.log(cvcInput===cvcnumDecrypt)}
                                                        
                                                    
                                                </div>
                                                </div>
                                            )
                                        }
                                       
                                    })()}
                                        </div>
                                    )
                                }
                                else if(option==="Wallets"){
                                    return(
                                    <div className="sub2-part2">
                            <div className="card">
                                <img src={Amazon} alt="amazon_pay" />
                                <div className="content">
                                    <div className="type">Amazon Pay</div>
                                  
                                    
                                    <div>
                                        <a href="Payment">Link Account</a>
                                    </div>
                                    </div>
                            </div>
                            <div className="card">
                                <img src={PhonePe} alt="PhonePe" />
                                <div className="content">
                                    <div className="type">PhonePe (Wallet/UPI/Cards)</div>
                                    <div>
                                        <a href="Payment">Link Account</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <img src={Paytm} alt="Paytm" />
                                <div className="content">
                                    <div className="type">Paytm</div>
                                    <div>
                                        <a href="Payment">Link Account</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <img src={MobiKwik} alt="MobiKwik" />
                                <div className="content">
                                    <div className="type">MobiKwik</div>
                                    <div>
                                        <a href="Payment">Link Account</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )}
                            })()}
                        </div>
                        
                    </div>
                </div>
                <div className="part2">
                    <div className="subheading">Summary</div>
                      
                    <div className="foodCard">
                    {
                     tifOptions.map((food, i) => (
                        
                        <div className="foodCardSub">
                            {(()=>{
                                if(food.props.children===undefined || typeof(food.props.children)==="string" || typeof(food.props.children)==="number")
                                {
                                    return null;
                                }
                                else
                                {
                                    console.log("From else "+food.props.children[3]);
                                    
                                        
                                        if(food.props.children[2]>=1){
                                            
                                            return(
                                                <div>
                                                    <div className="image">

                                                        
                                                        {(()=>{     
                                                            if(dineOption==="breakfast"){
                                                                return(
                                                                    <div>
                                                                        {menuList.map((val)=>{
                                                                            if(val.id===food.props.children[0]){
                                                                                const buff= new Buffer(val.image.data);
                                                                                const newimg=buff.toString('base64');
                                                                                console.log("inside the menulist loop");
                                                                                return(
                                                                                    <img src={`data:image/jpg;base64,${newimg}`} alt="images"/>
                                                                                )
                                                                            }
                                                                            })

                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            else if(dineOption==="lunch"){
                                                                return(
                                                                    <div>
                                                                        {lunchList.map((val)=>{
                                                                            if(val.id===food.props.children[0]){
                                                                                const buff= new Buffer(val.image.data);
                                                                                const newimg=buff.toString('base64');
                                                                                console.log("inside the menulist loop");
                                                                                return(
                                                                                    <img src={`data:image/jpg;base64,${newimg}`} alt="images"/>
                                                                                )
                                                                            }
                                                                            })

                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            if(dineOption==="snacks"){
                                                                return(
                                                                    <div>
                                                                        {snackList.map((val)=>{
                                                                            if(val.id===food.props.children[0]){
                                                                                const buff= new Buffer(val.image.data);
                                                                                const newimg=buff.toString('base64');
                                                                                console.log("inside the menulist loop");
                                                                                return(
                                                                                    <img src={`data:image/jpg;base64,${newimg}`} alt="images"/>
                                                                                )
                                                                            }
                                                                            })

                                                                        }
                                                                    </div>
                                                                )
                                                            }

                                                        })()}
                                                    </div>
                                                    <div className="foodCardRow">
                                                        <div className="name">{food.props.children[1]}</div>
                                                        <div className="qty">
                                                        
                                                            
                                                            <div className="btnGroup">
                                                                <span><button onClick={() => {
                                                                    food.props.children[2] -=1;
                                                                    setItemList(food.props.children[2]);
                                                                    food.props.children[3] -=food.props.children[4];
                                                                    setItemList(food.props.children[3]);
                                                                }} className="countminus">-</button></span>
                                                                <span><button className="count">{food.props.children[2]}</button></span>
                                                                <span><button onClick={() => {
                                                                    food.props.children[2] +=1;
                                                                    setItemList(food.props.children[2]);
                                                                    food.props.children[3] +=food.props.children[4];
                                                                    setItemList(food.props.children[3]);
                                                                }} className="countplus">+</button></span>
                                                            </div>
                                                        </div>
                                                        <div className="price">Rs.{food.props.children[3]}</div>
                                                
                                                    </div>
                                                </div>
                                            )
                                       
                                        }
                                }
                            })()}
                            
                        </div>
            
                    ))}
                    
                    </div>
                    <div className="bill_details">
                        <div className="heading1">Bill Details</div>
                        <hr />
                        <div className="subheading1">
                            <div className="head">Sum Total</div>
                            <div className="price">Rs.{grandTotal}</div>
                        </div>
                        <div className="payment">
                            <div className="head">To Pay</div>
                            <div className="price">Rs.{grandTotal}</div>
                        </div>
                        
                    </div>
                    
                    <div className="time">It will approximately take 15 mins for your order to be ready.</div>
                </div>
               
            </div>
            
        </div>
    );
}
export default Payment