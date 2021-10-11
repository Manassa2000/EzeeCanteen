import React from 'react';
import StarRatings from 'react-star-ratings';
import '../css/Card.css';

import Image from './Image';


const Card = ({id,image,price,names,rating,votes,handleQuery}) =>{

    const availableItems = [
        {
          id:{id},
          name: {names},
          quantity: 0,
          total:0,
          price:{price},
        }

    ];
   
        const [item, setitem] = React.useState(availableItems);
       
        const onInputChange = (e) => {
          const currentItems = [...item];
          currentItems[e].quantity += 1;
          currentItems[e].total +=  currentItems[e].price.price;
          setitem(currentItems);
          console.log(currentItems);
          
          handleQuery(currentItems[e].id.id,currentItems[e].name.names, currentItems[e].quantity,currentItems[e].total,currentItems[e].price.price,'p');
        }
  
       
        
        const decreaseQuantity = index => {
          const currentItems = [...item];
          if (currentItems[index].quantity > 0) {
            currentItems[index].quantity -= 1;
            currentItems[index].total -= currentItems[index].price.price;
            setitem(currentItems);
            console.log(currentItems);
            handleQuery(currentItems[index].id.id,currentItems[index].name, currentItems[index].quantity,currentItems[index].total,currentItems[index].price.price,'n');
          }
        };
     
    return(
        <div className="card">
            <div className="card__image">
              <div>
               <Image image={image}/>
               </div>
            </div>
            <div className="card__details">
                <p className="heading">{names}</p>
                <span>
                <StarRatings
                    rating={rating}
                    starDimension="15px"
                    starSpacing="2px"
                    starRatedColor="#183454"
                />
                </span>
                <span className="span1">{votes} votes</span>
                <p className="price">Rs.{price}</p>
            </div>
            
        <div className="quantity">            
            {
                item.map((food, i) => (
                    <div key={food.name}>
                      {(()=>{
                        if(food.quantity===0){
                            return(
                            <div>
                            <button onClick={() =>  onInputChange(i)} className="add">Add</button>
                            <button className="countplus">+</button>
                            </div>
                          )
                          
                        }
                        if(food.quantity>=1){
                          return(
                          <div>
                            <button onClick={() => decreaseQuantity(i)} className="countminus">-</button>
                            <button  className="count">{food.quantity}</button>
                            <button onClick={() => 
                            onInputChange(i)} className="countplus">+</button>
                          </div>
                          )

                        }
                      })()}
                
                    </div>
            
                ))
            }
          </div>

    
    </div>

    )
}
export default Card